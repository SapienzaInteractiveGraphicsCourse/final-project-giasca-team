import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import * as dat from './gui/dat.gui.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js'; //chissa perche non andava caricando il path locale dalla cartella controls
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from './cannon-es.js'
import CannonDebugger from './cannon-es-debugger.js'

import { BasicCharacterController } from './js/Controllers/BasicCharacterController.js';
import { BasicMonsterController } from './js/Controllers/BasicMonsterController.js';
var meshes_character,meshes_mostro, Character
var Monster = {}
//loading
var loadingScreen = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1.0, 1000.0 ),
};

var loadingManager = null;
var RESOURCES_LOADED = false;

const loading_screen = document.querySelector(".loading_container");
loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = function(item, loaded, total){
    console.log(item, loaded, total);
}; //onProgress is triggered every time one resource is loaded.
loadingManager.onLoad = function(){
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
    loading_screen.style.display = "none";
}; //onLoad is when all resources are loaded

//Scoreboard
var scoreboard = document.getElementById('scoreBoard')
function updateScoreBoard(){
   //'colpi dati : '+conta_colpidati+
    scoreboard.innerHTML = ' , colpi ricevuti : '+conta_collisioni+check_borders()//+cnt_col  //+ check_borders()
}
//GUI
const gui = new dat.GUI({
    width:400,
});
gui.close()
//TEXTURES
const textureLoader = new THREE.TextureLoader()
//for the stage
const tilesBaseColor = textureLoader.load('./textures/grass/Ground037_1K_Color.jpg');
const tilesNormalMap = textureLoader.load('./textures/grass/Ground037_1K_NormalDX.jpg');
const tilesHeightMap = textureLoader.load('./textures/grass/Ground037_1K_Displacement.jpg');
const tilesRoughness = textureLoader.load('./textures/grass/Ground037_1K_Roughness.jpg');
const tilesAmbientOcclusionMap = textureLoader.load('./textures/grass/Ground037_1K_AmbientOcclusion.jpg');
//for moon
const moonTexture = textureLoader.load('./textures/moon.jpg')
//for sun
const sunTexture = textureLoader.load('./textures/sun1.JPG')
//SCENE
const scene = new THREE.Scene();

var day_night = {
    is_day:false,
}

//if (day_night.is_day==true){
    scene.background = new THREE.CubeTextureLoader()
	    .setPath( 'textures/day_night/cubemap/' )
	    .load( [
		    'px.png',
		    'nx.png',
		    'py.png',
		    'ny.png',
		    'pz.png',
		    'nz.png'
	    ] );
    
scene.fog= new THREE.FogExp2(0xDFE9F3,0) //prima era 0.1

//CANNON WORLD e Debuger
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
})

const timestep = 1/60
const cannonDebug = new CannonDebugger(scene,world, {
    color: 0xffffff,
    scale: 1.0,
})

//camera
var goal,follow

var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var distancefrom = 1;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
 0.1, 1000 );

camera.position.set(-10,10,0)//prima -5,5,0
camera.lookAt(scene.position)


goal = new THREE.Object3D;
follow = new THREE.Object3D;
goal.position.z = -distancefrom;
goal.add( camera );
//scene.add(vediamo)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//controls
var fake_camera=camera.clone()
let controls = new OrbitControls( fake_camera, renderer.domElement );

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.5;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 150;
controls.maxPolarAngle = Math.PI / 2;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}

//OBJECTS 
var objects =[];
var objects_body = []
//stage
const geometry = new THREE.BoxGeometry(80,0.001,80);
//geometry.attributes.position.setZ(1,0.9)
const material = new THREE.MeshStandardMaterial({
        //BUMP MAPPING
        map: tilesBaseColor,
        normalMap: tilesNormalMap,
        displacementMap: tilesHeightMap,
        roughnessMap: tilesRoughness, //define which areas are rough
        roughness: 0.5,
        aoMap: tilesAmbientOcclusionMap //put the shadow areas
    });

const stage = new THREE.Mesh(geometry, material)
stage.position.y=-1

//stage.geometry.attributes.uv2=stage.geometry.attributes.uv
scene.add(stage)
///stage cannon
const stageMaterial =new CANNON.Material()
const stageBody = new CANNON.Body({
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(40,0.001,40)),
    position : new CANNON.Vec3(0,-0.4,0),
    //type: CANNON.Body.Static
    material: stageMaterial
})


world.addBody(stageBody)

//stage.attach(vediamo)//toglilo poi
//moon
const mgeometry = new THREE.SphereGeometry(5,20,20)
const mesh = new THREE.MeshStandardMaterial({map : moonTexture, roughness:0.5})
const moon = new THREE.Mesh(mgeometry, mesh)
moon.position.set(-25,40,25)
scene.add(moon)

//sun
const scolor= new THREE.Color('#FDB813')
const sgeometry = new THREE.IcosahedronGeometry(15,15);
const smaterial = new THREE.MeshBasicMaterial({ map : sunTexture ,color : scolor })
const sun = new THREE.Mesh(sgeometry,smaterial)
sun.position.set(0,80,0)
//sun.layers.set(1)
//scene.add(sun)

//MODELS
const loader1 = new GLTFLoader();
const loaderf1 = new GLTFLoader();
const loaderf2 = new GLTFLoader();
const loaderf3 = new GLTFLoader();
const loaderf4 = new GLTFLoader();
const loaderf5 = new GLTFLoader();
const loadertt = new GLTFLoader();
const loadert1 = new GLTFLoader();
const loadert2 = new GLTFLoader();
const loadert3 = new GLTFLoader();
const loadert4 = new GLTFLoader();
const loaderlamp1 = new GLTFLoader();
const loaderlamp2 = new GLTFLoader();
const loaderlamp3 = new GLTFLoader();
const loaderlamp4 = new GLTFLoader();
const loaderbench1 = new GLTFLoader();
const loaderbench2 = new GLTFLoader();
const loaderbench3 = new GLTFLoader();
const loadercar = new GLTFLoader();
const loaderlogo = new GLTFLoader();
var house;
var fence1, fence2, fence3, fence4, fence5;
var forest1, forest2, forest3, forest4;
var trunk;
var lamp1, lamp2, lamp3, lamp4;
var bench1, bench2, bench3;
var car;
var logo;

loaderlogo.load('./models/avengers_logo/scene.gltf', function(gltf){
    logo= gltf.scene;
    logo.scale.set(1,1,1)
    stage.attach(logo);
    logo.position.set(10,1,-10)
    logo.rotation.y=Math.PI/180 * -60;
    scene.add(logo);

})
const logobody = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1.5,3,.5)),
})
logobody.position.set(10,0,-10)
logobody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180 * -60)
world.addBody(logobody)

loader1.load('./models/wood house/scene.gltf', function(gltf){
    
    house = gltf.scene;
    house.scale.set(0.01,0.01,0.01);
    
    house.rotation.y =-45;
    house.position.set(30,2.6,30)
    scene.add(house);

})
const hg= new THREE.BoxGeometry(10,10,9)
const hm =new THREE.MeshStandardMaterial({ wireframe:true})
const h = new THREE.Mesh(hg,hm)
h.position.set(29,0,27)
h.rotation.y=-45
//scene.add(house);
scene.add(h)
//objects.push(h)
h.visible=false

const hshape= new CANNON.Box( new CANNON.Vec3(6,5,5))
const hbody = new CANNON.Body({ mass: 0 })
hbody.addShape(hshape)
hbody.position.set(28,0,27)
hbody.quaternion.copy(h.quaternion)
world.addBody(hbody)

loaderf1.load('./models/wood fence/scene.gltf', function(gltf){
    fence1= gltf.scene;
    fence1.scale.set(0.002,0.002,0.008)
    stage.attach(fence1);
    fence1.position.set(-35,-0.7,-30) //prima y era -1.2
    fence1.rotation.y = Math.PI/180 
    scene.add(fence1);
})
// const f1g= new THREE.BoxGeometry(4,10,15)
// const f1m =new THREE.MeshStandardMaterial({ wireframe:true})
// const f1 = new THREE.Mesh(f1g,f1m)
// f1.position.set(-33.5,0,-30)
// f1.rotation.y= Math.PI/180
// scene.add(f1)
// //objects.push(f1)
// f1.visible=false

const f1body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1,5,8)),
})
f1body.position.set(-35,0,-32)
f1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180)
world.addBody(f1body)

loaderf2.load('./models/wood fence/scene.gltf', function(gltf){
    fence2= gltf.scene;
    fence2.scale.set(0.002,0.002,0.008)
    stage.attach(fence2);
    fence2.position.set(-28,-0.7,-38)
    fence2.rotation.y=Math.PI/180 * 90;
    scene.add(fence2);

})
const f2body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1,5,6)),
})
f2body.position.set(-29,0,-38)
f2body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(f2body)


loaderf3.load('./models/wood fence/scene.gltf', function(gltf){
    fence3= gltf.scene;
    fence3.scale.set(0.002,0.002,0.008)
    stage.attach(fence3);
    fence3.position.set(-22,-0.7,-30)
    fence3.rotation.y=Math.PI/180;
    scene.add(fence3);

})

const f3body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1,5,8)),
})
f3body.position.set(-22,0,-32)
f3body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180)
world.addBody(f3body)

loaderf4.load('./models/wood fence/scene.gltf', function(gltf){
    fence4= gltf.scene;
    fence4.scale.set(0.002,0.002,0.002)
    stage.attach(fence4);
    fence4.position.set(-23.5,-0.7,-24.5)
    fence4.rotation.y=Math.PI/180 * 90;
    scene.add(fence4);
})

const f4body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1,5,2)),
})
f4body.position.set(-23.5,-0.7,-24.5)
f4body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(f4body)

loaderf5.load('./models/wood fence/scene.gltf', function(gltf){
    fence5= gltf.scene;
    fence5.scale.set(0.002,0.002,0.002)
    stage.attach(fence5);
    fence5.position.set(-33.5,-0.7,-24.5)
    fence5.rotation.y=Math.PI/180 * 90;
    scene.add(fence5);
})

const f5body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1,5,2)),
})
f5body.position.set(-33.5,-0.7,-24.5)
f5body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(f5body)

loadert1.load('./models/tree forest/scene.gltf', function(gltf){
    forest1= gltf.scene;
    //forest1.scale.set(0.7,0.7,0.7)
    forest1.position.set(25,-1.2,-27)
    forest1.rotation.y=Math.PI/180* -45
    stage.attach(forest1);
    scene.add(forest1);

})

const t1body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(5,5,10)),
})
t1body.position.set(24.5,0,-26)
t1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*50)
world.addBody(t1body)

loadert2.load('./models/tree forest/scene.gltf', function(gltf){
    forest2= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest2.position.set(25,-1.2,-25)
    forest2.rotation.y=Math.PI/180* -45
    stage.attach(forest2);    
    scene.add(forest2);
})
loadert3.load('./models/tree forest/scene.gltf', function(gltf){
    forest3= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest3.position.set(25,-1.2,-23)
    forest3.rotation.y=Math.PI/180* -45
    stage.attach(forest3);
    scene.add(forest3);
})
loadert4.load('./models/tree forest/scene.gltf', function(gltf){
    forest4= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest4.position.set(25,-1.2,-21)
    forest4.rotation.y=Math.PI/180* -45
    stage.attach(forest4);
    scene.add(forest4);
})
loadertt.load('./models/tree trunk/scene.gltf', function(gltf){
    trunk= gltf.scene;
    trunk.scale.set(2,2,2)
    trunk.position.set(16,-1,0)
    trunk.rotation.z=Math.PI/180* 90
    trunk.rotation.y=Math.PI/180* 90
    stage.attach(trunk)
    scene.add(trunk);
})

const ttbody = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(1.2,1.2,3)),
})
ttbody.position.set(16,0,2.7)
//ttbody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(ttbody)

loaderlamp1.load('./models/street lamp/scene.gltf', function(gltf){
    lamp1= gltf.scene;
    lamp1.scale.set(0.05,0.05,0.05)
    lamp1.position.set(23.5,4.5,20)
    stage.attach(lamp1)
    scene.add(lamp1);

})
const l1body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(2,5,2)),
})
l1body.position.set(23.5,4.5,20)
l1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -45)
world.addBody(l1body)

loaderlamp2.load('./models/street lamp/scene.gltf', function(gltf){
    lamp2= gltf.scene;
    lamp2.scale.set(0.05,0.05,0.05)
    lamp2.position.set(-28.5,4.5,-31)
    stage.attach(lamp2);
    scene.add(lamp2);
})
const l2body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(0.5,10,0.5)),
})
l2body.position.set(-28.7,1,-31)
//b1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(l2body)

loaderlamp3.load('./models/street lamp/scene.gltf', function(gltf){
    lamp3= gltf.scene;
    lamp3.scale.set(0.05,0.05,0.05)
    lamp3.position.set(26,4.5,-27)
    stage.attach(lamp3);
    scene.add(lamp3);
})
loaderlamp4.load('./models/street lamp/scene.gltf', function(gltf){
    lamp4= gltf.scene;
    lamp4.scale.set(0.05,0.05,0.05)
    lamp4.position.set(-36,4.5,35)
   stage.attach(lamp4);
    scene.add(lamp4);
})
loaderbench1.load('./models/benches/bench 1/scene.gltf', function(gltf){
    bench1= gltf.scene;
    bench1.scale.set(2,2,2);
    bench1.position.set(-33,-1.5,-30)
    bench1.rotation.y=Math.PI/180*-90;
    stage.attach(bench1);
    scene.add(bench1);
})
const b1body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(0.5,1,1.5)),
})
b1body.position.set(-32.5,1,-30)
//b1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(b1body)

loaderbench2.load('./models/benches/bench 2/scene.gltf', function(gltf){
    bench2= gltf.scene;
    bench2.scale.set(1.5,1.5,1.5);
    bench2.position.set(-24,-2,-30)
    bench2.rotation.y=Math.PI/180*-90;
    stage.attach(bench2);
    scene.add(bench2);
})
const b2body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(0.8,1.5,1.8)),
})
b2body.position.set(-29,1,-34.8)
b2body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(b2body)

loaderbench3.load('./models/benches/bench 3/scene.gltf', function(gltf){
    bench3= gltf.scene;
    bench3.scale.set(2,2,2);
    bench3.position.set(-29,-1,-35)
   // bench.rotation.y=Math.PI/180*-90;
    stage.attach(bench3);
    scene.add(bench3);
})
const b3body = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(0.5,1,1.5)),
})
b3body.position.set(-24,1,-30)
//b1body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*90)
world.addBody(b3body)

loadercar.load('./models/car/scene.gltf', function(gltf){
    car= gltf.scene;
    car.scale.set(0.5,0.5,0.5);
    car.position.set(-35,0,29)
    car.rotation.y=Math.PI/180*45;
    stage.attach(car);
    scene.add(car);

})

//!!!LOAD OF THE CHARACTER/MONSTERS!!!
_LoadModels('./models/female_officer/scene.gltf',1.5,0.5,20,0.5, 0);

//_LoadModels('./models/vecna_from_stranger_things/scene.gltf',0.8,1,0.1,-1,1);

var character_body, punch_body;
const character_bodyMaterial= new CANNON.Material();
const monster_bodyMaterial= new CANNON.Material();
character_body = new CANNON.Body({ 
    mass: 5, 
    shape: new CANNON.Sphere(0.9),
    material:character_bodyMaterial,
    linearDamping : 0.9
});

function _LoadModels(path,scaleValue,position_x,position_y,position_z, entity, index) {
    var loaderGLTF = new GLTFLoader(loadingManager);
    loaderGLTF.load(path, function(gltf){
        
        
        if(entity==0){
            meshes_character = gltf.scene;

            meshes_character.position.set(position_x,position_y,position_z);
            meshes_character.scale.setScalar(scaleValue);
            meshes_character.rotation.set(0, Math.PI, 0);
            scene.add(meshes_character);
            //const bodyMaterial= new CANNON.Material();
            
            world.addBody(character_body);
            /*const pugnoMaterial= new CANNON.Material();
            const pugnoBody = new CANNON.Body({
                mass: 80,
                shape : new CANNON.Box(new CANNON.Vec3(1.5,1.5,.0001)),
                linearDamping :0.9,  //è l'attrito con l'aria
                material: pugnoMaterial,
                fixedRotation: true
            })
            world.addBody(pugno_body);
            const pugno_body_contact = new CANNON.ContactMaterial(
                pugnoMaterial,
                bodyMaterial,
                {
                    //friction:0.5,
                    contactEquationStiffness:0.1
                }
            );
            world.addContactMaterial(pugno_body_contact)*/
            Character = new BasicCharacterController({target:meshes_character , body:character_body});
        }
        else{
            meshes_mostro = gltf.scene;

            meshes_mostro.position.set(position_x,position_y,position_z);
            meshes_mostro.scale.setScalar(scaleValue);
            meshes_mostro.rotation.set(0, Math.PI, 0);
            scene.add(meshes_mostro);

            scene.add(meshes_mostro);
            objects.push(meshes_mostro);
            
            const monster_body = new CANNON.Body({ 
                mass: 80,
                shape : new CANNON.Sphere(1), //new CANNON.Vec3(2.45,2.45,2.45)),
                material: monster_bodyMaterial,
                linearDamping :0.9
            })
            monster_body.position.set(position_x,position_y,position_z)
            //monster_body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180)
            world.addBody(monster_body)
            objects_body.push(monster_body)
            //console.log(objects_body.length)
            Monster[index] = new BasicMonsterController(meshes_mostro);
        }
        
    });
}

//END.

const cbody = new CANNON.Body({ 
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(2.5,5,7)),
})
cbody.position.set(-33,0,32)
cbody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI/180*30)
world.addBody(cbody)


//lights
var ambientlight = new THREE.AmbientLight(0x404040);
scene.add(ambientlight);
//lamp spotlight
const lamplight1 = new THREE.SpotLight(0x654321,4.5,0,1)
lamplight1.position.set(23.5,4.5,20)
lamplight1.target.position.set(23.5,1,20)
lamplight1.visible=false
scene.add(lamplight1)
scene.add(lamplight1.target)

const lamplight2 = new THREE.SpotLight(0x654321,4.5,0,1)
lamplight2.position.set(-28.5,4.5,-31)
lamplight2.target.position.set(-28.5,1,-31)
lamplight2.visible=false
scene.add(lamplight2)
scene.add(lamplight2.target)

const lamplight3 = new THREE.SpotLight(0x654321,4.5,0,1)
lamplight3.position.set(26,6,-27)
lamplight3.target.position.set(26,4,-27)
lamplight3.visible=false
scene.add(lamplight3)
scene.add(lamplight3.target)

const lamplight4 = new THREE.SpotLight(0x654321,4.5,0,1)
lamplight4.position.set(-36,4.5,35)
lamplight4.target.position.set(-36,-1,35)
lamplight4.visible=false
scene.add(lamplight4)
scene.add(lamplight4.target)
//spotlight
var pos = {
    x_1:0,
    y_1:40,
    z_1:0,
}
const spotlight= new THREE.SpotLight(0xff2222,3.5,0,0.3) //il secondo param è intensita
spotlight.shadowMapVisible = true;
spotlight.position.x=pos.x_1
spotlight.position.y=pos.y_1
spotlight.position.z=pos.z_1
spotlight.target.position.set(pos.x_1,-0.5,pos.z_1)

/*spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

spotlight.shadow.camera.near = 500;
spotlight.shadow.camera.far = 4000;
spotlight.shadow.camera.fov = 30;*/

scene.add(stage,spotlight)
scene.add(spotlight.target)
let palette = {
    color: [255,0,0]
}
//per capire dove sta la luce
//const spotLightHelper= new THREE.SpotLightHelper(spotlight,.5)
//scene.add(spotLightHelper)
//directionallight

const directionallight= new THREE.DirectionalLight(0x404040, 5.5 )
directionallight.position.set(0,1,500)
directionallight.visible=false;
directionallight.target.position.set(10,-5,10)
scene.add(directionallight)
scene.add(directionallight.target)
const directionallight2= new THREE.DirectionalLight(0x123456, 5.5 )
directionallight2.position.set(0,1,-500)
directionallight2.visible=false;
directionallight2.target.position.set(10,-5,10)
scene.add(directionallight2)
scene.add(directionallight2.target)

//hemisphere
const hemilight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
hemilight.position.set(0,80,0)
// const hemihelper = new THREE.HemisphereLightHelper(hemilight,10)
// scene.add(hemihelper)


//gui folders
//light folder
const LightsF = gui.addFolder('Lights')
var item_moonlight = LightsF.add(spotlight,'visible').onChange().name('turn on/off moon light')
//const lightFolder = LightsF.addFolder('Spot Light')

/*lightFolder.addColor(palette,'color').onChange(function(value){
    spotlight.color.r =value[0]/255;
    spotlight.color.g =value[1]/255;
    spotlight.color.b =value[2]/255;
})

lightFolder.add(pos,"x_1",-30,30,0.05).onChange(function(value){
    spotlight.position.x=value;
    spotlight.target.position.x=value;
    moon.position.x=value
}).name('x')
lightFolder.add(pos,'y_1',10,60,0.05).onChange(function(value){
    spotlight.position.y=value;
    moon.position.y=value
}).name('y')
lightFolder.add(pos,'z_1',-30,30,0.05).onChange(function(value){
    spotlight.position.z=value;
    spotlight.target.position.z=value;
    moon.position.z=value
}).name('z')
lightFolder.add(spotlight,'intensity').min(0).max(15).step(0.01)
*/

var moon_velocity=0.5
function moon_animation(){
    moon.rotateY(0.02)
    moon.translateZ(moon_velocity)
    moon.translateX(moon_velocity)
    //moon_velocity+=0.001
    spotlight.position.copy(moon.position)
    spotlight.target.position.x=moon.position.x
    
    spotlight.target.position.z=moon.position.z

}
function sun_animation(){
    sun.rotateY(0.02)
}

var day_or_night = { add:function(){
    day_night.is_day=!day_night.is_day;
    if(day_night.is_day==false){
        scene.background = new THREE.CubeTextureLoader()
	        .setPath( 'textures/day_night/cubemap/' )
	        .load( [
		        'px.png',
		        'nx.png',
		        'py.png',
		        'ny.png',
		        'pz.png',
		        'nz.png'
	        ] );
       
        item_moonlight = LightsF.add(spotlight,'visible').onChange().name('turn on/off moon light')
        scene.remove(sun);
        scene.remove(hemilight)
        scene.add(moon)
        spotlight.visible=true
        }
    else{
        scene.background = new THREE.CubeTextureLoader()
	        .setPath( 'textures/day_night/cubemap_day/' )
	        .load( [
		        'px.png',
		        'nx.png',
		        'py.png',
		        'ny.png',
		        'pz.png',
		        'nz.png'
	        ] );
        LightsF.remove(item_moonlight)
        
        scene.remove(moon)
        scene.add(sun)
        scene.add(hemilight)
        spotlight.visible=false;
    }
    }};
gui.add(day_or_night,'add').name('change day/night')



function check_borders(){
    var str= ''
    if(character_body.position.x>39 || character_body.position.x<-39 || character_body.position.z<-39 || character_body.position.z>39)
        str = 'sei caduto ritardato'
    
    return(str)

}
/*const g= new THREE.BoxGeometry(5,5,5)
const m =new THREE.MeshStandardMaterial({map : moonTexture, roughness:0.5, wireframe : false})
const f = new THREE.Mesh(g,m)
//f.visible=false
f.position.set(0,0,7)
objects.push(f)
scene.add(f)*/
var cnt_spwand=0
//var cnt_spwans=0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function spawn_point_dx(){
    if(cnt_spwand==0){
    for( var i = 0; i<3; i++){
     //   if(i==0) await sleep(10000) //wait 10s before the first spawn
        await sleep(3000)
        _LoadModels('./models/vecna_from_stranger_things/scene.gltf',0.8,0,5,20+5*i,1,i);
    }
    }
    else{}

    
}
async function spawn_point_sx(){
    if(cnt_spwand==0){
    for( var i = 3; i<6; i++){
      //  if(i==0) await sleep(10000) //wait 10s before first spawn
        await sleep(2000)
        _LoadModels('./models/vecna_from_stranger_things/scene.gltf',0.8,0,5,-20+5*(i-3),1,i);
        
    }
} else{}
    
    
}

//collisions
var conta_collisioni=0
character_body.addEventListener("collide",function(e){

    for(var i = 0; i<objects_body.length; i++){
        if (e.body==objects_body[i]){
            conta_collisioni++
           // console.log(conta_collisioni)
           
        }
    }
});

var conta_aiuti = 0;
logobody.addEventListener("collide",function(e){
    if (e.body==character_body){
        if(conta_aiuti<1) scene.fog = new THREE.FogExp2(0xDFE9F3,0.0) //prima era 0.05
        
        else{
            if(conta_aiuti<2 ){
                lamplight1.visible=true;
                lamplight2.visible=true
                lamplight3.visible=true
                lamplight4.visible=true
            }
            else{
                directionallight.visible=true;
                directionallight2.visible=true;
            }
        }
        conta_aiuti++
    }
});
// var conta_colpidati=0
// pugnoBody.addEventListener("collide",function(e){

//     for(var i = 0; i<objects_body.length; i++){
//         if (e.body==objects_body[i]){
//             conta_colpidati++
           
//         }
//     }
// });


// //console.log(attraverso)
// const pugno_vediamo_contact = new CANNON.ContactMaterial(
//     pugnoMaterial,
//     vediamoMaterial,
//     {
//         //friction:0.5,
//         contactEquationStiffness:0.1
//     }
// );
// world.addContactMaterial(pugno_vediamo_contact)

const stage_character_contact = new CANNON.ContactMaterial(
     stageMaterial,
     character_bodyMaterial,
     {
        friction:0.9,
        contactEquationStiffness:1e7
    }
);
world.addContactMaterial(stage_character_contact)
const stage_monster_contact = new CANNON.ContactMaterial(
    stageMaterial,
    character_bodyMaterial,
    {
       friction:0.7,
       contactEquationStiffness:1e7
   }
);
world.addContactMaterial(stage_monster_contact)

const attraverso = 1e7//-1000000
const character_monster_contact = new CANNON.ContactMaterial(
    character_bodyMaterial,
    monster_bodyMaterial,
    {
        friction:0,
        contactEquationStiffness:attraverso
    }
);
world.addContactMaterial(character_monster_contact)




 function insegui_meglio(stalker,stalker_body,target,target_body){
    //stalker.quaternion.copy(target.quaternion)
    if(stalker_body.position.y<1){
        stalker.lookAt(target.position.x,1,target.position.z)
        stalker_body.velocity.x = Math.sign(target_body.position.x-stalker_body.position.x)*.5;
        stalker_body.velocity.z = Math.sign(target_body.position.z-stalker_body.position.z)*.5;
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
}
window.addEventListener('resize',onWindowResize)

//var tween1 = new TWEEN.Tween()

function animate(){
    if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);
		
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

    world.step(timestep)
    cannonDebug.update()
    //from CANNON to Threejs
    Character.update();
	if(Monster!=null){
        for(var i in Monster)
	    Monster[i].update();
    }
    
// 3rd person camera
    camera.copy(fake_camera)
    a.lerp(Character._target.position, 0.4);
    b.copy(goal.position);

    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - distancefrom;
    goal.position.addScaledVector( dir, dis );
  
    //camera.position.lerp(temp, 0.2);
    camera.lookAt( Character._target.position );
    //check if you fell
    //check_borders();
    //collision_avoidance();
    moon_animation();
    sun_animation();
    updateScoreBoard();
    //follow_me();

    if(cnt_spwand==0){
        spawn_point_dx();
        spawn_point_sx()
        cnt_spwand++
    }
    else{}
    for (var i = 0; i<objects_body.length; i++){
        objects[i].position.copy(objects_body[i].position)
        //objects[i].quaternion.copy(objects_body[i].quaternion)
        insegui_meglio(objects[i],objects_body[i],meshes_character,character_body)
        //console.log(objects_body[i].position.y)
       // stalker.lookAt(target.position)
    }
    

  //fino a qua
    //requestAnimationFrame(animate)
    
    renderer.render(scene,camera)
}
renderer.setAnimationLoop(animate)
