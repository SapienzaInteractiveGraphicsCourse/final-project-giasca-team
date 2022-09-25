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

export class CharacterFSM extends FiniteStateMachine {
    constructor(target,entity) {
      super(target);

        this._meshesDictionary = {
            Thumb_dx: { name: "RightHandThumb1", mesh: null, initValue: null, setValue: {x:PI_8,y:-PI_6,z:PI_12}, index: 0 },
            Thumb_dx_2: { name: "RightHandThumb2", mesh: null, initValue: null, setValue: {x:PI_12 ,y:-PI_12 ,z:0 }, index: 1 },
            Thumb_dx_3: { name: "RightHandThumb3", mesh: null, initValue: null, setValue: {x:PI_12 ,y:-PI_12 ,z:0}, index: 2},
            Thumb_dx_4: { name: "RightHandThumb4", mesh: null, initValue: null, setValue: {x:PI_12 ,y:PI_8 ,z:0 }, index: 3},
            Index_dx: { name: "RightHandIndex1", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0 }, index: 4 },
            Index_dx_2: { name: "RightHandIndex2", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 5 },
            Index_dx_3: { name: "RightHandIndex3", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 6 },
            Index_dx_4: { name: "RightHandIndex4", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 7 },
            Middle_dx: { name: "RightHandMiddle1", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 8 },
            Middle_dx_2: { name: "RightHandMiddle2", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 9 },
            Middle_dx_3: { name: "RightHandMiddle3", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 10 },
            Middle_dx_4: { name: "RightHandMiddle4", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 11 },
            Ring_dx: { name: "RightHandRing1", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 12 },
            Ring_dx_2: { name: "RightHandRing2", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 13 },
            Ring_dx_3: { name: "RightHandRing3", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index:14 },
            Ring_dx_4: { name: "RightHandRing4", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 15 },
            Pinky_dx: { name: "RightHandPinky1", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 16 },
            Pinky_dx_2: { name: "RightHandPinky2", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index:17 },
            Pinky_dx_3: { name: "RightHandPinky3", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 18 },
            Pinky_dx_4: { name: "RightHandPinky4", mesh: null, initValue: null, setValue: {x:PI_2 ,y:0 ,z:0}, index: 19 },

            Upper_leg_sx: { name: "LeftUpLeg", mesh: null, initValue: null, setValue: null, index: 20 },
            Lower_leg_sx: { name: "LeftLeg", mesh: null, initValue: null, setValue: null, index: 21},
            Upper_leg_dx: { name: "RightUpLeg", mesh: null, initValue: null, setValue: null, index: 22 },
            Lower_leg_dx: { name: "RightLeg", mesh: null, initValue: null, setValue: null, index: 23 },

            Head: { name: "Head", mesh: null, initValue: null, setValue: null, index: 24 },

            Spine: {name: "Spine", mesh: null, initValue: null, setValue: {x:PI_14 ,y:0 ,z:0 }, index: 25}, 

            Neck: {name: "Neck" , mesh: null, initValue: null, setValue: {x:-PI_14 ,y:0 ,z:0 }, index: 26}, 

            Shoulder_sx: { name: "LeftShoulder", mesh: null, initValue: { x:0, y:-PI_3, z:0 }, setValue: null, index: 27},
            Upper_arm_sx: { name: "LeftArm", mesh: null, initValue: { x:PI_12, y:0, z:0 }, setValue: null, index: 28 },
            Lower_arm_sx: { name: "LeftForeArm", mesh: null, initValue:  null, setValue: null, index: 29},
            Hand_sx: { name: "LeftHand", mesh: null, initValue: null, setValue: null, index: 30 },
            Thumb_sx: { name: "LeftHandThumb1", mesh: null, initValue: null, setValue: null, index: 31 },
            Index_sx: { name: "LeftHandIndex1", mesh: null, initValue: null, setValue: null, index: 32 },
            Middle_sx: { name: "LeftHandMiddle1", mesh: null, initValue: null, setValue: null, index: 33 },
            Ring_sx: { name: "LeftHandRing1", mesh: null, initValue: null, setValue: null, index: 34 },
            Pinky_sx: { name: "LeftHandPinky1", mesh: null, initValue: null, setValue: null, index: 35 },

            Shoulder_dx: { name: "RightShoulder", mesh: null, initValue: { x:0, y:PI_3, z:0 }, setValue: {x:-PI_12, y:0, z:0},  index: 36 },
            Upper_arm_dx: { name: "RightArm", mesh: null, initValue:  { x:PI_12, y:0, z:0 }, setValue: null, index: 37 },
            Lower_arm_dx: { name: "RightForeArm", mesh: null, initValue: null, setValue: null, index: 38   },
            Hand_dx: { name: "RightHand", mesh: null, initValue: null, setValue: null, setValue: null, index: 39 },

            Hips: {name: "Hips" , mesh: null, initValue: null, setValue: {x:0 ,y:PI_8 ,z:0 }, index: 40}, 
        };
        this._prepareDict();

        this._entity = entity;

        if ( this._entity == 0 ) {
          this._meshesDictionary.Neck.setValue.x = PI_12;
        }

        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
    }
};



function Punch(state) {

  if ( state._parent._entity == 1 ) {
  
    while ( state._meshesDictionary.Shoulder_dx.mesh.rotation.x <= state._meshesDictionary.Shoulder_dx.initValue.x + PI_16) {
      state._meshesDictionary.Shoulder_dx.mesh.rotation.x += 0.02;
      state._meshesDictionary.Lower_arm_dx.mesh.rotation.z -= 0.05;

    }

    for(var i in state._meshesDictionary){
      if ( state._meshesDictionary[i].index < 20 ) {
        state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].setValue, state._comebackStep));
      }
    }

    setTimeout(() => {  

      for(var i in state._meshesDictionary){

        if (state._meshesDictionary[i].index == 36 || state._meshesDictionary[i].index == 40 || state._meshesDictionary[i].index == 25 || state._meshesDictionary[i].index == 26  ) {
          state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].setValue, state._comebackStep));
        }
        else if ( state._meshesDictionary[i].index == 38 ) {
          state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].initValue, state._comebackStep));
        }
      }

      var snd = new Audio('../../resources/sounds/female_officer_punch_sound.mp3');
      snd.play();


    }, 150);


    setTimeout(() => {  
      
      for(var i in state._meshesDictionary){
        state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].initValue, state._comebackStep));
      }

    }, 500);
  }
  else {
    while ( state._meshesDictionary.Shoulder_dx.mesh.rotation.x >= state._meshesDictionary.Shoulder_dx.initValue.x - PI_2) {
      state._meshesDictionary.Shoulder_dx.mesh.rotation.x -= 0.02;
      state._meshesDictionary.Hand_dx.mesh.rotation.z -= 0.02;
      state._meshesDictionary.Hand_dx.mesh.rotation.x -= 0.005;
    }

    for(var i in state._meshesDictionary){
      if ( state._meshesDictionary[i].index == 26 ) {
        state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].setValue, state._comebackStep));
      }
    }

    var snd = new Audio('../../resources/sounds/female_officer_punch_sound.mp3');
    snd.play();
    
    setTimeout(() => {  
      
      for(var i in state._meshesDictionary){
        state._meshesDictionary[i].mesh.rotation.set( ...state.comeback(state._meshesDictionary[i].mesh.rotation, state._meshesDictionary[i].initValue, state._comebackStep));
      }

    }, 500);
  }
}

class IdleState extends State {
    constructor(parent) {
      super(parent);
      this._toComeback = false;
      this._comebackTotSteps = 10;
      this._comebackStepVal = 1 / this._comebackTotSteps;  

    }
  
    get Name() {
      return 'idle';
    }

    Enter(prevState) {
      this._comebackStep = this._comebackStepVal;
      this._toComeback = true;
    }
  
    Update(input) {
      if ( input._keys.space  ) {
        this._toComeback = false;
        Punch(this);
        return;
      }
      else {
        if ( input._keys.forward || input._keys.backward ) {
          if ( input._keys.shift ) {
            this._parent.SetState('run');
            return;
          }
          else {
            this._parent.SetState('walk');
            return;
          }
        }
        else {
          if (this._toComeback){
            if(this._comebackStep <= 1){
                for(var i in this._meshesDictionary){
                    this._meshesDictionary[i].mesh.rotation.set( ...this.comeback(this._meshesDictionary[i].mesh.rotation, this._meshesDictionary[i].initValue, this._comebackStep));
                }

                this._comebackStep += this._comebackStepVal;

                return;
            } else {
                this._toComeback = false;
            }
          }
        }
      }
    }
};


class WalkState extends State {
  constructor(params) {
      super(params);

      this._stateLegs = 1;
      this._stateArms = 0;
      
      this._shoulder_sx = this._meshesDictionary.Shoulder_sx.initValue.x;
      this._shoulder_dx = this._meshesDictionary.Shoulder_dx.initValue.x;

      this._lower_arm_sx = this._meshesDictionary.Lower_arm_sx.initValue.x;
      this._lower_arm_dx = this._meshesDictionary.Lower_arm_dx.initValue.x;

      this._upper_leg_sx = this._meshesDictionary.Upper_leg_sx.initValue.x;
      this._upper_leg_dx = this._meshesDictionary.Upper_leg_dx.initValue.x;

      this._lower_leg_dx = this._meshesDictionary.Lower_leg_dx.initValue.x;
      this._lower_leg_sx = this._meshesDictionary.Lower_leg_sx.initValue.x;
      

  }
  
  Enter(prevState) {

    if ( prevState != null && prevState.Name == "run" ) {
      this._meshesDictionary.Lower_arm_dx.mesh.rotation.z = this._meshesDictionary.Lower_arm_dx.initValue.z;
      this._meshesDictionary.Lower_arm_sx.mesh.rotation.z = this._meshesDictionary.Lower_arm_sx.initValue.z;
      this._meshesDictionary.Spine.mesh.rotation.x = this._meshesDictionary.Spine.initValue.x;
      this._meshesDictionary.Neck.mesh.rotation.x = this._meshesDictionary.Neck.initValue.x;
    }
  }

  Update(input) {
    var vel_Upper = 0.02;
    var vel_Lower = 0.1;
    if (input._keys.forward || input._keys.backward) {
      if ( input._keys.shift ) {
        this._parent.SetState('run');
        return;
      }
      else {
        if(this._stateLegs==0) {
          if (this._meshesDictionary.Upper_leg_sx.mesh.rotation.x >= this._upper_leg_sx + PI_12) {
            this._stateLegs = 1;
          } else {
            this._meshesDictionary.Upper_leg_sx.mesh.rotation.x += vel_Upper;
            if ( this._meshesDictionary.Lower_leg_sx.mesh.rotation.x <= this._upper_leg_sx ) {
              this._meshesDictionary.Lower_leg_sx.mesh.rotation.x += vel_Lower;
            }

            this._meshesDictionary.Upper_leg_dx.mesh.rotation.x -= vel_Upper;
            if ( this._meshesDictionary.Lower_leg_dx.mesh.rotation.x >= this._upper_leg_dx - PI_4 ) {
              this._meshesDictionary.Lower_leg_dx.mesh.rotation.x -= vel_Lower;
            }
          }
        }
        else if(this._stateLegs==1){
          if (this._meshesDictionary.Upper_leg_sx.mesh.rotation.x <= this._upper_leg_sx-PI_12) {
            this._stateLegs = 0;
          } 
          else {
            this._meshesDictionary.Upper_leg_sx.mesh.rotation.x -= vel_Upper;
            if ( this._meshesDictionary.Lower_leg_sx.mesh.rotation.x >= this._upper_leg_sx - PI_4 ) {
              this._meshesDictionary.Lower_leg_sx.mesh.rotation.x -= vel_Lower;
            }

            this._meshesDictionary.Upper_leg_dx.mesh.rotation.x += vel_Upper;
            if ( this._meshesDictionary.Lower_leg_dx.mesh.rotation.x <= this._upper_leg_dx ) {
              this._meshesDictionary.Lower_leg_dx.mesh.rotation.x += vel_Lower;
            }
          }
        }

        if(this._stateArms==0) {
          if (this._meshesDictionary.Shoulder_sx.mesh.rotation.x >= this._shoulder_sx+arm_angle_walk) {
            this._stateArms = 1;
          } 
          else {
            this._meshesDictionary.Shoulder_sx.mesh.rotation.x += vel_Upper;

            this._meshesDictionary.Shoulder_dx.mesh.rotation.x -= vel_Upper;
          }
        }
        else if(this._stateArms==1){
          if (this._meshesDictionary.Shoulder_sx.mesh.rotation.x <= this._shoulder_sx-arm_angle_walk) {
            this._stateArms = 0;
          } 
          else {
            this._meshesDictionary.Shoulder_sx.mesh.rotation.x -= vel_Upper;

            this._meshesDictionary.Shoulder_dx.mesh.rotation.x += vel_Upper;
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



    this._shoulder_sx = this._meshesDictionary.Shoulder_sx.initValue.x;
    this._shoulder_dx = this._meshesDictionary.Shoulder_dx.initValue.x;

    this._lower_arm_sx = this._meshesDictionary.Lower_arm_sx.initValue.z;
    this._lower_arm_dx = this._meshesDictionary.Lower_arm_dx.initValue.z;

    this._upper_leg_sx = this._meshesDictionary.Upper_leg_sx.initValue.x;
    this._upper_leg_dx = this._meshesDictionary.Upper_leg_dx.initValue.x;

    this._lower_leg_dx = this._meshesDictionary.Lower_leg_dx.initValue.x;
    this._lower_leg_sx = this._meshesDictionary.Lower_leg_sx.initValue.x;

    this._spine = this._meshesDictionary.Spine.initValue.x;

    this._neck = this._meshesDictionary.Neck.initValue.x;
  }
  
    get Name() {
      return 'run';
    }

    Enter(prevState) {
      this._meshesDictionary.Lower_arm_sx.mesh.rotation.z = this._lower_arm_sx + PI_4;
      this._meshesDictionary.Lower_arm_dx.mesh.rotation.z = this._lower_arm_dx - PI_4;
      this._meshesDictionary.Spine.mesh.rotation.x = this._spine + PI_14;
      this._meshesDictionary.Neck.mesh.rotation.x = this._neck - PI_14;
    }
  
    Update(input) {
      var vel_Upper = 0.05;
      var vel_Lower = 0.25;
      if (input._keys.forward || input._keys.backward ) {
        if (input._keys.shift) {
            if(this._stateLegs==0) {
              if (this._meshesDictionary.Upper_leg_sx.mesh.rotation.x >= this._upper_leg_sx + PI_8) {
                  this._stateLegs = 1;
              } else {
                  this._meshesDictionary.Upper_leg_sx.mesh.rotation.x += vel_Upper;
                  if ( this._meshesDictionary.Lower_leg_sx.mesh.rotation.x <= this._upper_leg_sx ) {
                    this._meshesDictionary.Lower_leg_sx.mesh.rotation.x += vel_Lower;
                  }
                  this._meshesDictionary.Upper_leg_dx.mesh.rotation.x -= vel_Upper;
                  if ( this._meshesDictionary.Lower_leg_dx.mesh.rotation.x >= this._upper_leg_dx - PI_14 ) {
                    this._meshesDictionary.Lower_leg_dx.mesh.rotation.x -= vel_Lower;
                  }
              }
            }
            else if(this._stateLegs==1){
              if (this._meshesDictionary.Upper_leg_sx.mesh.rotation.x <= this._upper_leg_sx-PI_8) {
                  this._stateLegs = 0;
              } 
              else {
                  this._meshesDictionary.Upper_leg_sx.mesh.rotation.x -= vel_Upper;
                  if ( this._meshesDictionary.Lower_leg_sx.mesh.rotation.x >= this._upper_leg_sx - PI_4 ) {
                    this._meshesDictionary.Lower_leg_sx.mesh.rotation.x -= vel_Lower;
                  }

                  this._meshesDictionary.Upper_leg_dx.mesh.rotation.x += vel_Upper;
                  if ( this._meshesDictionary.Lower_leg_dx.mesh.rotation.x <= this._upper_leg_dx ) {
                    this._meshesDictionary.Lower_leg_dx.mesh.rotation.x += vel_Lower;
                  }
              }
            }
            if(this._stateArms==0) {
              if (this._meshesDictionary.Shoulder_sx.mesh.rotation.x >= this._shoulder_sx+arm_angle_run) {
                  this._stateArms = 1;
              } else {
                  this._meshesDictionary.Shoulder_sx.mesh.rotation.x += vel_Upper;

                  this._meshesDictionary.Shoulder_dx.mesh.rotation.x -= vel_Upper;
              }
            }
            else if(this._stateArms==1){
              if (this._meshesDictionary.Shoulder_sx.mesh.rotation.x <= this._shoulder_sx-arm_angle_run) {
                  this._stateArms = 0;
              } 
              else {
                  this._meshesDictionary.Shoulder_sx.mesh.rotation.x -= vel_Upper;

                  this._meshesDictionary.Shoulder_dx.mesh.rotation.x += vel_Upper;
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
