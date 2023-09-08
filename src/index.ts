import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();

// Create axes helper
scene.add( new THREE.AxesHelper())

// Create light
const light = new THREE.DirectionalLight()
light.position.set(1, 2, 1)
scene.add(light)

// Create the camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 2);

// Create the renderer and enable XR
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;

// Append the renderer and the VR button to the page
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );

// Rendering loop
function render() {
  renderer.render( scene, camera );
}

renderer.setAnimationLoop(render)

// Resizer
function resize() {	
  const aspect_ratio = window.innerWidth / window.innerHeight      
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.aspect = aspect_ratio
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', () => resize())


// Function that loads model
const fileInput = document.getElementById('file') as HTMLInputElement
fileInput.addEventListener('change', (e) => loadModel((e.target as HTMLInputElement).files![0]))
function loadModel(file: File) {
    const url = URL.createObjectURL(file)

    const loader = new GLTFLoader()
    
    loader.load( url, function ( gltf ) {
    	scene.add( gltf.scene );
        console.log('Model loaded')

    }, undefined, function ( error ) {

    	console.error( error );

    } );
}