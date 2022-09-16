import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import * as CANNON from './cannonjs/node_modules/cannon-es/dist/cannon-es.js'

const scene = new THREE.Scene();
scene.background= new THREE.Color( 0xff0000 )

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
})

const prova= new THREE.BoxGeometry(10,10,10)
const ma = new THREE.MeshNormalMaterial()
const vediamo = new THREE.Mesh(prova,ma)
vediamo.position.y=50
scene.add(vediamo)

const vediamo_body = new CANNON.Body({
    mass: 1000,
    shape : new CANNON.Box( new CANNON.Vec3(10,10,10)),
    //position : new CANNON.Vec3(0,20,0),
    //type: CANNON.Body.Static
})
vediamo_body.position.y=vediamo.position.y
world.addBody(vediamo_body)

const sfera = new THREE.Mesh(new THREE.SphereGeometry( 5, 32, 16 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ))
sfera.position.y=10
scene.add(sfera)

const sferaBody = new CANNON.Body({
    mass: 50000,
    shape : new CANNON.Sphere(2.5),
    

    //type: CANNON.Body.Static
})
sferaBody.position.y=sfera.position.y
sferaBody.position.x=5
world.addBody(sferaBody)

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
function animate(){
    world.step(timestep)
    //requestAnimationFrame(animate)

    stage.position.copy(stageBody.position)
    
    stage.quaternion.copy(stageBody.quaternion)

    vediamo.position.copy(vediamo_body.position)
    
    vediamo.quaternion.copy(vediamo_body.quaternion)

    sfera.position.copy(sferaBody.position)
    
    sfera.quaternion.copy(sferaBody.quaternion)


    renderer.render(scene,camera)

}
renderer.setAnimationLoop(animate)