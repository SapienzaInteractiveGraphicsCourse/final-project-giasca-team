import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';
import { MonsterFSM } from '../Movements/MonsterFSM.js';

export class MonsterController {
    constructor(target) {
        this._Init(target);
    }

    _Init(target) {
        this._target = target;
        
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(0.1, 0.25, 0.01);
        this._velocity = new THREE.Vector3(0, 0, 0);
        
        this._stateMachine = new MonsterFSM(this._target);
        this._stateMachine.SetState('walk');
    }

    _getStateMachine(){
        return this._stateMachine;
    }

    _getCurrentState(){
        return this._stateMachine._GetState();
    }
    
    _setState(name){
        this._stateMachine.SetState(name);
    }

    update(){
        this._stateMachine.Update();

    }

};
