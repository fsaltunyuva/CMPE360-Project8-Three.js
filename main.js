/* Do not forget to run 'npx vite' on terminal to start the server */

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// Used the codes in https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000); // To adjust the objects' positions properly (debugging)
const renderer = new THREE.WebGLRenderer(); // WebGLRenderer is used to render the scene
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Camera is placed at (0, 3, 15) and looking at (0, 0, 0)
//camera.position.z = 15;
//camera.position.y = 3;
camera.position.set(0, 3, 15);
camera.lookAt(0, 0, 0);

// Directional light and its properties
const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(0,5,5);
directionalLight.color.setRGB(1, 1, 1); // Set the color of the light
scene.add(directionalLight) // Add the light to the scene

// Floor and its properties
const floor_geometry = new THREE.PlaneGeometry( 20, 20 ); // Plane geometry is used to create a flat surface
const texture_floor = new THREE.TextureLoader().load( "grass.jpg" ); // Texture source: https://www.freepik.com/free-photo/green-fake-grass-background_2791853.htm#fromView=keyword&page=1&position=0&uuid=04f614a1-267a-4135-85fa-2f54d8c83f89
const floor_material = new THREE.MeshLambertMaterial( { map: texture_floor } ); // Lambert material is used to reflect the light
const floor = new THREE.Mesh( floor_geometry, floor_material ); // Mesh is used to combine the geometry and the material
floor.position.y = -2; // Position the floor below the objects
floor.rotateX( -Math.PI / 2 ); // Rotate the floor to make it horizontal
scene.add( floor ); // Add the floor to the scene

const stand_geometry = new THREE.CylinderGeometry(2.5, 2, 1.5); // Cylinder geometry is used to create a stand 
const stand_material = new THREE.MeshLambertMaterial({ color: 0x808080}); // Lambert material is used to reflect the light

const cube_geometry = new THREE.BoxGeometry(1, 1, 1); // Box geometry is used to create a cube (created for all cubes)
const cube_material = new THREE.MeshLambertMaterial({ color: 0x8B0000 }); // Lambert material is used to reflect the light

// Geometry for paintings
const painting_geometry = new THREE.PlaneGeometry( 10, 7.5); // The ratio of the resolution is something like 1.5 (width/height), therefore I used similar ratio

// Geometry and material for the easel legs
const easel_leg_geometry = new THREE.BoxGeometry(0.1, 3, 0.1); // Box geometry is used to create a cube (created for all easel legs)
const easel_leg_material = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Lambert material is used to reflect the light

// Right leg of the first easel
const easel_leg_1_painting1 = new THREE.Mesh(easel_leg_geometry, easel_leg_material); // Mesh is used to combine the geometry and the material
easel_leg_1_painting1.position.set(0.5, 1, 0); // Position the easel leg
easel_leg_1_painting1.rotateZ(Math.PI / 8); // Rotate the easel leg

// Left leg of the first easel
const easel_leg_2_painting1 = new THREE.Mesh(easel_leg_geometry, easel_leg_material); // Mesh is used to combine the geometry and the material
easel_leg_2_painting1.position.set(-0.5, 1, 0); // Position the easel leg
easel_leg_2_painting1.rotateZ(-Math.PI / 8); // Rotate the easel leg

// Painting 1
const texture_painting = new THREE.TextureLoader().load( "CountryCelebration.jpg" ); // Loading the texture for the painting "Country Celebration" by Teniers the Younger, David
const painting_material = new THREE.MeshLambertMaterial( { map: texture_painting } ); // Lambert material is used to reflect the light
const painting1 = new THREE.Mesh( painting_geometry, painting_material ); // Mesh is used to combine the geometry and the material
painting1.position.set(0, 2, 0.2); // Position the painting
painting1.scale.set(0.3, 0.3, 0.3); // Scale the painting

// Grouping the painting 1 and the easel legs (hierarchy between the objects)
const painting_group1 = new THREE.Group(); // Group is used to combine the objects
painting_group1.add(painting1); // Add the painting to the group
painting_group1.add(easel_leg_1_painting1); // Add the right leg of the easel to the group
painting_group1.add(easel_leg_2_painting1); // Add the left leg of the easel to the group
painting_group1.scale.set(0.75, 0.75, 0.75); // Scale the group
painting_group1.position.set(3, -1.5, 6); // Position the group
painting_group1.rotateY(Math.PI / 2 + 10); // Rotate the group
scene.add(painting_group1); // Add the group to the scene

// Right leg of the second easel
const easel_leg_1_painting2 = new THREE.Mesh(easel_leg_geometry, easel_leg_material); // Mesh is used to combine the geometry and the material (with same geometry and material)
easel_leg_1_painting2.position.set(0.5, 1, 0); // Position the easel leg
easel_leg_1_painting2.rotateZ(Math.PI / 8); // Rotate the easel leg

// Left leg of the second easel
const easel_leg_2_painting2 = new THREE.Mesh(easel_leg_geometry, easel_leg_material); // Mesh is used to combine the geometry and the material (with same geometry and material)
easel_leg_2_painting2.position.set(-0.5, 1, 0);
easel_leg_2_painting2.rotateZ(-Math.PI / 8);

// Painting 2
const texture_painting2 = new THREE.TextureLoader().load( "peakpx.jpg" ); // Loading the texture for the painting "The Hay Wain" by John Constable
const painting_material2 = new THREE.MeshLambertMaterial( { map: texture_painting2 } ); // Lambert material is used to reflect the light
const painting2 = new THREE.Mesh( painting_geometry, painting_material2 ); // Mesh is used to combine the geometry and the material (with same geometry)
painting2.position.set(0, 2, 0.2); // Position the painting
painting2.scale.set(0.3, 0.3, 0.3); // Scale the painting

// Grouping the painting 2 and the easel legs (hierarchy between the objects)
const painting_group2 = new THREE.Group(); // Group is used to combine the objects (with same group)
painting_group2.add(painting2); // Add the painting to the group
painting_group2.add(easel_leg_1_painting2); // Add the right leg of the easel to the group
painting_group2.add(easel_leg_2_painting2); // Add the left leg of the easel to the group
painting_group2.scale.set(0.75, 0.75, 0.75); // Scale the group
painting_group2.position.set(-3, -1.5, 6); // Position the group
painting_group2.rotateY(-Math.PI / 2 - 10); // Rotate the group
scene.add(painting_group2); // Add the group to the scene

// Global variables for the point lights
var pointlight_intensity = 5; // Intensity of the point lights
var r_value_of_pointlight = 0; // Red value of the point lights
var g_value_of_pointlight = 0; // Green value of the point lights
var b_value_of_pointlight = 1; // Blue value of the point lights

const pointLight1 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight1.color.setRGB(r_value_of_pointlight, g_value_of_pointlight, b_value_of_pointlight);
pointLight1.position.set(-3, -1, 0); // Position the point light
scene.add(pointLight1); // Add the point light to the scene

const pointLight2 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight2.color.setRGB(r_value_of_pointlight, g_value_of_pointlight, b_value_of_pointlight);
pointLight2.position.set(-3, -1, 6); // Position the point light
scene.add(pointLight2); // Add the point light to the scene

const pointLight3 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight3.color.setRGB(r_value_of_pointlight, g_value_of_pointlight, b_value_of_pointlight);
pointLight3.position.set(3, -1, 0); // Position the point light
scene.add(pointLight3); // Add the point light to the scene

const pointLight4 = new THREE.PointLight(0xffffff, pointlight_intensity);
pointLight4.color.setRGB(r_value_of_pointlight, g_value_of_pointlight, b_value_of_pointlight);
pointLight4.position.set(3, -1, 6); // Position the point light
scene.add(pointLight4); // Add the point light to the scene

// Stand
const stand = new THREE.Mesh(stand_geometry, stand_material); // Mesh is used to combine the geometry and the material
stand.position.set(0, -1, -3); // Position the stand
scene.add(stand); // Add the stand to the scene

// Cube 1
const cube1 = new THREE.Mesh(cube_geometry, cube_material); // Mesh is used to combine the geometry and the material
cube1.position.set(-3, -1.5, 0); // Position the cube
scene.add(cube1); // Add the cube to the scene


// Cube 3
const cube2 = new THREE.Mesh(cube_geometry, cube_material); // Mesh is used to combine the geometry and the material
cube2.position.set(3, -1.5, 0); // Position the cube
scene.add(cube2); // Add the cube to the scene

// Cube 4
const cube4 = new THREE.Mesh(cube_geometry, cube_material); // Mesh is used to combine the geometry and the material
cube4.position.set(3, -1.5, 6); // Position the cube
// scene.add(cube4); // Add the cube to the scene

// Skybox
// Used the codes in https://stackoverflow.com/questions/59169486/skybox-for-three-js
const loader = new THREE.CubeTextureLoader(); // CubeTextureLoader is used to load the skybox
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
const objLoader = new OBJLoader(); // Global OBJLoader is used to load the objects
// load a resource
objLoader.load(
    // resource URL
    'Skull_OBJ.OBJ', //https://www.turbosquid.com/3d-models/skull-printing-obj/690305
    // called when resource is loaded
    function ( skull ) {
        skull.scale.set(0.5, 0.5, 0.5);
        skull.position.set(-3, -0.4, 0);
        skull.rotation.y = Math.PI / 1;
        scene.add( skull );
    }
);

objLoader.load(
    // resource URL
    'AlienBust_OBJ.OBJ', //https://www.turbosquid.com/3d-models/alien-bust-sculpture-3d-model/695955
    // called when resource is loaded
    function ( bust ) {
        bust.scale.set(0.5, 0.5, 0.5);
        bust.position.set(3, 0.1, 0);
        bust.rotation.y = Math.PI / 1;
        scene.add( bust );
    }
);

objLoader.load(
    // resource URL
    'Deer_Sculpt.obj', //https://www.turbosquid.com/3d-models/3d-deer-sculpt-1791447
    // called when resource is loaded
    function ( deer ) {
        deer.scale.set(0.6, 0.6, 0.6);
        deer.position.set(0, 0.75, -3);
        deer.rotation.y = Math.PI / 4;
        scene.add( deer );
    }
);

objLoader.load(
    // resource URL
    'objPillars.obj', //https://www.turbosquid.com/3d-models/ancient-fantasy-pillar-3d-model-2291481
    // called when resource is loaded
    function ( pillar1 ) {
        pillar1.scale.set(4, 4, 4);
        pillar1.position.set(-3.5, -1, -3);
        scene.add( pillar1 );
    }
);

objLoader.load(
    // resource URL
    'objPillar.obj', //https://www.turbosquid.com/3d-models/3d-model-free-old-column-2283380
    // called when resource is loaded
    function ( pillar2 ) {
        pillar2.scale.set(0.8, 0.7, 0.9);
        pillar2.position.set(3.5, -1, -3);
        scene.add( pillar2 );
    }
);

var lamp_light_intensity = 7.5; // Intensity of the point lights for the lamps

// Point lights for the lamps
const pointLight_for_lamp1 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp2 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp3 = new THREE.PointLight(0xffffff, lamp_light_intensity);
const pointLight_for_lamp4 = new THREE.PointLight(0xffffff, lamp_light_intensity);

objLoader.load(
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

objLoader.load(
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

objLoader.load(
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

objLoader.load(
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

// === KEYBOARD CONTROLS ===
const moveSpeed = 0.5; 
const rotateSpeed = 0.02;
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp': // Move the camera forward
            camera.position.z -= moveSpeed * Math.cos(camera.rotation.y);
            camera.position.x -= moveSpeed * Math.sin(camera.rotation.y);
            break;
        case 'ArrowDown': // Move the camera backward
            camera.position.z += moveSpeed * Math.cos(camera.rotation.y);
            camera.position.x += moveSpeed * Math.sin(camera.rotation.y);
            break;
        case 'ArrowLeft': // Rotate the camera to the left
            camera.rotation.y += rotateSpeed;
            break;
        case 'ArrowRight': // Rotate the camera to the right
            camera.rotation.y -= rotateSpeed;
            break;

    }
});

window.addEventListener('keyup', (event) => {
});

// Custom shader material for metallic reflection effect
const metallicShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vec3 lightDirection = normalize(vec3(0.5, 1.0, 0.75)); // Direction of the light source
            vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0)); // Viewer's direction

            float specular = pow(max(dot(reflect(-lightDirection, vNormal), viewDirection), 0.0), 16.0);
            float diffuse = max(dot(vNormal, lightDirection), 0.0);

            vec3 baseColor = vec3(0.8, 0.8, 0.9); // Silver metallic color
            vec3 finalColor = baseColor * diffuse + vec3(1.0) * specular;

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
});

stand.material = metallicShaderMaterial; // Apply shader material to the stand


/* ====== RENDERING AND ANIMATING ====== */
renderer.render( scene, camera );

// To animate the cube, we need to create a function that will be called on every frame.
let standDirection = 1;
function animate() {
    cube1.rotation.y += 0.01;
    cube2.rotation.y += 0.01;
    stand.position.x += 0.01 * standDirection;
    if (stand.position.x > 0.3 || stand.position.x < -0.3) {
        standDirection *= -1; 
    }
    //camera.rotation.y += 0.0001; // Rotate the camera to see the skybox

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate ); // This will call the animate function on every frame.