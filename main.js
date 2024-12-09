/* Do not forget to run 'npx vite' on terminal to start the server */

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000); // To adjust the objects' positions properly (debugging)
camera.position.z = 15;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(0,5,5);
directionalLight.color.setRGB(1, 1, 1);
scene.add(directionalLight)

const floor_geometry = new THREE.PlaneGeometry( 20, 20 );
const texture_floor = new THREE.TextureLoader().load( "grass.jpg" ); // https://www.freepik.com/free-photo/green-fake-grass-background_2791853.htm#fromView=keyword&page=1&position=0&uuid=04f614a1-267a-4135-85fa-2f54d8c83f89
const floor_material = new THREE.MeshLambertMaterial( { map: texture_floor } ); // Lambert material is used to reflect the light
const floor = new THREE.Mesh( floor_geometry, floor_material );
floor.position.y = -2;
floor.rotateX( -Math.PI / 2 );
scene.add( floor );

const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_material = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // Lambert material is used to reflect the light

var pointlight_intensity = 5;

const pointLight1 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight1.color.setRGB(0, 0, 1);

const pointLight2 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight2.color.setRGB(0, 0, 1);

const pointLight3 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight3.color.setRGB(0, 0, 1);

const pointLight4 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight4.color.setRGB(0, 0, 1);

// Cube 1
const cube1 = new THREE.Mesh(cube_geometry, cube_material);
cube1.position.set(-3, -1.5, 0);
pointLight1.position.set(-3, -1, 0);
scene.add(pointLight1);
scene.add(cube1);

// Cube 2
const cube2 = new THREE.Mesh(cube_geometry, cube_material);
cube2.position.set(-3, -1.5, 6);
pointLight2.position.set(-3, -1, 6);
scene.add(pointLight2);
scene.add(cube2);

// Cube 3
const cube3 = new THREE.Mesh(cube_geometry, cube_material);
cube3.position.set(3, -1.5, 0);
pointLight3.position.set(3, -1, 0);
scene.add(pointLight3);
scene.add(cube3);

// Cube 4
const cube4 = new THREE.Mesh(cube_geometry, cube_material);
cube4.position.set(3, -1.5, 6);
pointLight4.position.set(3, -1, 6);
scene.add(pointLight4);
scene.add(cube4);

// Skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    // The skybox assets downloaded from https://opengameart.org/content/park-skyboxes.
    // And they belong to Emil Persson, aka Humus.
    "/park-skybox/posx.jpg", // +X
    "/park-skybox/negx.jpg", // -X
    "/park-skybox/posy.jpg", // +Y
    "/park-skybox/negy.jpg", // -Y
    "/park-skybox/posz.jpg", // +Z
    "/park-skybox/negz.jpg"  // -Z
]);
scene.background = texture;

// Using the codes in https://threejs.org/docs/#examples/en/loaders/OBJLoader
// instantiate a loader
const loader2 = new OBJLoader();
// load a resource
loader2.load(
    // resource URL
    'v12obj.obj', //https://sketchfab.com/3d-models/free-v12-12-cylinder-v-engine-e3508e360b5041c5972d78c9b04907e3
    // called when resource is loaded
    function ( engine ) {
        engine.scale.set(0.1, 0.1, 0.1);
        engine.position.set(-2.8, -1, 1);
        scene.add( engine );
    }
);

var lamp_light_intensity = 7.5;

const pointLight_for_lamp1 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp2 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp3 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp4 = new THREE.PointLight(0xffffff, lamp_light_intensity);

const loader3 = new OBJLoader();

loader3.load(
    // resource URL
    '/street-lamp/StreetLamp.obj', // https://www.turbosquid.com/3d-models/3d-street-lamp-2210777
    // called when resource is loaded
    function ( lamp ) {
        lamp.position.set(-3.5, -1, 2);
        pointLight_for_lamp1.position.set(-3.5,1,0);
        scene.add(pointLight_for_lamp1);
        scene.add( lamp );
    }
);

const loader4 = new OBJLoader();

loader4.load(
    // resource URL
    '/street-lamp/StreetLamp.obj', // https://www.turbosquid.com/3d-models/3d-street-lamp-2210777
    // called when resource is loaded
    function ( lamp ) {
        lamp.position.set(-3.5, -1, 7);
        pointLight_for_lamp2.position.set(-3.5,1,5);
        scene.add(pointLight_for_lamp2);
        scene.add( lamp );
    }
);

const loader5 = new OBJLoader();

loader5.load(
    // resource URL
    '/street-lamp/StreetLamp.obj', // https://www.turbosquid.com/3d-models/3d-street-lamp-2210777
    // called when resource is loaded
    function ( lamp ) {
        lamp.position.set(3.5, -1, 2);
        lamp.rotateY(Math.PI);
        pointLight_for_lamp3.position.set(3.5,1,0);
        scene.add(pointLight_for_lamp3);
        scene.add( lamp );
    }
);

const loader6 = new OBJLoader();

loader6.load(
    // resource URL
    '/street-lamp/StreetLamp.obj', // https://www.turbosquid.com/3d-models/3d-street-lamp-2210777
    // called when resource is loaded
    function ( lamp ) {
        lamp.position.set(3.5, -1, 7);
        lamp.rotateY(Math.PI);
        pointLight_for_lamp4.position.set(3.5,1,5);
        scene.add(pointLight_for_lamp4);
        scene.add( lamp );
    }
);

/* ====== RENDERING AND ANIMATING ====== */
renderer.render( scene, camera );

// To animate the cube, we need to create a function that will be called on every frame.
function animate() {
    // cube1.rotation.x += 0.01;
    // cube1.rotation.y += 0.01;
    //camera.rotation.y += 0.0001; // Rotate the camera to see the skybox

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate ); // This will call the animate function on every frame.