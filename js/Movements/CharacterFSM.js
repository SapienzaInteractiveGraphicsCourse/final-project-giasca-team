import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

import { FiniteStateMachine , State } from './FiniteStateMachine.js';

const PI_2 = Math.PI / 2;
const PI_3 = Math.PI / 3;
const PI_4 = Math.PI / 4;
const PI_6 = Math.PI / 6;
const PI_12 = Math.PI / 12;

const arm_angle = PI_6;

export class CharacterFSM extends FiniteStateMachine {
    constructor(target) {
        super(target);

        this._targetDict = {
            Upper_leg_sx: { name: "LeftUpLeg_055", mesh: null, initValue: null },
            Lower_leg_sx: { name: "LeftLeg_056", mesh: null, initValue: null },
            Upper_leg_dx: { name: "RightUpLeg_060", mesh: null, initValue: null },
            Lower_leg_dx: { name: "RightLeg_061", mesh: null, initValue: null },

            Head: { name: "Head_06", mesh: null, initValue: null },

            Body: {name: "Body", mesh: null, initValue: null}, 

            Shoulder_sx: { name: "LeftShoulder_08", mesh: null, initValue: { x:0, y:-PI_3, z:0 }},
            Upper_arm_sx: { name: "LeftArm_09", mesh: null, initValue: { x:PI_12, y:0, z:0 } },
            Lower_arm_sx: { name: "LeftForeArm_010", mesh: null, initValue:  null},
            Hand_sx: { name: "LeftHand_011", mesh: null, initValue: null },
            Thumb_sx: { name: "LeftHandThumb1_012", mesh: null, initValue: null },
            Index_sx: { name: "LeftHandIndex1_016", mesh: null, initValue: null },
            Middle_sx: { name: "LeftHandMiddle1_020", mesh: null, initValue: null },
            Ring_sx: { name: "LeftHandRing1_024", mesh: null, initValue: null },
            Pinky_sx: { name: "LeftHandPinky1_028", mesh: null, initValue: null },

            Shoulder_dx: { name: "RightShoulder_032", mesh: null, initValue: { x:0, y:PI_3, z:0 } },
            Upper_arm_dx: { name: "RightArm_033", mesh: null, initValue:  { x:PI_12, y:0, z:0 } },
            Lower_arm_dx: { name: "RightForeArm_034", mesh: null, initValue:null   },
            Hand_dx: { name: "RightHand_035", mesh: null, initValue: null },
            Thumb_dx: { name: "RightHandThumb1_036", mesh: null, initValue: null },
            Index_dx: { name: "RightHandIndex1_040", mesh: null, initValue: null },
            Middle_dx: { name: "RightHandMiddle1_044", mesh: null, initValue: null },
            Ring_dx: { name: "RightHandRing1_048", mesh: null, initValue: null },
            Pinky_dx: { name: "RightHandPinky1_052", mesh: null, initValue: null },
        };
        this._prepareDict();

        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
        this._AddState('jump', JumpState);
    }
};

function ComeBack(vel, targetDict) {
  if ( targetDict.Shoulder_sx.mesh.rotation.x == targetDict.Shoulder_sx.initValue.x) {
    return;
  }
  else {
    if ( targetDict.Shoulder_sx.mesh.rotation.x < targetDict.Shoulder_sx.initValue.x ) {
      targetDict.Shoulder_sx.mesh.rotation.x += vel;
      targetDict.Shoulder_dx.mesh.rotation.x -= vel;
      targetDict.Upper_leg_sx.mesh.rotation.x -= vel;
      targetDict.Upper_leg_dx.mesh.rotation.x += vel;
      ComeBack(vel, targetDict);
    }
    else {
      targetDict.Shoulder_sx.mesh.rotation.x -= vel;
      targetDict.Shoulder_dx.mesh.rotation.x += vel;
      targetDict.Upper_leg_sx.mesh.rotation.x += vel;
      targetDict.Upper_leg_dx.mesh.rotation.x -= vel;
      ComeBack(vel, targetDict);
    }
  }
}

class IdleState extends State {
    constructor(parent) {
      super(parent);
    }
  
    get Name() {
      return 'idle';
    }
    Enter(prevState) {
    }

    

    Exit() {
    }
  
    Update(input) {
      if (input._keys.forward || input._keys.backward) {
        this._parent.SetState('walk');
      } /*else if (input._keys.space) {
        this._parent.SetState('jump');
      }*/

      var vel = 0.02;

      if ( this._targetDict.Shoulder_sx.mesh.rotation.x != this._targetDict.Shoulder_sx.initValue.x ) {
        ComeBack(vel, this._targetDict);
      }
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
  constructor(params) {
      super(params);

      this._stateLegs = 1;
      this._stateArms = 0;



      this._shoulder_sx = this._targetDict.Shoulder_sx.initValue.x;
      this._shoulder_dx = this._targetDict.Shoulder_dx.initValue.x;

      this._lower_arm_sx = this._targetDict.Lower_arm_sx.initValue.x;
      this._lower_arm_dx = this._targetDict.Lower_arm_dx.initValue.x;

      this._upper_leg_sx = this._targetDict.Upper_leg_sx.initValue.x;
      this._upper_leg_dx = this._targetDict.Upper_leg_dx.initValue.x;

  }

  Update(input) {
    var vel = 0.02;
      if (input._keys.forward || input._keys.backward || input._keys.left || input._keys.right || input._keys.space) {
          /*if (input._keys.shift) {
              this._parent.SetState('run');
              return;
          }*/
          /*if(input._keys.space){
              this._parent.SetState('jump');
              return;
          }*/
      } else {
          this._parent.SetState('idle');
          return;
      }
      if(this._stateLegs==0) {
              if (this._targetDict.Upper_leg_sx.mesh.rotation.x >= this._upper_leg_sx + PI_6) {
                  this._stateLegs = 1;
              } else {
                  this._targetDict.Upper_leg_sx.mesh.rotation.x += vel;
                  /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x <= 0) {
                      this._targetDict.Lower_leg_sx.mesh.rotation.x += vel;
                  }*/

                  this._targetDict.Upper_leg_dx.mesh.rotation.x -= vel;
                  /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x >= -PI_6) {
                      this._targetDict.Lower_leg_dx.mesh.rotation.x -= vel;
                  }*/
              }
      }
      else if(this._stateLegs==1){
              if (this._targetDict.Upper_leg_sx.mesh.rotation.x <= this._upper_leg_sx-PI_6) {
                  this._stateLegs = 0;
              } else {
                  this._targetDict.Upper_leg_sx.mesh.rotation.x -= vel;
                  /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x >= -PI_6) {
                      this._targetDict.Lower_leg_sx.mesh.rotation.x -= vel;
                  }*/

                  this._targetDict.Upper_leg_dx.mesh.rotation.x += vel;
                  /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x <= 0) {
                      this._targetDict.Lower_leg_dx.mesh.rotation.x += vel;
                  }*/
              }
      }

      if(this._stateArms==0) {
              if (this._targetDict.Shoulder_sx.mesh.rotation.x >= this._shoulder_sx+arm_angle) {
                  this._stateArms = 1;
              } else {
                  this._targetDict.Shoulder_sx.mesh.rotation.x += vel;
                  /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x >= this._lower_arm_sx-arm_angle) {
                      this._targetDict.Lower_arm_sx.mesh.rotation.x -= vel;
                  }*/

                  this._targetDict.Shoulder_dx.mesh.rotation.x -= vel;
                  /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x >= this._lower_arm_dx) {
                      this._targetDict.Lower_arm_dx.mesh.rotation.x -= vel;
                  }*/
              }
      }
      else if(this._stateArms==1){
              if (this._targetDict.Shoulder_sx.mesh.rotation.x <= this._shoulder_sx-arm_angle) {
                  this._stateArms = 0;
              } else {
                  this._targetDict.Shoulder_sx.mesh.rotation.x -= vel;
                  /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x <= this._lower_arm_sx) {
                      this._targetDict.Lower_arm_sx.mesh.rotation.x += vel;
                  }*/

                  this._targetDict.Shoulder_dx.mesh.rotation.x += vel;
                  /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x <= this._lower_arm_dx-arm_angle) {
                      this._targetDict.Lower_arm_dx.mesh.rotation.x += vel;
                  }*/

              }
      }
  }
}

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

