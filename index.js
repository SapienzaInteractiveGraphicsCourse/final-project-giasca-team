import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import * as dat from './gui/dat.gui.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js'; //chissa perche non andava caricando il path locale dalla cartella controls
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';

//camera

//nella mappa presente capanna, alberi, creare una collinetta, casa che si puo entrare, qualche lampione con la spotlight, macchina rotta, staccionata
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
//SCENE
const scene = new THREE.Scene();

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

//camera
var goal,follow

var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var distancefrom = 1;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
 0.1, 1000 );

camera.position.set(-5,3,0)
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
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}

//OBJECTS 
var objects =[];
//stage
const geometry = new THREE.BoxBufferGeometry(60,0.001,60,200,200);
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
//moon
const mgeometry = new THREE.SphereGeometry(5,20,20)
const mesh = new THREE.MeshStandardMaterial({map : moonTexture, roughness:0.5})
const moon = new THREE.Mesh(mgeometry, mesh)

moon.position.set(0,40,0)

scene.add(moon)

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
    house.position.set(20,2.6,20)
    const hg= new THREE.BoxGeometry(5,5,5)
    const hm =new THREE.MeshStandardMaterial({map : moonTexture, roughness:0.5})
    const h = new THREE.Mesh(hg,hm)
    h.position.set(20,2.6,20)
    h.rotation.y=-45
    scene.add(house);
    scene.add(h)
    objects.push(h)
})
loaderf1.load('./models/wood fence/scene.gltf', function(gltf){
    fence1= gltf.scene;
    fence1.scale.set(0.002,0.002,0.008)
    stage.attach(fence1);
    fence1.position.set(-25,-0.7,-20) //prima y era -1.2
    fence1.rotation.y = Math.PI/180 
    scene.add(fence1);
    objects.push(fence1)
})
loaderf2.load('./models/wood fence/scene.gltf', function(gltf){
    fence2= gltf.scene;
    fence2.scale.set(0.002,0.002,0.008)
    stage.attach(fence2);
    fence2.position.set(-18,-0.7,-28)
    fence2.rotation.y=Math.PI/180 * 90;
    scene.add(fence2);
    objects.push(fence2)
})
loaderf3.load('./models/wood fence/scene.gltf', function(gltf){
    fence3= gltf.scene;
    fence3.scale.set(0.002,0.002,0.008)
    stage.attach(fence3);
    fence3.position.set(-12,-0.7,-20)
    fence3.rotation.y=Math.PI/180;
    scene.add(fence3);
    objects.push(fence3)
})
loaderf4.load('./models/wood fence/scene.gltf', function(gltf){
    fence4= gltf.scene;
    fence4.scale.set(0.002,0.002,0.002)
    stage.attach(fence4);
    fence4.position.set(-13.5,-0.7,-14.5)
    fence4.rotation.y=Math.PI/180 * 90;
    scene.add(fence4);
    objects.push(fence4)
})
loaderf5.load('./models/wood fence/scene.gltf', function(gltf){
    fence5= gltf.scene;
    fence5.scale.set(0.002,0.002,0.002)
    stage.attach(fence5);
    fence5.position.set(-23.5,-0.7,-14.5)
    fence5.rotation.y=Math.PI/180 * 90;
    scene.add(fence5);
    objects.push(fence5)
})
loadert1.load('./models/tree forest/scene.gltf', function(gltf){
    forest1= gltf.scene;
    //forest1.scale.set(0.7,0.7,0.7)
    forest1.position.set(15,-1.2,-17)
    forest1.rotation.y=Math.PI/180* -45
    stage.attach(forest1);
    scene.add(forest1);
    objects.push(forest1)
})
loadert2.load('./models/tree forest/scene.gltf', function(gltf){
    forest2= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest2.position.set(15,-1.2,-15)
    forest2.rotation.y=Math.PI/180* -45
    stage.attach(forest2);    
    scene.add(forest2);
    objects.push(forest2)
})
loadert3.load('./models/tree forest/scene.gltf', function(gltf){
    forest3= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest3.position.set(15,-1.2,-13)
    forest3.rotation.y=Math.PI/180* -45
    stage.attach(forest3);
    scene.add(forest3);
    objects.push(forest3)
})
loadert4.load('./models/tree forest/scene.gltf', function(gltf){
    forest4= gltf.scene;
    //forest.scale.set(0.7,0.7,0.7)
    forest4.position.set(15,-1.2,-11)
    forest4.rotation.y=Math.PI/180* -45
    stage.attach(forest4);
    scene.add(forest4);
    objects.push(forest4)
})
loadertt.load('./models/tree trunk/scene.gltf', function(gltf){
    trunk= gltf.scene;
    trunk.scale.set(2,2,2)
    trunk.position.set(6,-1,0)
    trunk.rotation.z=Math.PI/180* 90
    trunk.rotation.y=Math.PI/180* 90
    stage.attach(trunk)
    scene.add(trunk);
    objects.push(trunk)
})
loaderlamp1.load('./models/street lamp/scene.gltf', function(gltf){
    lamp1= gltf.scene;
    lamp1.scale.set(0.05,0.05,0.05)
    lamp1.position.set(13.5,4.5,10)
    stage.attach(lamp1)
    scene.add(lamp1);
    objects.push(lamp1)
})
loaderlamp2.load('./models/street lamp/scene.gltf', function(gltf){
    lamp2= gltf.scene;
    lamp2.scale.set(0.05,0.05,0.05)
    lamp2.position.set(-18.5,4.5,-21)
    stage.attach(lamp2);
    scene.add(lamp2);
    objects.push(lamp2)
})
loaderlamp3.load('./models/street lamp/scene.gltf', function(gltf){
    lamp3= gltf.scene;
    lamp3.scale.set(0.05,0.05,0.05)
    lamp3.position.set(16,4.5,-17)
    stage.attach(lamp3);
    scene.add(lamp3);
    objects.push(lamp3)
})
loaderlamp4.load('./models/street lamp/scene.gltf', function(gltf){
    lamp4= gltf.scene;
    lamp4.scale.set(0.05,0.05,0.05)
    lamp4.position.set(-26,4.5,25)
    stage.attach(lamp4);
    scene.add(lamp4);
    objects.push(lamp4)
})
loaderbench1.load('./models/benches/bench 1/scene.gltf', function(gltf){
    bench1= gltf.scene;
    bench1.scale.set(2,2,2);
    bench1.position.set(-23,-1.5,-20)
    bench1.rotation.y=Math.PI/180*-90;
    stage.attach(bench1);
    scene.add(bench1);
    objects.push(bench1)
})
loaderbench2.load('./models/benches/bench 2/scene.gltf', function(gltf){
    bench2= gltf.scene;
    bench2.scale.set(1.5,1.5,1.5);
    bench2.position.set(-14,-2,-20)
    bench2.rotation.y=Math.PI/180*-90;
    stage.attach(bench2);
    scene.add(bench2);
    objects.push(bench2)
})
loaderbench3.load('./models/benches/bench 3/scene.gltf', function(gltf){
    bench3= gltf.scene;
    bench3.scale.set(2,2,2);
    bench3.position.set(-19,-1,-25)
   // bench.rotation.y=Math.PI/180*-90;
    stage.attach(bench3);
    scene.add(bench3);
    objects.push(bench3)
})
loadercar.load('./models/car/scene.gltf', function(gltf){
    car= gltf.scene;
    car.scale.set(0.5,0.5,0.5);
    car.position.set(-25,0,19)
    car.rotation.y=Math.PI/180*45;
    stage.attach(car);
    scene.add(car);
    objects.push(car)
})
//lights
const ambientlight = new THREE.AmbientLight(0x404040);
scene.add(ambientlight);
//lamp spotlight
const lamplight1 = new THREE.SpotLight(0x654321,4.5,0,0.85)
lamplight1.position.set(13.5,4.5,10)
lamplight1.target.position.set(13.5,1,10)
lamplight1.visible=false
scene.add(lamplight1)
scene.add(lamplight1.target)

const lamplight2 = new THREE.SpotLight(0x654321,4.5,0,0.85)
lamplight2.position.set(-18.5,4.5,-21)
lamplight2.target.position.set(-18.5,1,-21)
lamplight2.visible=false
scene.add(lamplight2)
scene.add(lamplight2.target)

const lamplight3 = new THREE.SpotLight(0x654321,4.5,0,0.85)
lamplight3.position.set(16,6,-17)
lamplight3.target.position.set(16,4,-17)
lamplight3.visible=false
scene.add(lamplight3)
scene.add(lamplight3.target)

const lamplight4 = new THREE.SpotLight(0x654321,4.5,0,0.85)
lamplight4.position.set(-26,4.5,25)
lamplight4.target.position.set(-26,-1,25)
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

spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

spotlight.shadow.camera.near = 500;
spotlight.shadow.camera.far = 4000;
spotlight.shadow.camera.fov = 30;

scene.add(stage,spotlight)
scene.add(spotlight.target)
let palette = {
    color: [255,0,0]
}
//per capire dove sta la luce
const spotLightHelper= new THREE.SpotLightHelper(spotlight,.5)
scene.add(spotLightHelper)
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

//gui folders
//light folder
const LightsF = gui.addFolder('Lights')
const lightFolder = LightsF.addFolder('Spot Light')

lightFolder.addColor(palette,'color').onChange(function(value){
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

LightsF.add(lamplight1,'visible').name('turn on the stree lamps').onChange(function(value){
    lamplight2.visible=value;
    lamplight3.visible=value;
    lamplight4.visible=value;
})
LightsF.add(is_vis,'visi').name('turn on directional light').onChange(function(value){
    directionallight.visible=value;
    directionallight2.visible=value;
})

//camera folder
/*const cameraFolder = gui.addFolder('camera')
cameraFolder.add(camera,'fov',0,200,2)
cameraFolder.add(camera,'near',0,1,0.1)
cameraFolder.add(camera,'far',1,2000,2)
cameraFolder.add(camera.position,'x',-60,60)
cameraFolder.add(camera.position,'y',-50,100)
cameraFolder.add(camera.position,'z',-60,60)*/

gui.add(scene.fog,'density',0.001,0.5,0.005).name('fog density')


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
    if(vediamo.position.x>29){
        vediamo.rotateY(3.15)
    }
    else if (vediamo.position.x<-29){
        vediamo.rotateY(-3.15)
    }
    else if (vediamo.position.z<-29){
        vediamo.translateZ(1)
        console.log('nel negativo suca')
    }
    else if (vediamo.position.z>29){
        vediamo.translateZ(-1)
        console.log('nel positivo daje')
    }
}
const g= new THREE.BoxGeometry(5,5,5)
const m =new THREE.MeshStandardMaterial({map : moonTexture, roughness:0.5, wireframe : false})
const f = new THREE.Mesh(g,m)
//f.visible=false
f.position.set(0,0,7)
objects.push(f)
scene.add(f)

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
  

  //fino a qua
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()
