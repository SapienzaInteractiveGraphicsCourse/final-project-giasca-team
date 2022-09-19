import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import * as CANNON from './cannon-es.js'
import CannonDebugger from './cannon-es-debugger.js'
import * as TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.6.4/dist/tween.esm.js'


var objects_body= []
var objects=[]
const scene = new THREE.Scene();
scene.background= new THREE.Color( 0xff0000 )

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
})

const prova= new THREE.BoxGeometry(10,10,10)
const ma = new THREE.MeshBasicMaterial({color: 0xff00ff})
const vediamo = new THREE.Mesh(prova,ma)
//vediamo.position.y=20
vediamo.position.set(-15,20,0)
scene.add(vediamo)
objects.push(vediamo)

const vediamo_body = new CANNON.Body({
    mass: 10,
    shape : new CANNON.Box( new CANNON.Vec3(10,10,10)),
    //position : new CANNON.Vec3(0,20,0),
    //type: CANNON.Body.Static
})
vediamo_body.position.copy(vediamo.position)
world.addBody(vediamo_body)
objects_body.push(vediamo_body)

const prova2= new THREE.BoxGeometry(10,10,10)
const ma2 = new THREE.MeshBasicMaterial({color: 0x987654})
const vediamo2 = new THREE.Mesh(prova2,ma2)
//vediamo.position.y=20
vediamo2.position.set(25,20,30)
scene.add(vediamo2)
objects.push(vediamo2)

const vediamo_body2 = new CANNON.Body({
    mass: 10,
    shape : new CANNON.Box( new CANNON.Vec3(10,10,10)),
    //position : new CANNON.Vec3(0,20,0),
    //type: CANNON.Body.Static
})
vediamo_body2.position.copy(vediamo2.position)
world.addBody(vediamo_body2)
objects_body.push(vediamo_body2)


const sfera = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 16 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ))
sfera.position.y=0
scene.add(sfera)

const sferaBody = new CANNON.Body({
    mass: 10,
    shape : new CANNON.Sphere(2.5),
})
sferaBody.position.y=5
sferaBody.position.x=15
world.addBody(sferaBody)

//var or = vediamo_body.position
function insegui(o1,o2){
    const tween1 = new TWEEN.Tween(o1.position).to(o2.position,10000).onUpdate((coords)=>{
        o1.position.x = coords.x;
        o1.position.y= coords.y;
        o1.position.z= coords.z;
        o1.quaternion= o1.quaternion;
    })
    tween1.start()
}

const geometry = new THREE.BoxGeometry(80,0.001,80);
//geometry.attributes.position.setZ(1,0.9)
const material = new THREE.MeshStandardMaterial()
const stage = new THREE.Mesh(geometry, material)
scene.add(stage)

const stageBody = new CANNON.Body({
    mass: 0,
    shape : new CANNON.Box( new CANNON.Vec3(80,0.001,80)),
    position : new CANNON.Vec3(0,-1,0),
    //type: CANNON.Body.Static
})


world.addBody(stageBody)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
 0.1, 1000 );

camera.position.set(0,20,-50)//prima y era 3
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const timestep=1/60

var i= 0
function animate(){
    world.step(timestep)
    //requestAnimationFrame(animate)
    TWEEN.update()



    // vediamo.position.copy(vediamo_body.position)
    
    // vediamo.quaternion.copy(vediamo_body.quaternion)

    // vediamo2.position.copy(vediamo_body2.position)
    
    // vediamo2.quaternion.copy(vediamo_body2.quaternion)

    sfera.position.copy(sferaBody.position)
    
    sfera.quaternion.copy(sferaBody.quaternion)
    for(var i = 0; i<objects_body.length; i++){
        objects[i].position.copy(objects_body[i].position)
        objects[i].quaternion.copy(objects_body[i].quaternion)
        insegui(objects_body[i],sferaBody)
    }
    // insegui(vediamo_body,sferaBody)
    // insegui(vediamo_body2,sferaBody)

    // while(i!=1000){
        

    //     // x1=vediamo_body.position.x
    //     // y1=vediamo_body.position.y
    //     // z1=vediamo_body.position.z

    //     raggiungi(vediamo_body,sferaBody)
    //     i++
    // }
     renderer.render(scene,camera)

}
renderer.setAnimationLoop(animate)