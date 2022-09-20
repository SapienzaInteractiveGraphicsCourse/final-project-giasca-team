import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

import { FiniteStateMachine , State } from './FiniteStateMachine.js';

const PI_2 = Math.PI / 2;
const PI_3 = Math.PI / 3;
const PI_4 = Math.PI / 4;
const PI_6 = Math.PI / 6;
const PI_8 = Math.PI / 8;
const PI_12 = Math.PI / 12;
const PI_14 = Math.PI / 14;
const PI_16 = Math.PI / 16;

const PI_50 = Math.PI / 50;

const arm_angle_walk = PI_12;
const arm_angle_run = PI_8;


/*var time = {
  clock: new THREE.Clock(),
  frame: 0,
  maxFrame: 90,
  fps: 30,
  per: 0
};*/


//var prevState;

export class CharacterFSM extends FiniteStateMachine {
    constructor(target) {
        super(target);

        this._targetDict = {
            Thumb_dx: { name: "RightHandThumb1_036", mesh: null, initValue: null, setValue: {x:PI_8,y:-PI_6,z:PI_12}, index: 0 },
            Thumb_dx_2: { name: "RightHandThumb2_037", mesh: null, initValue: null, setValue: {x:PI_12 ,y:-PI_12 ,z:0 }, index: 1 },
            Thumb_dx_3: { name: "RightHandThumb3_038", mesh: null, initValue: null, setValue: {x:PI_12 ,y:-PI_12 ,z:0}, index: 2},
            Thumb_dx_4: { name: "RightHandThumb4_039", mesh: null, initValue: null, setValue: {x:PI_12 ,y:PI_8 ,z:0 }, index: 3},
            Index_dx: { name: "RightHandIndex1_040", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0 }, index: 4 },
            Index_dx_2: { name: "RightHandIndex2_041", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 5 },
            Index_dx_3: { name: "RightHandIndex3_042", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 6 },
            Index_dx_4: { name: "RightHandIndex4_043", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 7 },
            Middle_dx: { name: "RightHandMiddle1_044", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 8 },
            Middle_dx_2: { name: "RightHandMiddle2_045", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 9 },
            Middle_dx_3: { name: "RightHandMiddle3_046", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 10 },
            Middle_dx_4: { name: "RightHandMiddle4_047", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 11 },
            Ring_dx: { name: "RightHandRing1_048", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 12 },
            Ring_dx_2: { name: "RightHandRing2_049", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 13 },
            Ring_dx_3: { name: "RightHandRing3_050", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index:14 },
            Ring_dx_4: { name: "RightHandRing4_051", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 15 },
            Pinky_dx: { name: "RightHandPinky1_052", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 16 },
            Pinky_dx_2: { name: "RightHandPinky2_053", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index:17 },
            Pinky_dx_3: { name: "RightHandPinky3_00", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 18 },
            Pinky_dx_4: { name: "RightHandPinky4_054", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 19 },

            Upper_leg_sx: { name: "LeftUpLeg_055", mesh: null, initValue: null, setValue: null, index: 20 },
            Lower_leg_sx: { name: "LeftLeg_056", mesh: null, initValue: null, setValue: null, index: 21},
            Upper_leg_dx: { name: "RightUpLeg_060", mesh: null, initValue: null, setValue: null, index: 22 },
            Lower_leg_dx: { name: "RightLeg_061", mesh: null, initValue: null, setValue: null, index: 23 },

            Head: { name: "Head_06", mesh: null, initValue: null, setValue: null, index: 24 },

            Spine: {name: "Spine_02", mesh: null, initValue: null, setValue: null, index: 25}, 

            Neck: {name: "Neck_05" , mesh: null, initValue: null, setValue: null, index: 26}, 

            Shoulder_sx: { name: "LeftShoulder_08", mesh: null, initValue: { x:0, y:-PI_3, z:0 }, index: 27},
            Upper_arm_sx: { name: "LeftArm_09", mesh: null, initValue: { x:PI_12, y:0, z:0 }, index: 28 },
            Lower_arm_sx: { name: "LeftForeArm_010", mesh: null, initValue:  null, index: 29},
            Hand_sx: { name: "LeftHand_011", mesh: null, initValue: null, setValue: null, index: 30 },
            Thumb_sx: { name: "LeftHandThumb1_012", mesh: null, initValue: null, setValue: null, index: 31 },
            Index_sx: { name: "LeftHandIndex1_016", mesh: null, initValue: null, setValue: null, index: 32 },
            Middle_sx: { name: "LeftHandMiddle1_020", mesh: null, initValue: null, setValue: null, index: 33 },
            Ring_sx: { name: "LeftHandRing1_024", mesh: null, initValue: null, setValue: null, index: 34 },
            Pinky_sx: { name: "LeftHandPinky1_028", mesh: null, initValue: null, setValue: null, index: 35 },

            Shoulder_dx: { name: "RightShoulder_032", mesh: null, initValue: { x:0, y:PI_3, z:0 }, index: 36 },
            Upper_arm_dx: { name: "RightArm_033", mesh: null, initValue:  { x:PI_12, y:0, z:0 }, index: 37 },
            Lower_arm_dx: { name: "RightForeArm_034", mesh: null, initValue: null, index: 38   },
            Hand_dx: { name: "RightHand_035", mesh: null, initValue: null, setValue: null, index: 39 },
        };
        this._prepareDict();

        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
        //this._AddState('punch', PunchState);
    }
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting(targetDict) {
  //targetDict.Shoulder_dx.mesh.rotation.x += PI_16;
  targetDict.Lower_arm_dx.mesh.rotation.z -= PI_14;

  /*targetDict.Thumb_dx.mesh.rotation.x += PI_8;
  targetDict.Thumb_dx.mesh.rotation.y -= PI_6;
  targetDict.Thumb_dx.mesh.rotation.z += PI_12;
  targetDict.Thumb_dx_2.mesh.rotation.x += PI_12;
  targetDict.Thumb_dx_2.mesh.rotation.y -= PI_12;
  targetDict.Thumb_dx_3.mesh.rotation.x += PI_12;
  targetDict.Thumb_dx_3.mesh.rotation.y -= PI_12;
  targetDict.Thumb_dx_4.mesh.rotation.x += PI_12;
  targetDict.Thumb_dx_4.mesh.rotation.y -= PI_8;*/

  /*targetDict.Index_dx.mesh.rotation.x += PI_12;
  targetDict.Index_dx.mesh.rotation.y -= PI_2;*/
  /*targetDict.Index_dx_2.mesh.rotation.x += PI_12;
  targetDict.Index_dx_2.mesh.rotation.y -= PI_4;
  targetDict.Index_dx_3.mesh.rotation.x += PI_12;
  targetDict.Index_dx_3.mesh.rotation.y -= PI_4;
  targetDict.Index_dx_4.mesh.rotation.x += PI_12;
  targetDict.Index_dx_4.mesh.rotation.y -= PI_2;


  targetDict.Middle_dx.mesh.rotation.x += PI_12;
  targetDict.Middle_dx.mesh.rotation.y -= PI_2;
  targetDict.Middle_dx_2.mesh.rotation.x += PI_12;
  targetDict.Middle_dx_2.mesh.rotation.y -= PI_4;
  targetDict.Middle_dx_3.mesh.rotation.x += PI_12;
  targetDict.Middle_dx_3.mesh.rotation.y -= PI_4;
  targetDict.Middle_dx_4.mesh.rotation.x += PI_12;
  targetDict.Middle_dx_4.mesh.rotation.y -= PI_2;

  targetDict.Ring_dx.mesh.rotation.x += PI_12;
  targetDict.Ring_dx.mesh.rotation.y -= PI_2;
  targetDict.Ring_dx_2.mesh.rotation.x += PI_12;
  targetDict.Ring_dx_2.mesh.rotation.y -= PI_4;
  targetDict.Ring_dx_3.mesh.rotation.x += PI_12;
  targetDict.Ring_dx_3.mesh.rotation.y -= PI_4;
  targetDict.Ring_dx_4.mesh.rotation.x += PI_12;
  targetDict.Ring_dx_4.mesh.rotation.y -= PI_2;

  targetDict.Pinky_dx.mesh.rotation.x += PI_12;
  targetDict.Pinky_dx.mesh.rotation.y -= PI_2;
  targetDict.Pinky_dx_2.mesh.rotation.x += PI_12;
  targetDict.Pinky_dx_2.mesh.rotation.y -= PI_4;
  targetDict.Pinky_dx_3.mesh.rotation.x += PI_12;
  targetDict.Pinky_dx_3.mesh.rotation.y -= PI_4;
  targetDict.Pinky_dx_4.mesh.rotation.x += PI_12;
  targetDict.Pinky_dx_4.mesh.rotation.y -= PI_2;*/

  /*await sleep(150);
  targetDict.Shoulder_dx.mesh.rotation.x -= PI_12;*/
  await sleep(150);
  targetDict.Shoulder_dx.mesh.rotation.x -= PI_6;
  targetDict.Lower_arm_dx.mesh.rotation.z = targetDict.Lower_arm_dx.initValue.z;
  await sleep(150);
  targetDict.Shoulder_dx.mesh.rotation.x = targetDict.Shoulder_dx.initValue.x;

  targetDict.Thumb_dx.mesh.rotation.x = targetDict.Thumb_dx.initValue.x;
  targetDict.Thumb_dx.mesh.rotation.y = targetDict.Thumb_dx.initValue.y;
  targetDict.Thumb_dx.mesh.rotation.z = targetDict.Thumb_dx.initValue.z;
  targetDict.Thumb_dx_2.mesh.rotation.x = targetDict.Thumb_dx_2.initValue.x;
  targetDict.Thumb_dx_2.mesh.rotation.y = targetDict.Thumb_dx_2.initValue.y;
  targetDict.Thumb_dx_3.mesh.rotation.x = targetDict.Thumb_dx_3.initValue.x;
  targetDict.Thumb_dx_3.mesh.rotation.y = targetDict.Thumb_dx_3.initValue.y;
  targetDict.Thumb_dx_4.mesh.rotation.x = targetDict.Thumb_dx_4.initValue.x;
  targetDict.Thumb_dx_4.mesh.rotation.y = targetDict.Thumb_dx_4.initValue.y;

  targetDict.Index_dx.mesh.rotation.x = targetDict.Index_dx.initValue.x;
  targetDict.Index_dx.mesh.rotation.y = targetDict.Index_dx.initValue.y;
  targetDict.Index_dx_2.mesh.rotation.x = targetDict.Index_dx_2.initValue.x;
  targetDict.Index_dx_2.mesh.rotation.y = targetDict.Index_dx_2.initValue.y;
  targetDict.Index_dx_3.mesh.rotation.x = targetDict.Index_dx_3.initValue.x;
  targetDict.Index_dx_3.mesh.rotation.y = targetDict.Index_dx_3.initValue.y;
  targetDict.Index_dx_4.mesh.rotation.x = targetDict.Index_dx_4.initValue.x;
  targetDict.Index_dx_4.mesh.rotation.y = targetDict.Index_dx_4.initValue.y;

  targetDict.Middle_dx.mesh.rotation.x = targetDict.Middle_dx.initValue.x;
  targetDict.Middle_dx.mesh.rotation.y = targetDict.Middle_dx.initValue.y;
  targetDict.Middle_dx_2.mesh.rotation.x = targetDict.Middle_dx_2.initValue.x;
  targetDict.Middle_dx_2.mesh.rotation.y = targetDict.Middle_dx_2.initValue.y;
  targetDict.Middle_dx_3.mesh.rotation.x = targetDict.Middle_dx_3.initValue.x;
  targetDict.Middle_dx_3.mesh.rotation.y = targetDict.Middle_dx_3.initValue.y;
  targetDict.Middle_dx_4.mesh.rotation.x = targetDict.Middle_dx_4.initValue.x;
  targetDict.Middle_dx_4.mesh.rotation.y = targetDict.Middle_dx_4.initValue.y;

  targetDict.Ring_dx.mesh.rotation.x = targetDict.Ring_dx.initValue.x;
  targetDict.Ring_dx.mesh.rotation.y = targetDict.Ring_dx.initValue.y;
  targetDict.Ring_dx_2.mesh.rotation.x = targetDict.Ring_dx_2.initValue.x;
  targetDict.Ring_dx_2.mesh.rotation.y = targetDict.Ring_dx_2.initValue.y;
  targetDict.Ring_dx_3.mesh.rotation.x = targetDict.Ring_dx_3.initValue.x;
  targetDict.Ring_dx_3.mesh.rotation.y = targetDict.Ring_dx_3.initValue.y;
  targetDict.Ring_dx_4.mesh.rotation.x = targetDict.Ring_dx_4.initValue.x;
  targetDict.Ring_dx_4.mesh.rotation.y = targetDict.Ring_dx_4.initValue.y;

  targetDict.Pinky_dx.mesh.rotation.x = targetDict.Pinky_dx.initValue.x ;
  targetDict.Pinky_dx.mesh.rotation.y = targetDict.Pinky_dx.initValue.y;
  targetDict.Pinky_dx_2.mesh.rotation.x = targetDict.Pinky_dx_2.initValue.x;
  targetDict.Pinky_dx_2.mesh.rotation.y = targetDict.Pinky_dx_2.initValue.y;
  targetDict.Pinky_dx_3.mesh.rotation.x = targetDict.Pinky_dx_3.initValue.x;
  targetDict.Pinky_dx_3.mesh.rotation.y = targetDict.Pinky_dx_3.initValue.y;
  targetDict.Pinky_dx_4.mesh.rotation.x = targetDict.Pinky_dx_4.initValue.x;
  targetDict.Pinky_dx_4.mesh.rotation.y = targetDict.Pinky_dx_4.initValue.y;

}

class IdleState extends State {
    constructor(parent) {
      super(parent);
      this._learping = false;
      this._lerpTotSteps = 10;
      this._lerpStepVal = 1 / this._lerpTotSteps;  
    }
  
    get Name() {
      return 'idle';
    }

    Enter(prevState) {
      this._lerpStep = this._lerpStepVal;
      this._learping = true;
    }
  
    Update(input) {
      if (input._keys.forward || input._keys.backward) {
        if ( input._keys.shift ) {
          this._parent.SetState('run');
          return;
        }
        else {
          this._parent.SetState('walk'); 
          return;
        }
      }

      if (input._keys.space) {
        this._learping = false;
        while ( this._targetDict.Shoulder_dx.mesh.rotation.x <= this._targetDict.Shoulder_dx.initValue.x + PI_16) {
          this._targetDict.Shoulder_dx.mesh.rotation.x += 0.02;
        }

        for(var i in this._targetDict){
          if ( this._targetDict[i].index < 20 ) {
            console.log("sono qui");
            console.log("indice:", i);
            this._targetDict[i].mesh.rotation.set( ...this.lerp(this._targetDict[i].mesh.rotation, this._targetDict[i].setValue, this._lerpStep));
          }
        }


        //this._learping = true;
        return;
        //delayedGreeting(this._targetDict);
        //this._parent.SetState('idle');
        //this._targetDict.Shoulder_dx.mesh.rotation.set( ...this.lerp(this._targetDict.Shoulder_dx.mesh.rotation, -PI_16, this._targetDict.Shoulder_dx.initValue.y, this._targetDict.Shoulder_dx.initValue.z, this._lerpStep));
        //targetDict.Shoulder_dx.mesh.rotation.x += PI_16
      }
      /*else {
        this._learping = true;
      }*/

      /*else if (input._keys.space) {
        this._parent.SetState('jump');
      }*/
      
      if (this._learping){
        if(this._lerpStep <= 1){
            for(var i in this._targetDict){
                this._targetDict[i].mesh.rotation.set( ...this.lerp(this._targetDict[i].mesh.rotation, this._targetDict[i].initValue, this._lerpStep));
            }

            this._lerpStep += this._lerpStepVal;

            return;
        } else {
            this._learping = false;
        }
      }
    }
};

/*class PunchState extends State {
    constructor(parent) {
      super(parent);
  
      this._FinishedCallback = () => {
        this._Finished();
      }
    }
  
    get Name() {
      return 'punch';
    }
  
    Enter(prevState) {
      /*const curAction = this._parent._proxy._animations['dance'].action;
      const mixer = curAction.getMixer();
      mixer.addEventListener('finished', this._FinishedCallback);*/
  
      /*if (prevState) {
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
      /*this._Cleanup();
      this._parent.SetState('idle');
    }
  
    _Cleanup() {
      /*const action = this._parent._proxy._animations['dance'].action;
      
      action.getMixer().removeEventListener('finished', this._CleanupCallback);
    }
  
    Exit() {
      //this._Cleanup();
    }
  
    Update() {
      
    }
};*/

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

      this._lower_leg_dx = this._targetDict.Lower_leg_dx.initValue.x;
      this._lower_leg_sx = this._targetDict.Lower_leg_sx.initValue.x;
      

  }
  
  Enter(prevState) {
    //prevState = 1;
    /*if ( prevState != null ) {
      if ( prevState.Name == 'run') {
        if ( this._targetDict.Upper_leg_sx.mesh.rotation.x < this._targetDict.Upper_leg_sx.initValue.x ) {
          this._targetDict.Upper_leg_sx.mesh.rotation.x += 0.03;
          this._targetDict.Upper_leg_dx.mesh.rotation.x -= 0.03;
        }
        else if ( this._targetDict.Upper_leg_sx.mesh.rotation.x < this._targetDict.Upper_leg_sx.initValue.x ) {
          this._targetDict.Upper_leg_sx.mesh.rotation.x -= 0.03;
          this._targetDict.Upper_leg_dx.mesh.rotation.x += 0.03;
        }
      }
    }*/
    this._targetDict.Lower_arm_dx.mesh.rotation.z = this._targetDict.Lower_arm_dx.initValue.z;
    this._targetDict.Lower_arm_sx.mesh.rotation.z = this._targetDict.Lower_arm_sx.initValue.z;
    this._targetDict.Spine.mesh.rotation.x = this._targetDict.Spine.initValue.x;
    this._targetDict.Neck.mesh.rotation.x = this._targetDict.Neck.initValue.x;
  }

  Update(input) {
    var vel_Upper = 0.02;
    var vel_Lower = 0.1;
      if (input._keys.forward || input._keys.backward) {
        if ( input._keys.shift ) {
          this._parent.SetState('run');
          return;
        }
          /*if (input._keys.shift) {
              this._parent.SetState('run');
              return;
          }*/
          /*if(input._keys.space){
              this._parent.SetState('jump');
              return;
          }*/
        else {
          if (input._keys.space) {
            delayedGreeting(this._targetDict);
            return;
          }
          if(this._stateLegs==0) {
                if (this._targetDict.Upper_leg_sx.mesh.rotation.x >= this._upper_leg_sx + PI_12) {
                    this._stateLegs = 1;
                } else {
                    this._targetDict.Upper_leg_sx.mesh.rotation.x += vel_Upper;
                    if ( this._targetDict.Lower_leg_sx.mesh.rotation.x <= this._upper_leg_sx ) {
                      this._targetDict.Lower_leg_sx.mesh.rotation.x += vel_Lower;
                    }
                    /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x <= 0) {
                        this._targetDict.Lower_leg_sx.mesh.rotation.x += vel;
                    }*/

                    this._targetDict.Upper_leg_dx.mesh.rotation.x -= vel_Upper;
                    if ( this._targetDict.Lower_leg_dx.mesh.rotation.x >= this._upper_leg_dx - PI_4 ) {
                      this._targetDict.Lower_leg_dx.mesh.rotation.x -= vel_Lower;
                    }
                      /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x >= -PI_6) {
                          this._targetDict.Lower_leg_dx.mesh.rotation.x -= vel;
                      }*/
                }
          }
          else if(this._stateLegs==1){
                  if (this._targetDict.Upper_leg_sx.mesh.rotation.x <= this._upper_leg_sx-PI_12) {
                      this._stateLegs = 0;
                  } else {
                      this._targetDict.Upper_leg_sx.mesh.rotation.x -= vel_Upper;
                      if ( this._targetDict.Lower_leg_sx.mesh.rotation.x >= this._upper_leg_sx - PI_4 ) {
                        this._targetDict.Lower_leg_sx.mesh.rotation.x -= vel_Lower;
                      }
                      /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x >= -PI_6) {
                          this._targetDict.Lower_leg_sx.mesh.rotation.x -= vel;
                      }*/

                      this._targetDict.Upper_leg_dx.mesh.rotation.x += vel_Upper;
                      if ( this._targetDict.Lower_leg_dx.mesh.rotation.x <= this._upper_leg_dx ) {
                        this._targetDict.Lower_leg_dx.mesh.rotation.x += vel_Lower;
                      }
                      /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x <= 0) {
                          this._targetDict.Lower_leg_dx.mesh.rotation.x += vel;
                      }*/
                  }
                }

          if(this._stateArms==0) {
                  if (this._targetDict.Shoulder_sx.mesh.rotation.x >= this._shoulder_sx+arm_angle_walk) {
                      this._stateArms = 1;
                  } else {
                      this._targetDict.Shoulder_sx.mesh.rotation.x += vel_Upper;
                      /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x >= this._lower_arm_sx-arm_angle) {
                          this._targetDict.Lower_arm_sx.mesh.rotation.x -= vel;
                      }*/

                      this._targetDict.Shoulder_dx.mesh.rotation.x -= vel_Upper;
                      /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x >= this._lower_arm_dx) {
                          this._targetDict.Lower_arm_dx.mesh.rotation.x -= vel;
                      }*/
                  }
          }
          else if(this._stateArms==1){
                  if (this._targetDict.Shoulder_sx.mesh.rotation.x <= this._shoulder_sx-arm_angle_walk) {
                      this._stateArms = 0;
                  } else {
                      this._targetDict.Shoulder_sx.mesh.rotation.x -= vel_Upper;
                      /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x <= this._lower_arm_sx) {
                          this._targetDict.Lower_arm_sx.mesh.rotation.x += vel;
                      }*/

                      this._targetDict.Shoulder_dx.mesh.rotation.x += vel_Upper;
                      /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x <= this._lower_arm_dx-arm_angle) {
                          this._targetDict.Lower_arm_dx.mesh.rotation.x += vel;
                      }*/

                  }
          }
        }
      }
      else {
        this._parent.SetState('idle');
        return;
      }
    }
}

class RunState extends State {
  constructor(params) {
    super(params);

    this._stateLegs = 1;
    this._stateArms = 0;



    this._shoulder_sx = this._targetDict.Shoulder_sx.initValue.x;
    this._shoulder_dx = this._targetDict.Shoulder_dx.initValue.x;

    this._lower_arm_sx = this._targetDict.Lower_arm_sx.initValue.z;
    this._lower_arm_dx = this._targetDict.Lower_arm_dx.initValue.z;

    this._upper_leg_sx = this._targetDict.Upper_leg_sx.initValue.x;
    this._upper_leg_dx = this._targetDict.Upper_leg_dx.initValue.x;

    this._lower_leg_dx = this._targetDict.Lower_leg_dx.initValue.x;
    this._lower_leg_sx = this._targetDict.Lower_leg_sx.initValue.x;

    this._spine = this._targetDict.Spine.initValue.x;

    this._neck = this._targetDict.Neck.initValue.x;
  }
  
    get Name() {
      return 'run';
    }
  
    /*Enter(prevState) {
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
    }*/

    Enter(prevState) {
      //prevState = 2;
      this._targetDict.Lower_arm_sx.mesh.rotation.z = this._lower_arm_sx + PI_4;
      this._targetDict.Lower_arm_dx.mesh.rotation.z = this._lower_arm_dx - PI_4;
      this._targetDict.Spine.mesh.rotation.x = this._spine + PI_14;
      this._targetDict.Neck.mesh.rotation.x = this._neck - PI_14;
    }
  
    Update(input) {
      var vel_Upper = 0.05;
      var vel_Lower = 0.25;
      if (input._keys.forward || input._keys.backward ) {
        if (input._keys.shift) {
          if(this._stateLegs==0) {
            if (this._targetDict.Upper_leg_sx.mesh.rotation.x >= this._upper_leg_sx + PI_8) {
                this._stateLegs = 1;
            } else {
                this._targetDict.Upper_leg_sx.mesh.rotation.x += vel_Upper;
                if ( this._targetDict.Lower_leg_sx.mesh.rotation.x <= this._upper_leg_sx ) {
                  this._targetDict.Lower_leg_sx.mesh.rotation.x += vel_Lower;
                }
                /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x <= 0) {
                    this._targetDict.Lower_leg_sx.mesh.rotation.x += vel;
                }*/

                this._targetDict.Upper_leg_dx.mesh.rotation.x -= vel_Upper;
                if ( this._targetDict.Lower_leg_dx.mesh.rotation.x >= this._upper_leg_dx - PI_14 ) {
                  this._targetDict.Lower_leg_dx.mesh.rotation.x -= vel_Lower;
                 }
                  /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x >= -PI_6) {
                      this._targetDict.Lower_leg_dx.mesh.rotation.x -= vel;
                  }*/
            }
          }
          else if(this._stateLegs==1){
            if (this._targetDict.Upper_leg_sx.mesh.rotation.x <= this._upper_leg_sx-PI_8) {
                this._stateLegs = 0;
            } 
            else {
                this._targetDict.Upper_leg_sx.mesh.rotation.x -= vel_Upper;
                if ( this._targetDict.Lower_leg_sx.mesh.rotation.x >= this._upper_leg_sx - PI_4 ) {
                  this._targetDict.Lower_leg_sx.mesh.rotation.x -= vel_Lower;
                }
                /*if (this._targetDict.Lower_leg_sx.mesh.rotation.x >= -PI_6) {
                    this._targetDict.Lower_leg_sx.mesh.rotation.x -= vel;
                }*/

                this._targetDict.Upper_leg_dx.mesh.rotation.x += vel_Upper;
                if ( this._targetDict.Lower_leg_dx.mesh.rotation.x <= this._upper_leg_dx ) {
                  this._targetDict.Lower_leg_dx.mesh.rotation.x += vel_Lower;
                }
                /*if (this._targetDict.Lower_leg_dx.mesh.rotation.x <= 0) {
                    this._targetDict.Lower_leg_dx.mesh.rotation.x += vel;
                }*/
            }
          }
          if(this._stateArms==0) {
            if (this._targetDict.Shoulder_sx.mesh.rotation.x >= this._shoulder_sx+arm_angle_run) {
                this._stateArms = 1;
            } else {
                this._targetDict.Shoulder_sx.mesh.rotation.x += vel_Upper;
                /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x >= this._lower_arm_sx-arm_angle) {
                    this._targetDict.Lower_arm_sx.mesh.rotation.x -= vel;
                }*/

                this._targetDict.Shoulder_dx.mesh.rotation.x -= vel_Upper;
                /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x >= this._lower_arm_dx) {
                    this._targetDict.Lower_arm_dx.mesh.rotation.x -= vel;
                }*/
            }
          }
          else if(this._stateArms==1){
            if (this._targetDict.Shoulder_sx.mesh.rotation.x <= this._shoulder_sx-arm_angle_run) {
                this._stateArms = 0;
            } 
            else {
                this._targetDict.Shoulder_sx.mesh.rotation.x -= vel_Upper;
                /*if (this._targetDict.Lower_arm_sx.mesh.rotation.x <= this._lower_arm_sx) {
                    this._targetDict.Lower_arm_sx.mesh.rotation.x += vel;
                }*/

                this._targetDict.Shoulder_dx.mesh.rotation.x += vel_Upper;
                /*if (this._targetDict.Lower_arm_dx.mesh.rotation.x <= this._lower_arm_dx-arm_angle) {
                    this._targetDict.Lower_arm_dx.mesh.rotation.x += vel;
                }*/
              }
          }
        }
        else {
          this._parent.SetState('walk');
          return;
        }
      }
      else {
        this._parent.SetState('idle');
        return;
      }
    }
};

