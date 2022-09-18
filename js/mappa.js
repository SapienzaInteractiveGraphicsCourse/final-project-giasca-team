import * as THREE from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/build/three.module.js';

import { GLTFLoader } from 'https://cdn.skypack.dev/three@v0.129.0-oVPEZFilCYUpzWgJBZqM/examples/jsm/loaders/GLTFLoader.js';

import { CharacterFSM } from './Movements/CharacterFSM.js';
import { MonsterFSM } from './Movements/MonsterFSM.js';

var scene, camera, renderer, mesh;
var plane, ambientLight, light;
var Character, Monster;

class BasicCharacterController { //represents a single animated character in the world
    constructor(target) {
        this._Init(target);
    }

    _Init(target) {
        this._target = target;
        /*this._path = params.path;
        this._scaleValue = params.scaleValue;
        this._pos_x = params.pos_x;
        this._pos_y = params.pos_y;
        this._pos_z = params.pos_z;*/

        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(0.1, 0.25, 0.02);
        this._velocity = new THREE.Vector3(0, 0, 0);
    
        this._stateMachine = new CharacterFSM(this._target);
        this._stateMachine.SetState('idle');
        this._input = new BasicCharacterControllerInput();
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
                velocity.z += acc.z * 1.2;
            }
            //else {
                if (this._input._keys.left) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, this._acceleration.y);
                    _R.multiply(_Q);
                    //velocity.x += acc.x;
                }
                if (this._input._keys.right) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, -this._acceleration.y);
                    _R.multiply(_Q);
                    //velocity.x -= acc.x;
                }
                velocity.z += acc.z ;
            //}
        }
        else if (this._input._keys.backward) {
            if (this._input._keys.shift) {
                velocity.z -= acc.z * 1.2;
            }
            //else {
                if (this._input._keys.left) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, this._acceleration.y);
                    _R.multiply(_Q);
                    //velocity.x += acc.x;
                }
                if (this._input._keys.right) {
                    _A.set(0, 1, 0);
                    this._acceleration.y += 0.0001;
                    _Q.setFromAxisAngle(_A, -this._acceleration.y);
                    _R.multiply(_Q);
                    //velocity.x -= acc.x;
                }
                velocity.z -= acc.z;
            //}
        }

        else if (this._input._keys.left) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.0001;
            _Q.setFromAxisAngle(_A, this._acceleration.y);
            _R.multiply(_Q);
            //velocity.x += acc.x;
        }
        else if (this._input._keys.right) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.0001;
            _Q.setFromAxisAngle(_A, -this._acceleration.y);
            _R.multiply(_Q);
            //velocity.x -= acc.x;
        }

        /*else if (this._input._keys.left) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.001;
            _Q.setFromAxisAngle(_A, this._acceleration.y);
            _R.multiply(_Q);
            //velocity.x += acc.x;
        }*/
        /*else if (this._input._keys.right) {
            _A.set(0, 1, 0);
            this._acceleration.y += 0.001;
            _Q.setFromAxisAngle(_A, -this._acceleration.y);
            _R.multiply(_Q);
            //velocity.x -= acc.x;
        }*/
        else {
            velocity.z = 0;
            velocity.x = 0;
            velocity.y = 0;

            this._acceleration.x = 0.1;
            this._acceleration.y = 0.25;
            this._acceleration.z = 0.02;
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

class BasicCharacterControllerInput { //resposible for keyboard and other controller input
    constructor() {
        this._Init();
    }

    _Init(){
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        };
        //document.addEventListener( 'mousemove', (e) => this._onMouseMove(e), false );
        document.addEventListener('keydown', (e)=>this._onKeyDown(e), false);
        document.addEventListener('keyup', (e)=>this._onKeyUp(e), false); 
    }

    _onKeyDown(event){
        switch(event.keyCode){
            case 87: //W
                this._keys.forward=true;
                break;
            case 65: // a
                this._keys.left = true;
                break;
            case 83: // s
                this._keys.backward = true;
                break;
            case 68: // d
                this._keys.right = true;
                break;
            case 32: // SPACE
                this._keys.space = true;
                break;
            case 16: // SHIFT
                this._keys.shift = true;
                break;
        }
    }
        
    _onKeyUp(event) {
        switch(event.keyCode) {
            case 87: // w
                this._keys.forward = false;
                break;
            case 65: // a
                this._keys.left = false;
                break;
            case 83: // s
                this._keys.backward = false;
                break;
            case 68: // d
                this._keys.right = false;
                break;
            case 32: // SPACE
                this._keys.space = false;
                break;
            case 16: // SHIFT
                this._keys.shift = false;
                break;
        }
    }
};

class BasicMonsterController { //represents a single animated character in the world
    constructor(target) {
        this._Init(target);
    }

    _Init(target) {
        this._target = target;
        
    
        this._stateMachine = new MonsterFSM(this._target);
        this._stateMachine.SetState('idle');
        this._input = new BasicCharacterControllerInput();
    }

    update(){
        this._stateMachine.Update(0.005);
    }

};


//var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
//var USE_WIREFRAME = false;

var loadingScreen = {
    scene : new THREE.Scene(),
    camera : new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1.0, 1000.0 ),
};

var loadingManager = null;
var RESOURCES_LOADED = false;

var models = {
    female_officer: {
        name: "female_officer",
        mesh: null
    },
    monster: {
        name: "monster",
        mesh: null
    }
};

//var meshes = {};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
	camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1.0, 1000.0 );

    const loading_screen = document.querySelector(".loading_container");
    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	}; //onProgress is triggered every time one resource is loaded.
    loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
        loading_screen.style.display = "none";
	}; //onLoad is when all resources are loaded

    /*loadingManager.onError = function(item) {
        console.log('Got a problem in loading: ${item}');
    }*/

    //CREATION OF THE PLANE (GRASS)
    const textureLoader = new THREE.TextureLoader();

    const tilesBaseColor = textureLoader.load('../texture_grass2/Ground037_1K_Color.jpg');
    const tilesNormalMap = textureLoader.load('../texture_grass2/Ground037_1K_NormalDX.jpg');
    const tilesHeightMap = textureLoader.load('../texture_grass2/Ground037_1K_Displacement.jpg');
    const tilesRoughness = textureLoader.load('../texture_grass2/Ground037_1K_HRoughness.jpg');
    const tilesAmbientOcclusionMap = textureLoader.load('../texture_grass2/Ground037_1K_AmbientOcclusion.jpg');

    plane = new THREE.Mesh(
        new THREE.BoxGeometry(8,0.1,7),
        new THREE.MeshLambertMaterial(
            {
                //BUMP MAPPING
                map: tilesBaseColor,
                normalMap: tilesNormalMap,
                displacementMap: tilesHeightMap,
                roughnessMap: tilesRoughness, //define which areas are rough
                roughness: 0.5,
                aoMap: tilesAmbientOcclusionMap //put the shadow areas
            }
    ));
    plane.position.x = -5;
    plane.position.y = 0;
    plane.position.z = 4;
    //plane.rotation.x -= Math.PI / 2;
    plane.geometry.attributes.uv2 = plane.geometry.attributes.uv; //this because the aoMap requires a second set of UVs 
                                                              // => Uvs are used to map the texture to a point of the geometry
    //plane.rotation.x = 10;
    //plane.rotation.y = 0.0;
    scene.add(plane);

    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    var is_female_officer = true;
    var character_path;
    if(is_female_officer){
        character_path = '../models/female_officer/scene.gltf';
    }
    else{
        //character_path = '../models/male_officer/scene.gltf';
    }

    /*var character_params = {
        /*path : '../models/female_officer/scene.gltf',
        scaleValue : 1.3,
        pos_x : -5,
        pos_y : 0,
        pos_z : 1
        target: 
    };*/

    //const Character = new BasicCharacterController(character_params);

    _LoadModels('../models/female_officer/scene.gltf',1.3,-5,0.2,1, 0);

    _LoadModels('../models/monster/scene.gltf',0.15,-5,0,4);

    //_LoadModels('../models/female_officer/scene.gltf', this._scaleValue, this._pos_x, this._pos_y, this._pos_z);


    camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight); //render resolution
    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    animate();

}


function _LoadModels(path,scaleValue,position_x,position_y,position_z, entity) {
    var loaderGLTF = new GLTFLoader(loadingManager);
    loaderGLTF.load(path, function(gltf){
        mesh = gltf.scene;

        /*mesh.traverse(c => {
            c.castShadow = true;
        });*/

        mesh.position.set(position_x,position_y,position_z);
        mesh.scale.setScalar(scaleValue);
        mesh.rotation.set(0, 15, 0);
        //provabanana = mesh.getObjectByName("LeftUpLeg_055");
        //models[monster].mesh = mesh;
        scene.add(mesh);
        if(entity==0){
            Character = new BasicCharacterController(mesh);
        }
        else{
            Monster = new BasicMonsterController(mesh);
        }
        
    });
}

var current_time;
var updating_time;

function animate(){

	// Play the loading screen until resources are loaded.
	if( RESOURCES_LOADED == false ){
		requestAnimationFrame(animate);
		
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}

	requestAnimationFrame(animate);
	
    Character.update();
	Monster.update();
	renderer.render(scene, camera);

}

/*function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);*/

window.onload = init;


