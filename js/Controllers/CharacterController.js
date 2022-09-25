import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { CharacterFSM } from '../Movements/CharacterFSM.js';
import * as CANNON from '../../resources/cannon-es.js'

export class CharacterController {
    constructor(params) {
        this._Init(params);
    }

    _Init(params) {
        this._target = params.target;
        this._entity = params.entity;
        this._body = params.body;
        this._punch_body = params.punch_body;
        this._decceleration = new THREE.Vector3(-0.5, -0.005, -0.3);
        this._acceleration = new THREE.Vector3(0.1, 0.001, 0.02);
        this._velocity = new THREE.Vector3(0, 0, 0);
    
        this._stateMachine = new CharacterFSM(this._target, this._entity);
        this._stateMachine.SetState('idle');
        this._input = new CharacterControllerInput();
    }

    update(){
        this._stateMachine.Update(this._input);

        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));
        velocity.add(frameDecceleration);

        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();
        if (this._input._keys.forward) {
            if (this._input._keys.shift) {
                velocity.z += acc.z * 2;
            }
            else {
                velocity.z += acc.z*1.2 ;
            }
        }
        if (this._input._keys.backward) {
            if (this._input._keys.shift) {
                velocity.z -= acc.z * 1.2;
            }
            else {
                velocity.z -= acc.z;
            }
        }

        if (this._input._keys.left) {
            _A.set(0, 1, 0);
            velocity.y += acc.y;
            _Q.setFromAxisAngle(_A, velocity.y);
            _R.multiply(_Q);
        }
        if (this._input._keys.right) {
            _A.set(0, 1, 0);
            velocity.y += acc.y;
            _Q.setFromAxisAngle(_A, -velocity.y);
            _R.multiply(_Q);
        }
        if( !(this._input._keys.forward || this._input._keys.backward || this._input._keys.left || this._input._keys.right) ){
            this._body.velocity.x *= 0.92;
            this._body.velocity.y *= 0.92;
            this._body.velocity.z *= 0.92;
        }

        controlObject.quaternion.copy(_R);
        this._punch_body.quaternion.copy(controlObject.quaternion);

        if(this._input._keys.space){
            if(this._punch_body.position.distanceTo(this._body.position)<2){
                let relativeVector = new CANNON.Vec3(0,0,1 );
                this._punch_body.quaternion.vmult(relativeVector, relativeVector);
                this._punch_body.position.vadd(relativeVector, this._punch_body.position);
                this._punch_body.position.y=2 
            }
            else{
                
            this._punch_body.position.copy(this._body.position);
            this._punch_body.position.y=2 
            }
        }
        else{
            this._punch_body.position.copy(this._body.position);
            this._punch_body.position.y=2 
        }

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();
      
        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();
      
        sideways.multiplyScalar(velocity.x);
        forward.multiplyScalar(velocity.z);

        this._body.velocity.x += sideways.x+forward.x;
        this._body.velocity.z += sideways.z+forward.z;

        controlObject.position.copy(this._body.position);
        controlObject.position.y -= 0.8;
    }
  
};

class CharacterControllerInput { //resposible for keyboard and other controller input
    constructor() {
        this._Init();
    }

    _Init(){
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };
        document.addEventListener('keydown', (e)=>this._onKeyDown(e), false);
        document.addEventListener('keyup', (e)=>this._onKeyUp(e), false); 
    }

    _onKeyDown(event){
        switch(event.keyCode){
            case 87: //W
                this._keys.forward=true;
                break;
            case 65: // a
                this._keys.left = true;
                break;
            case 83: // s
                this._keys.backward = true;
                break;
            case 68: // d
                this._keys.right = true;
                break;
            case 32: // SPACE
                this._keys.space = true;
                break;
            case 16: // SHIFT
                this._keys.shift = true;
                break;
        }
    }
        
    _onKeyUp(event) {
        switch(event.keyCode) {
            case 87: // w
                this._keys.forward = false;
                break;
            case 65: // a
                this._keys.left = false;
                break;
            case 83: // s
                this._keys.backward = false;
                break;
            case 68: // d
                this._keys.right = false;
                break;
            case 32: // SPACE
                this._keys.space = false;
                break;
            case 16: // SHIFT
                this._keys.shift = false;
                break;
        }
    }
};