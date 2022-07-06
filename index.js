import * as THREE from './three.js/build/three.module.js';
import * as dat from './gui/dat.gui.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'; //chissa perche non andava caricando il path locale dalla cartella controls

//gui
const gui = new dat.GUI({
    width:400,
});

//loading anche se per ora non la uso perche non so perche ma mi annulla le luci
const textureLoader = new THREE.TextureLoader()
const normaltex= textureLoader.load('./texture/grassNormal.png')
//scene
const scene = new THREE.Scene();
var back_color= new THREE.Color(0xf0ffff);
scene.background = textureLoader.load('./textures/night.jfif');
//scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
//scene.background = textureLoader.load('./textures/day.jpg');

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
 0.1, 1000 );
camera.position.x=0;
camera.position.z=9;
camera.position.y=2;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//controls
let controls = new OrbitControls( camera, renderer.domElement );
//controls.listenToKeyEvents( window ); // optional

//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 0;
controls.maxDistance = 50;

controls.maxPolarAngle = Math.PI / 2;

//objects 
//stage
const geometry = new THREE.BoxGeometry(50,0.2,50);
const material = new THREE.MeshStandardMaterial();
//material.normalMap=normaltex
const stage = new THREE.Mesh(geometry, material)
stage.position.y=-1
scene.add(stage)


//lights
//spotlight
const spotlight= new THREE.SpotLight(0xff0000,0.5,0,0.3)
spotlight.position.x=0
spotlight.position.y=1.5
spotlight.position.z=0
scene.add(spotlight)
let palette = {
    color: [255,0,0]
}
//per capire dove sta la luce
const spotLightHelper= new THREE.SpotLightHelper(spotlight,1000.5)
scene.add(spotLightHelper)
//directionallight
const directionallight= new THREE.DirectionalLight(0x404040, 0.5 )
directionallight.visible=false;
scene.add(directionallight)



//gui folders
//light folder
const lightFolder = gui.addFolder('Spot Light')
lightFolder.addColor(palette,'color').onChange(function(value){
    spotlight.color.r =value[0]/255;
    spotlight.color.g =value[1]/255;
    spotlight.color.b =value[2]/255;
})

lightFolder.add(spotlight.position,'x').min(-10).max(10).step(0.05)
lightFolder.add(spotlight.position,'y').min(-10).max(10).step(0.05)
lightFolder.add(spotlight.position,'z').min(-10).max(10).step(0.05)
lightFolder.add(spotlight,'intensity').min(0).max(1000000).step(0.01)
gui.add(directionallight,'visible').onChange().name('turn on directional light')

//camera folder
const cameraFolder = gui.addFolder('camera')
cameraFolder.add(camera,'fov',0,200,2)
cameraFolder.add(camera,'near',0,1,0.1)
cameraFolder.add(camera,'far',1,2000,2)
cameraFolder.add(camera.position,'x',0,10)
cameraFolder.add(camera.position,'y',0,10)
cameraFolder.add(camera.position,'z',0,10)


function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()