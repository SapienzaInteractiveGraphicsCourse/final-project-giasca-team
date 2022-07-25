import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import * as dat from './gui/dat.gui.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js'; //chissa perche non andava caricando il path locale dalla cartella controls
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
//import * as CANNON from './cannon.js'
//camera

//Scoreboard
var scoreboard = document.getElementById('scoreBoard')
function updateScoreBoard(){
    scoreboard.innerHTML ='suca zombie uccisi:   20' + '           '+' colpi ricevuti:'
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
// const sun_gif = document.getElementById("sun")
// const sunTexture = new THREE.VideoTexture(sun_gif)
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
    
//}
// else{
//     scene.background = new THREE.CubeTextureLoader()
// 	    .setPath( 'textures/day_night/cubemap_day/' )
// 	    .load( [
// 		    'px.png',
// 		    'nx.png',
// 		    'py.png',
// 		    'ny.png',
// 		    'pz.png',
// 		    'nz.png'
// 	    ] );
// }
scene.fog= new THREE.FogExp2(0xDFE9F3,0.05) //prima era 0.05

//camera
var goal,follow

var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var distancefrom = 1;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
 0.1, 1000 );

camera.position.set(-5,5,0)//prima y era 3
camera.lookAt(scene.position)


const prova= new THREE.BoxGeometry(1,1,1)
const ma = new THREE.MeshNormalMaterial()
const vediamo = new THREE.Mesh(prova,ma)

goal = new THREE.Object3D;
follow = new THREE.Object3D;
goal.position.z = -distancefrom;
goal.add( camera );
scene.add(vediamo)

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

stage.geometry.attributes.uv2=stage.geometry.attributes.uv
scene.add(stage)
//cannon world
/*const world = new CANNON.world()
//cannon stage
const cannon_stage = new CANNON.body({
    shape: new CANNON.Plane()
})*/
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
var house;
var fence1, fence2, fence3, fence4, fence5;
var forest1, forest2, forest3, forest4;
var trunk;
var lamp1, lamp2, lamp3, lamp4;
var bench1, bench2, bench3;
var car;
loader1.load('./models/wood house/scene.gltf', function(gltf){
    
    house = gltf.scene;
    house.scale.set(0.01,0.01,0.01);
    stage.attach(house);
    house.rotation.y =-45;
    house.position.set(30,2.6,30)
    const hg= new THREE.BoxGeometry(10,10,9)
    const hm =new THREE.MeshStandardMaterial({ wireframe:true})
    const h = new THREE.Mesh(hg,hm)
    h.position.set(29,0,27)
    h.rotation.y=-45
    scene.add(house);
    scene.add(h)
    objects.push(h)
    h.visible=false
})
loaderf1.load('./models/wood fence/scene.gltf', function(gltf){
    fence1= gltf.scene;
    fence1.scale.set(0.002,0.002,0.008)
    stage.attach(fence1);
    fence1.position.set(-35,-0.7,-30) //prima y era -1.2
    fence1.rotation.y = Math.PI/180 
    scene.add(fence1);
    
    const f1g= new THREE.BoxGeometry(4,10,15)
    const f1m =new THREE.MeshStandardMaterial({ wireframe:true})
    const f1 = new THREE.Mesh(f1g,f1m)
    f1.position.set(-33.5,0,-30)
    f1.rotation.y= Math.PI/180
    scene.add(f1)
    objects.push(f1)
    f1.visible=false
})
loaderf2.load('./models/wood fence/scene.gltf', function(gltf){
    fence2= gltf.scene;
    fence2.scale.set(0.002,0.002,0.008)
    stage.attach(fence2);
    fence2.position.set(-28,-0.7,-38)
    fence2.rotation.y=Math.PI/180 * 90;
    scene.add(fence2);
    const f2g= new THREE.BoxGeometry(9,10,15)
    const f2m =new THREE.MeshStandardMaterial({ wireframe:true})
    const f2 = new THREE.Mesh(f2g,f2m)
    f2.position.set(-28,0,-35)
    f2.rotation.y= Math.PI/180*90
    scene.add(f2)
    objects.push(f2)
    f2.visible=false
})
loaderf3.load('./models/wood fence/scene.gltf', function(gltf){
    fence3= gltf.scene;
    fence3.scale.set(0.002,0.002,0.008)
    stage.attach(fence3);
    fence3.position.set(-22,-0.7,-30)
    fence3.rotation.y=Math.PI/180;
    scene.add(fence3);
    const f3g= new THREE.BoxGeometry(4,10,15)
    const f3m =new THREE.MeshStandardMaterial({ wireframe:true})
    const f3 = new THREE.Mesh(f3g,f3m)
    f3.position.set(-23,0,-30)
    f3.rotation.y= Math.PI/180
    scene.add(f3)
    objects.push(f3)
    f3.visible=false
})
loaderf4.load('./models/wood fence/scene.gltf', function(gltf){
    fence4= gltf.scene;
    fence4.scale.set(0.002,0.002,0.002)
    stage.attach(fence4);
    fence4.position.set(-23.5,-0.7,-24.5)
    fence4.rotation.y=Math.PI/180 * 90;
    scene.add(fence4);
})
loaderf5.load('./models/wood fence/scene.gltf', function(gltf){
    fence5= gltf.scene;
    fence5.scale.set(0.002,0.002,0.002)
    stage.attach(fence5);
    fence5.position.set(-33.5,-0.7,-24.5)
    fence5.rotation.y=Math.PI/180 * 90;
    scene.add(fence5);
})
loadert1.load('./models/tree forest/scene.gltf', function(gltf){
    forest1= gltf.scene;
    //forest1.scale.set(0.7,0.7,0.7)
    forest1.position.set(25,-1.2,-27)
    forest1.rotation.y=Math.PI/180* -45
    stage.attach(forest1);
    scene.add(forest1);
    const t1g= new THREE.BoxGeometry(10,10,22)
    const t1m =new THREE.MeshStandardMaterial({ wireframe:true})
    const t1 = new THREE.Mesh(t1g,t1m)
    t1.position.set(24.5,0,-27)
    t1.rotation.y= Math.PI/180*50
    scene.add(t1)
    objects.push(t1)
    t1.visible=false
})
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
    const ttg= new THREE.BoxGeometry(2,10,7)
    const ttm =new THREE.MeshStandardMaterial({ wireframe:true})
    const tt = new THREE.Mesh(ttg,ttm)
    tt.position.set(16,0,3)
   // tt.rotation.y= Math.PI/180*90
    scene.add(tt)
    objects.push(tt)
    tt.visible=false
})
loaderlamp1.load('./models/street lamp/scene.gltf', function(gltf){
    lamp1= gltf.scene;
    lamp1.scale.set(0.05,0.05,0.05)
    lamp1.position.set(23.5,4.5,20)
    const l1g= new THREE.BoxGeometry(4,10,5)
    const l1m =new THREE.MeshStandardMaterial({ wireframe:true})
    const l1 = new THREE.Mesh(l1g,l1m)
    l1.position.set(23,0,22)
    l1.rotation.y=-45
    scene.add(l1)
    stage.attach(lamp1)
    scene.add(lamp1);
    objects.push(lamp1)
    l1.visible=false
})
loaderlamp2.load('./models/street lamp/scene.gltf', function(gltf){
    lamp2= gltf.scene;
    lamp2.scale.set(0.05,0.05,0.05)
    lamp2.position.set(-28.5,4.5,-31)
    stage.attach(lamp2);
    scene.add(lamp2);
})
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
loaderbench2.load('./models/benches/bench 2/scene.gltf', function(gltf){
    bench2= gltf.scene;
    bench2.scale.set(1.5,1.5,1.5);
    bench2.position.set(-24,-2,-30)
    bench2.rotation.y=Math.PI/180*-90;
    stage.attach(bench2);
    scene.add(bench2);
})
loaderbench3.load('./models/benches/bench 3/scene.gltf', function(gltf){
    bench3= gltf.scene;
    bench3.scale.set(2,2,2);
    bench3.position.set(-29,-1,-35)
   // bench.rotation.y=Math.PI/180*-90;
    stage.attach(bench3);
    scene.add(bench3);
})
loadercar.load('./models/car/scene.gltf', function(gltf){
    car= gltf.scene;
    car.scale.set(0.5,0.5,0.5);
    car.position.set(-35,0,29)
    car.rotation.y=Math.PI/180*45;
    stage.attach(car);
    scene.add(car);
    const cg= new THREE.BoxGeometry(4,10,12)
    const cm =new THREE.MeshStandardMaterial({ wireframe:true})
    const c = new THREE.Mesh(cg,cm)
    c.position.set(-33.5,0,30)
    c.rotation.y= Math.PI/180*30
    scene.add(c)
    objects.push(c)
    c.visible=false
})
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
var is_vis = {
    visi:false,
}
const directionallight= new THREE.DirectionalLight(0x404040, 5.5 )
directionallight.position.set(0,1,500)
directionallight.visible=is_vis.visi;
directionallight.target.position.set(10,-5,10)
scene.add(directionallight)
scene.add(directionallight.target)
const directionallight2= new THREE.DirectionalLight(0x123456, 5.5 )
directionallight2.position.set(0,1,-500)
directionallight2.visible=is_vis.visi;
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
LightsF.add(lamplight1,'visible').name('turn on the stree lamps').onChange(function(value){
    lamplight2.visible=value;
    lamplight3.visible=value;
    lamplight4.visible=value;
})
LightsF.add(is_vis,'visi').name('turn on directional light').onChange(function(value){
    directionallight.visible=value;
    directionallight2.visible=value;
})
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
        scene.fog= new THREE.FogExp2(0xDFE9F3,0.05)
        item_moonlight = LightsF.add(spotlight,'visible').onChange().name('turn on/off moon light')
        item_day_night =gui.add(scene.fog,'density',0.001,0.5,0.005).name('fog density')
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
        gui.remove(item_day_night)
        LightsF.remove(item_moonlight)
        scene.fog= new THREE.FogExp2(0xDFE9F3,0)
        scene.remove(moon)
        scene.add(sun)
        scene.add(hemilight)
        spotlight.visible=false;
    }
    }};
gui.add(day_or_night,'add').name('change day/night')

var item_day_night =gui.add(scene.fog,'density',0.001,0.5,0.005).name('fog density')
//movimento cubo
var speed=0.0
var velocity=0.0
var keys
keys = {
    a: false,
    s: false,
    d: false,
    w: false
  };
document.body.addEventListener( 'keydown', function(e) {
    
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = true;
    
  });
document.body.addEventListener( 'keyup', function(e) {
    
    var key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
    
});

function avoid_borders(){
    if(vediamo.position.x>39){
        vediamo.rotateY(3.15)
    }
    else if (vediamo.position.x<-39){
        vediamo.rotateY(-3.15)
    }
    else if (vediamo.position.z<-39){
        vediamo.translateZ(1)
        console.log('nel negativo suca')
    }
    else if (vediamo.position.z>39){
        vediamo.translateZ(-1)
        console.log('nel positivo daje')
    }
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
        await sleep(10000)
        const g= new THREE.BoxGeometry(5,5,5)
        const m =new THREE.MeshStandardMaterial()
        const f = new THREE.Mesh(g,m)
        f.position.set(0,0,20+5*i);
        //il cubo è solo di prova, come il 5*i nella posizione,
        //al posto del cubo metti mostro + animazione e lascia 20 a z per farlo partire da destra
        //sleep l'ho messo a 10000ms= 10 secondi
        scene.add(f)
    }
    //cnt_spwand++
    
}
else{}

    
}
async function spawn_point_sx(){
    if(cnt_spwand==0){
    for( var i = 0; i<3; i++){
        await sleep(10000)
        const g= new THREE.BoxGeometry(5,5,5)
        const m =new THREE.MeshStandardMaterial()
        const f = new THREE.Mesh(g,m)
        f.position.set(0,0,-20+5*i);
        //il cubo è solo di prova, come il 5*i nella posizione,
        //al posto del cubo metti mostro + animazione e lascia -20 a z per farlo partire da sinistra
        //sleep l'ho messo a 10000ms= 10 secondi
        scene.add(f)
    }
} else{}
    
    
}

function collision_avoidance(){
    var originPoint=vediamo.position.clone()
    for (var vertexIndex = 0; vertexIndex < vediamo.geometry.attributes.position.array.length; vertexIndex++)
	{		
		var localVertex = new THREE.Vector3().fromBufferAttribute(vediamo.geometry.attributes.position, vertexIndex).clone();
		var globalVertex = localVertex.applyMatrix4( vediamo.matrix );
		var directionVector = globalVertex.sub( vediamo.position );
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( objects );
        
		if ( collisionResults.length > 0 &&
             collisionResults[0].distance < directionVector.length()+2){
            console.log(directionVector.z)
            //speed*=-1
             vediamo.rotateY(velocity)
            //vediamo.rotateY(Math.sin(vediamo.position.x)-Math.cos(vediamo.position.z))
        }
	}	
}

function animate(){
    //animazione cubo
    speed = 0.0;
  
    if ( keys.w )
        speed = 0.1;
    else if ( keys.s )
        speed = -0.1;

    velocity += ( speed - velocity ) ;
    vediamo.translateZ( velocity );

    if ( keys.a )
        vediamo.rotateY(0.05);
    else if ( keys.d )
        vediamo.rotateY(-0.05);
//fino a qua

// 3rd person camera

    camera.copy(fake_camera)
    a.lerp(vediamo.position, 0.4);
    b.copy(goal.position);

    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - distancefrom;
    goal.position.addScaledVector( dir, dis );
  
    //camera.position.lerp(temp, 0.2);
    camera.lookAt( vediamo.position );
    //no border fall
    avoid_borders();
    collision_avoidance();
    moon_animation();
    sun_animation();
    updateScoreBoard();

    if(cnt_spwand==0){
        spawn_point_dx();
        spawn_point_sx()
        cnt_spwand++
    }
    else{}
    

  //fino a qua
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()
