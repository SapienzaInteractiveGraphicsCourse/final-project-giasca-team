import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const fov = 100;
const aspect =  window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
let camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight); //render resolution
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
/*const tilesBaseColor = textureLoader.load('../texture_grass2/Hedge_001_BaseColor.jpg');
const tilesNormalMap = textureLoader.load('../texture_grass2/Hedge_001_Normal.jpg');
const tilesHeightMap = textureLoader.load('../texture_grass2/Hedge_001_Height.png');
const tilesRoughness = textureLoader.load('../texture_grass2/Hedge_001_Roughness.jpg');
const tilesAmbientOcclusionMap = textureLoader.load('../texture_grass2/Hedge_001_AmbientOcclusion.jpg');
const tilesMaterial = textureLoader.load('../texture_grass2/Material_2044.jpg');*/

const tilesBaseColor = textureLoader.load('../texture_grass2/Ground037_1K_Color.jpg');
const tilesNormalMap = textureLoader.load('../texture_grass2/Ground037_1K_NormalDX.jpg');
const tilesHeightMap = textureLoader.load('../texture_grass2/Ground037_1K_Displacement.jpg');
const tilesRoughness = textureLoader.load('../texture_grass2/Ground037_1K_HRoughness.jpg');
const tilesAmbientOcclusionMap = textureLoader.load('../texture_grass2/Ground037_1K_AmbientOcclusion.jpg');


//CREATION OF THE PLANE (GRASS)
var geometry = new THREE.BoxGeometry(8,0.1,7);
var material = new THREE.MeshBasicMaterial(
    {
        //BUMP MAPPING
        map: tilesBaseColor,
        normalMap: tilesNormalMap,
        displacementMap: tilesHeightMap,
        roughnessMap: tilesRoughness, //define which areas are rough
        roughness: 0.5,
        aoMap: tilesAmbientOcclusionMap //put the shadow areas
    }
);
var plane = new THREE.Mesh(geometry,material);

plane.position.z = -5;
plane.geometry.attributes.uv2 = plane.geometry.attributes.uv; //this because the aoMap requires a second set of UVs 
                                                            // => Uvs are used to map the texture to a point of the geometry
plane.rotation.x = 10;
plane.rotation.y = 0.0;

scene.add(plane);


renderer.render(scene,camera); 

const loader = new GLTFLoader();
var obj;
loader.load('../models/map/castle_byers/scene.gltf', function(gltf){
    obj = gltf.scene;
    scene.add(gltf.scene);
    obj.position.z = -1;
    obj.scale.set(0.02,0.02,0.02);
    //render.render(scene,camera);
    //animate();
}, undefined, function ( error ) {
    console.error( error );
} );
//var light = new THREE.HemisphereLight(0xffffff, 0x000000, 9);
//scene.add(light);

let light = new THREE.AmbientLight(0x154678);
scene.add(light);
camera.position.set(0,1,2);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();