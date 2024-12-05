/* Do not forget to run 'npx vite' on terminal to start the server */

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(5,5,5);
directionalLight.color.setRGB(1, 1, 1);
scene.add(directionalLight)

const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube_material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cube_geometry, cube_material );
scene.add( cube );

const floor_geometry = new THREE.PlaneGeometry( 10, 10 );
const floor_material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const floor = new THREE.Mesh( floor_geometry, floor_material );
floor.position.y = -2;
floor.rotateX( -Math.PI / 2 );
scene.add( floor );

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    'path/to/px.jpg', // +X
    'path/to/nx.jpg', // -X
    'path/to/py.jpg', // +Y
    'path/to/ny.jpg', // -Y
    'path/to/pz.jpg', // +Z
    'path/to/nz.jpg'  // -Z
]);
scene.background = texture;

renderer.render( scene, camera );

// To animate the cube, we need to create a function that will be called on every frame.
//
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
