import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { MonsterFSM } from '../Movements/MonsterFSM.js';

export class BasicMonsterController { //represents a single animated monster in the world
    constructor(target) {
        this._Init(target);
    }

    _Init(target) {
        this._target = target;
        
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(0.1, 0.25, 0.01);
        this._velocity = new THREE.Vector3(0, 0, 0);
        
        this._stateMachine = new MonsterFSM(this._target);
        this._stateMachine.SetState('idle');
        this._input = new BasicMonsterControllerInput();
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
                velocity.z += acc.z * 2.0;
            }
            else {
                if (this._input._keys.left) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, this._acceleration.y);
                    _R.multiply(_Q);
                }
                if (this._input._keys.right) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, -this._acceleration.y);
                    _R.multiply(_Q);
                }
                velocity.z += acc.z ;
            }
        }
        else if (this._input._keys.backward) {
            if (this._input._keys.shift) {
                velocity.z -= acc.z * 2.0;
            }
            else {
                if (this._input._keys.left) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, this._acceleration.y);
                    _R.multiply(_Q);
                }
                if (this._input._keys.right) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, -this._acceleration.y);
                    _R.multiply(_Q);
                }
                velocity.z -= acc.z;
            }
        }

        else if (this._input._keys.left) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.0001;
            _Q.setFromAxisAngle(_A, this._acceleration.y);
            _R.multiply(_Q);
        }
        else if (this._input._keys.right) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.0001;
            _Q.setFromAxisAngle(_A, -this._acceleration.y);
            _R.multiply(_Q);
        }
        else {
            velocity.z = 0;
            velocity.x = 0;
            velocity.y = 0;

            this._acceleration.x = 0.1;
            this._acceleration.y = 0.25;
            this._acceleration.z = 0.01;
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
      
        controlObject.position.add(forward);
        controlObject.position.add(sideways);
    }

};

class BasicMonsterControllerInput { //resposible for keyboard and other controller input
    constructor() {
        this._Init();
    }

    _Init(){
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            enter: false
        };
        document.addEventListener('keydown', (e)=>this._onKeyDown(e), false);
        document.addEventListener('keyup', (e)=>this._onKeyUp(e), false); 
    }

    _onKeyDown(event){
        switch(event.keyCode){
            case 73: //I
                this._keys.forward=true;
                break;
            case 74: // j
                this._keys.left = true;
                break;
            case 75: // k
                this._keys.backward = true;
                break;
            case 76: // l
                this._keys.right = true;
                break;
            case 13: // ENTER
                this._keys.enter = true;
                break;
        }
    }
        
    _onKeyUp(event) {
        switch(event.keyCode) {
            case 73: //I
                this._keys.forward=false;
                break;
            case 74: // j
                this._keys.left = false;
                break;
            case 75: // k
                this._keys.backward = false;
                break;
            case 76: // l
                this._keys.right = false;
                break;
            case 13: // ENTER
                this._keys.enter = false;
                break;
        }
    }
};