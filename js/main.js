// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models




// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
let scene, camera, renderer, ship;

let mixer, action;

function init() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x121617);
    // Load starry background texture
    const loader = new THREE.TextureLoader();
    loader.load('assets/images/darkforest.jpeg', function(texture) {
        scene.background = texture;
    });

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("#three-container").appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    
    
    camera.position.z = 5;
}





//----
const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame(animate);


    let scrollY = window.scrollY;
    camera.position.y = scrollY * .001; 

    if(ship){
    ship.rotation.y += 0.001;
    // ship.rotation.y += 0.001;
    ship.rotation.z = Math.sin(Date.now() / 500) * 0.5;

    ship.position.y = Math.sin(Date.now() / 3000) * 2;
    ship.position.z = Math.sin(Date.now() / 2000) * 2;
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();


// Lights


const light = new THREE.DirectionalLight(0xfffaee, 3);
light.position.set(3,4,5);
scene.add(light);

const helper = new THREE.DirectionalLightHelper(light, 3);
scene.add(light);

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

//
loader.load('assets/spaceship.gltf', function (gltf){
    ship = gltf.scene;
    scene.add(ship);
    ship.scale.set(0.5, 0.5, 0.5);
    ship.position.y = -6
    mixer = new THREE.AnimationMixer(ship);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'Spaceship BaseAction');
    action = mixer.clipAction(clip);
    action.play();
})


// →→→→→→ Event Listeners 2.4 11minutes in the video

document.querySelector("body").addEventListener("mousedown", () => {
    action.play();
    action.paused = false;
    console.log("mousedown");
})

document.querySelector("body").addEventListener("mouseup", () => {
    
    console.log("mouseup");
})