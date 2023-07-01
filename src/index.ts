import * as THREE from 'three';
import {Text} from 'troika-three-text'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Parameters
const posy = 1.4; // y info position
const posz = -1; // z info position

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, posy, posz + 1);

// Create:
const myText = new Text();
scene.add(myText);

// Set properties to configure:
myText.text = 'Waiting VR session';
myText.fontSize = 0.05;
myText.position.set(-0.5, posy, posz);
myText.color = 0x9966FF;

// Update the rendering:
myText.sync();


// Create the renderer and enable XR
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;


// Append the renderer and the VR button to the page
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

const controller0 = renderer.xr.getController(0)

// Rendering loop
function render() {
  const myXRsession = renderer.xr.getSession();

  if (myXRsession) {
    let myString = "VR session is ON";

    myString += "\ninput sources found: " + myXRsession.inputSources.length

    myXRsession.inputSources.forEach((mySource, i) => {
      myString += "\n\ninput source " + i

      if (mySource.gamepad) {
        mySource.gamepad.axes.forEach((axisValue, j) => {
          myString += "\naxis " + j + " value: " + axisValue
        })
        mySource.gamepad.buttons.forEach((myButton, k) => {
          myString += "\nbutton " + k + " pressed: " + myButton.pressed + ", touched: " + myButton.touched + ", value = " + myButton.value
        })
      }
    })

    // Qui dovremmo iterare l'array myXRsession.inputSources, ma il browser del Quest2 si blocca!

    myText.text = myString;


    myText.sync();
  }

  renderer.render( scene, camera );
}

renderer.setAnimationLoop(render)