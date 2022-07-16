import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

import { FiniteStateMachine , State } from './FiniteStateMachine.js';

const PI_2 = Math.PI / 2;
const PI_3 = Math.PI / 3;
const PI_4 = Math.PI / 4;
const PI_6 = Math.PI / 6;
const PI_12 = Math.PI / 12;

const arm_angle = PI_6;

export class MonsterFSM extends FiniteStateMachine {
    constructor(target) {
        super(target);

        this._targetDict = {
            /*Upper_leg_sx: { name: "LeftUpLeg_055", mesh: null, initValue: null },
            Lower_leg_sx: { name: "LeftLeg_056", mesh: null, initValue: null },
            Upper_leg_dx: { name: "RightUpLeg_060", mesh: null, initValue: null },
            Lower_leg_dx: { name: "RightLeg_061", mesh: null, initValue: null },

            Head: { name: "Head_06", mesh: null, initValue: null },

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
            Pinky_dx: { name: "RightHandPinky1_052", mesh: null, initValue: null },*/
        };
        //this._prepareDict();

        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
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
    }

    

    Exit() {
    }
  
    Update(input) {
      
    }
};


class WalkState extends State {
  constructor(params) {
      super(params);

  }

  Update(input) {
    
  }
}
