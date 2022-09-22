import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { CharacterFSM } from '../Movements/CharacterFSM.js';
import * as CANNON from '../../cannon-es.js'
//import CannonDebugger from '../cannon-es-debugger.js'

export class BasicCharacterController { //represents a single animated character in the world
    constructor(params) {
        this._Init(params);
    }

    _Init(params) {
        this._target = params.target;
        this._entity = params.entity;
        this._body = params.body;

        this._decceleration = new THREE.Vector3(-0.5, -0.005, -0.3);
        this._acceleration = new THREE.Vector3(0.1, 0.001, 0.02);
        this._velocity = new THREE.Vector3(0, 0, 0);
    
        this._stateMachine = new CharacterFSM(this._target, this._entity);
        this._stateMachine.SetState('idle');
        this._input = new BasicCharacterControllerInput();
    }

    _getPunchBody(){
        return this._stateMachine._GetPunchBody();
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
      
        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();
      
        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();
      
        sideways.multiplyScalar(velocity.x);
        forward.multiplyScalar(velocity.z);
      
        /*controlObject.position.add(forward);
        controlObject.position.add(sideways);

        this._target.position.copy(this._body.position);
        this._target.position.subVectors(temp,(0,-1,0));
        this._target.quaternion.copy(this._body.quaternion);
        this._target.position.y -= 2;*/

        this._body.velocity.x += sideways.x+forward.x;
        this._body.velocity.z += sideways.z+forward.z;

        /*var norm = Math.sqrt(Math.pow(this._body.velocity.x, 2) + Math.pow(this._body.velocity.z, 2));
        if (this._input._keys.forward && this._input._keys.shift) {
            if(norm > 120){
                this._body.velocity.x = this._body.velocity.x/norm*120;
                this._body.velocity.z = this._body.velocity.z/norm*120;
            }
        } else if(norm > 60){
            this._body.velocity.x = this._body.velocity.x/norm*60;
            this._body.velocity.z = this._body.velocity.z/norm*60;
        }*/

        controlObject.position.copy(this._body.position);
        controlObject.position.y -= 0.8;
    }
  
};

class BasicCharacterControllerInput { //resposible for keyboard and other controller input
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
        //document.addEventListener( 'mousemove', (e) => this._onMouseMove(e), false );
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
