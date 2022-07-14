import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

import { FiniteStateMachine , State } from './FiniteStateMachine.js';

const PI_2 = Math.PI / 2;
const PI_4 = Math.PI / 4;
const PI_6 = Math.PI / 6;

export class CharacterFSM extends FiniteStateMachine {
    constructor(target) {
        super(target);

        this._targetDict = {
            Upper_leg_sx: { name: "mixamorig:LeftUpLeg_055", mesh: null },
            Lower_leg_sx: { name: "mixamorig:LeftLeg_056", mesh: null },
            Upper_leg_dx: { name: "mixamorig:RightUpLeg_060", mesh: null },
            Lower_leg_dx: { name: "mixamorig:RightLeg_061", mesh: null },

            Head: { name: "mixamorig:Head_06", mesh: null },

            Shoulder_sx: { name: "mixamorig:LeftShoulder_08", mesh: null },
            Upper_arm_sx: { name: "mixamorig:LeftArm_09", mesh: null, initValue: new THREE.Vector3(0, 0, -PI_4) },
            Lower_arm_sx: { name: "mixamorig:LeftForeArm_010", mesh: null, initValue: new THREE.Vector3(0, 0, -PI_4) },
            Hand_sx: { name: "mixamorig:LeftHand_011", mesh: null },
            Thumb_sx: { name: "mixamorig:LeftHandThumb1_012", mesh: null },
            Index_sx: { name: "mixamorig:LeftHandIndex1_016", mesh: null },
            Middle_sx: { name: "mixamorig:LeftHandMiddle1_020", mesh: null },
            Ring_sx: { name: "mixamorig:LeftHandRing1_024", mesh: null },
            Pinky_sx: { name: "mixamorig:LeftHandPinky1_028", mesh: null },

            Shoulder_dx: { name: "mixamorig:RightShoulder_032", mesh: null },
            Upper_arm_dx: { name: "mixamorig:RightArm_033", mesh: null, initValue: new THREE.Vector3(0, 0, -PI_4) },
            Lower_arm_dx: { name: "mixamorig:RightForeArm_034", mesh: null, initValue: new THREE.Vector3(0, 0, -PI_4) },
            Hand_dx: { name: "mixamorig:RightHand_035", mesh: null },
            Thumb_dx: { name: "mixamorig:RightHandThumb1_036", mesh: null },
            Index_dx: { name: "mixamorig:RightHandIndex1_040", mesh: null },
            Middle_dx: { name: "mixamorig:RightHandMiddle1_044", mesh: null },
            Ring_dx: { name: "mixamorig:RightHandRing1_048", mesh: null },
            Pinky_dx: { name: "mixamorig:RightHandPinky1_052", mesh: null },
        };
        this._prepareDict();

        this._targetDict.Cap.mesh.scale.setScalar(1.1);

        this._addState('idle', IdleState);
        this._addState('walk', WalkState);
        this._addState('run', RunState);
        this._addState('jump', JumpState);
    }
};

class IdleState extends State {
    constructor(parent) {
      super(parent);
    }
  
    get Name() {
      return 'idle';
    }
    Enter(prevState) {
        /*if (prevState) {

        } else {
        }*/
    }

    Exit() {
    }
  
    Update(_, input) {
      /*if (input._keys.forward || input._keys.backward) {
        this._parent.SetState('walk');
      } else if (input._keys.space) {
        this._parent.SetState('jump');
      }*/

    }
};

class JumpState extends State {
    constructor(parent) {
      super(parent);
  
      this._FinishedCallback = () => {
        this._Finished();
      }
    }
  
    get Name() {
      return 'jump';
    }
  
    Enter(prevState) {
      const curAction = this._parent._proxy._animations['dance'].action;
      const mixer = curAction.getMixer();
      mixer.addEventListener('finished', this._FinishedCallback);
  
      if (prevState) {
        const prevAction = this._parent._proxy._animations[prevState.Name].action;
  
        curAction.reset();  
        curAction.setLoop(THREE.LoopOnce, 1);
        curAction.clampWhenFinished = true;
        curAction.crossFadeFrom(prevAction, 0.2, true);
        curAction.play();
      } else {
        curAction.play();
      }
    }
  
    _Finished() {
      this._Cleanup();
      this._parent.SetState('idle');
    }
  
    _Cleanup() {
      const action = this._parent._proxy._animations['dance'].action;
      
      action.getMixer().removeEventListener('finished', this._CleanupCallback);
    }
  
    Exit() {
      this._Cleanup();
    }
  
    Update(_) {
    }
};

class WalkState extends State {
    constructor(parent) {
      super(parent);
    }
  
    get Name() {
      return 'walk';
    }
  
    Enter(prevState) {
      const curAction = this._parent._proxy._animations['walk'].action;
      if (prevState) {
        const prevAction = this._parent._proxy._animations[prevState.Name].action;
  
        curAction.enabled = true;
  
        if (prevState.Name == 'run') {
          const ratio = curAction.getClip().duration / prevAction.getClip().duration;
          curAction.time = prevAction.time * ratio;
        } else {
          curAction.time = 0.0;
          curAction.setEffectiveTimeScale(1.0);
          curAction.setEffectiveWeight(1.0);
        }
  
        curAction.crossFadeFrom(prevAction, 0.5, true);
        curAction.play();
      } else {
        curAction.play();
      }
    }
  
    Exit() {
    }
  
    Update(timeElapsed, input) {
      if (input._keys.forward || input._keys.backward) {
        if (input._keys.shift) {
          this._parent.SetState('run');
        }
        return;
      }
  
      this._parent.SetState('idle');
    }
};

class RunState extends State {
    constructor(parent) {
      super(parent);
    }
  
    get Name() {
      return 'run';
    }
  
    Enter(prevState) {
      const curAction = this._parent._proxy._animations['run'].action;
      if (prevState) {
        const prevAction = this._parent._proxy._animations[prevState.Name].action;
  
        curAction.enabled = true;
  
        if (prevState.Name == 'walk') {
          const ratio = curAction.getClip().duration / prevAction.getClip().duration;
          curAction.time = prevAction.time * ratio;
        } else {
          curAction.time = 0.0;
          curAction.setEffectiveTimeScale(1.0);
          curAction.setEffectiveWeight(1.0);
        }
  
        curAction.crossFadeFrom(prevAction, 0.5, true);
        curAction.play();
      } else {
        curAction.play();
      }
    }
  
    Exit() {
    }
  
    Update(timeElapsed, input) {
      if (input._keys.forward || input._keys.backward) {
        if (!input._keys.shift) {
          this._parent.SetState('walk');
        }
        return;
      }
  
      this._parent.SetState('idle');
    }
};

