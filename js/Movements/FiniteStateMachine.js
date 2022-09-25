
export class FiniteStateMachine{
    constructor(target) {
        this._states = {};
        this._currentState = null;
        this._target = target;
    }

    _prepareDict(){
        for (var i in this._meshesDictionary) {
            this._meshesDictionary[i].mesh = this._target.getObjectByName(this._meshesDictionary[i].name);
            if(this._meshesDictionary[i].initValue != null) {
                if ( this._meshesDictionary[i].initValue.x != 0 ) this._meshesDictionary[i].mesh.rotation.x = this._meshesDictionary[i].initValue.x;
                else if ( this._meshesDictionary[i].initValue.x == 0 ) this._meshesDictionary[i].initValue.x = this._meshesDictionary[i].mesh.rotation.x;
                if ( this._meshesDictionary[i].initValue.y != 0 ) this._meshesDictionary[i].mesh.rotation.y = this._meshesDictionary[i].initValue.y;
                else if ( this._meshesDictionary[i].initValue.y == 0 ) this._meshesDictionary[i].initValue.y = this._meshesDictionary[i].mesh.rotation.y;
                if ( this._meshesDictionary[i].initValue.z != 0) this._meshesDictionary[i].mesh.rotation.z = this._meshesDictionary[i].initValue.z;
                else if ( this._meshesDictionary[i].initValue.z == 0 ) this._meshesDictionary[i].initValue.z = this._meshesDictionary[i].mesh.rotation.z;
            }
            else {
                this._meshesDictionary[i].initValue = { x: this._meshesDictionary[i].mesh.rotation.x, y: this._meshesDictionary[i].mesh.rotation.y, z: this._meshesDictionary[i].mesh.rotation.z };
            }

            if ( this._meshesDictionary[i].setValue != null ) {
                if(this._meshesDictionary[i].setValue.z == 0 ) {
                    this._meshesDictionary[i].setValue.z = this._meshesDictionary[i].initValue.z;
                }
                if (this._meshesDictionary[i].setValue.y == 0) {
                    this._meshesDictionary[i].setValue.y = this._meshesDictionary[i].initValue.y;   
                }
                if(this._meshesDictionary[i].setValue.x == 0) {
                    this._meshesDictionary[i].setValue.x = this._meshesDictionary[i].initValue.x;
                }
            }
            else {
                this._meshesDictionary[i].setValue = { x: this._meshesDictionary[i].initValue.x, y: this._meshesDictionary[i].initValue.y, z: this._meshesDictionary[i].initValue.z };
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
            meshesDictionary: this._meshesDictionary, name: name, 
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
      this._meshesDictionary = params.meshesDictionary;
      this._name = params.name;
    }
    comeback (start, end, amt){
        return [
            (1-amt)*start.x+amt*end.x,
            (1-amt)*start.y+amt*end.y,
            (1-amt)*start.z+amt*end.z,
        ]
    }    
    Enter() {}
    Exit() {}
    Update() {}
};