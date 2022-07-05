import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const fov = 60;
const aspect =  window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
let camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader();
var obj;
loader.load('../models/map/scene.gltf', function(gltf){
    obj = gltf.scene;
    scene.add(gltf.scene);
    //render.render(scene,camera);
    //animate();
}, undefined, function ( error ) {
    console.error( error );
} );
let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
/*light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;*/
scene.add(light);

//let light = new THREE.AmbientLight(0x101010);
//scene.add(light);
camera.position.set(0,1,2);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();