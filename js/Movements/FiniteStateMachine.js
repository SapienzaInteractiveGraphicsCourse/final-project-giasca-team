
export class FiniteStateMachine{
    constructor(target) {
        this._states = {};
        this._currentState = null;
        this._target = target;
    }

    _prepareDict(){
        for (var i in this._targetDict) {
            this._targetDict[i].mesh = this._target.getObjectByName(this._targetDict[i].name);
            if(this._targetDict[i].initValue != null) {
                if ( this._targetDict[i].initValue.x != 0 ) this._targetDict[i].mesh.rotation.x = this._targetDict[i].initValue.x;
                else if ( this._targetDict[i].initValue.x == 0 ) this._targetDict[i].initValue.x = this._targetDict[i].mesh.rotation.x;
                if ( this._targetDict[i].initValue.y != 0 ) this._targetDict[i].mesh.rotation.y = this._targetDict[i].initValue.y;
                else if ( this._targetDict[i].initValue.y == 0 ) this._targetDict[i].initValue.y = this._targetDict[i].mesh.rotation.y;
                if ( this._targetDict[i].initValue.z != 0) this._targetDict[i].mesh.rotation.z = this._targetDict[i].initValue.z;
                else if ( this._targetDict[i].initValue.z == 0 ) this._targetDict[i].initValue.z = this._targetDict[i].mesh.rotation.z;
                //this._targetDict[i].mesh.rotation[2] = this._targetDict[i].initValue.z;
            }
            else {
                this._targetDict[i].initValue = { x: this._targetDict[i].mesh.rotation.x, y: this._targetDict[i].mesh.rotation.y, z: this._targetDict[i].mesh.rotation.z };
            }

            if ( this._targetDict[i].setValue != null ) {
                if(this._targetDict[i].setValue.z == 0 ) {
                    this._targetDict[i].setValue.z = this._targetDict[i].initValue.z;
                }
                if (this._targetDict[i].setValue.y == 0) {
                    this._targetDict[i].setValue.y = this._targetDict[i].initValue.y;   
                }
                if(this._targetDict[i].setValue.x == 0) {
                    this._targetDict[i].setValue.x = this._targetDict[i].initValue.x;
                }
            }
            else {
                this._targetDict[i].setValue = { x: this._targetDict[i].initValue.x, y: this._targetDict[i].initValue.y, z: this._targetDict[i].initValue.z };
            }
        }
    }
    
    _GetState(){
        return this._currentState;
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
    
    Update(input) {
        if (this._currentState) {
          this._currentState.Update(input);
        }
    }
};

export class State {
    constructor(params) {
      this._parent = params.parent;
      this._targetDict = params.targetDict;
      this._name = params.name;
    }
    lerp (start, end, amt){
        return [
            (1-amt)*start.x+amt*end.x,
            (1-amt)*start.y+amt*end.y,
            (1-amt)*start.z+amt*end.z,
        ]
    }    
    Enter() {}
    Exit() {}
    Update() {}
    //Punch(state) {}
};