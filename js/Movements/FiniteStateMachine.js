import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

export class FiniteStateMachine{
    constructor(target) {
        this._states = {};
        this._currentState = null;
        this._target = target;
    }

    _prepareDict(){
        for (var i in this._targetDict) {
            this._targetDict[i].mesh = this._target.getObjectByName(this._targetDict[i].name);
            if(this._targetDict[i].initValue == null)
                this._targetDict[i].initValue = this._targetDict[i].mesh.rotation.clone();
        }
    }
    
    _AddState(name, type) {
        this._states[name] = type;
    }
    
    SetState(name) {
        const prevState = this._currentState;
        
        if (prevState) {
          if (prevState.Name == name) {
            return;
          }
          prevState.Exit();
        }
    
        const state = new this._states[name]({
            parent: this,
            targetDict: this._targetDict, name: name, 
        });
    
        this._currentState = state;
        state.Enter(prevState);
    }
    
    Update(/*timeElapsed,*/ input) {
        if (this._currentState) {
          this._currentState.Update(/*timeElapsed,*/ input);
        }
    }
};

export class State {
    constructor(params) {
      this._parent = params.parent;
      this._targetDict = params.targetDict;
      this._name = params.name;
    }
  
    Enter() {}
    Exit() {}
    Update() {}
};