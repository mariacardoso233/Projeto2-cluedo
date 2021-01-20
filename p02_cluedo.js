let scene, camera, renderer
let controls, mesh, key
let clicked = false

let floor1

let spheres = []
let selectedObject, plane;
let offset = new THREE.Vector3();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let dices = [];
let dice;
let dragDice = false;

let fan, propeller, propeller2, conect, torus;
let ladoEsq = false, ladoDir = false;

let chairs = [];
let chair, chair2;

let mouseXposition
let mouseYposition

// 3D MODELS
let board

//Keys
let keyboard = {};

let player = { height: 1, speed: 0.1 }

const textDoor = new THREE.TextureLoader().load('./textures/door.jpg');
const normalDoor = new THREE.TextureLoader().load('./textures/door_normal.jpg');

//TV - LivingRoom
let tvScreenOn, buttonOff, buttonOn

//Globe
let base2, globe, earth

//Fogueira funções
let fireBalls = [];

const loader = new THREE.GLTFLoader().setPath('models/GLTF/');


// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene();
    createLights();

    createBoard();
    createBorder();

    //Divisões do tabuleiro
    createKitchen();
    createFan();

    createBallroom();
    createPianoKeys();

    createConservatory();
    createGlobe();
    createFire();

    createBilliardroom();
    createBalls();

    createBedroom();
    createHall();

    createLivingroom();
    createChairs();

    createDiningroom();
    createStairs();

    cluedoLetters();

    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    animate();
}

function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    // let axes = new THREE.AxesHelper(600);
    // scene.add(axes);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    //set the camera's view transformation
    camera.position.set(0, 20, 18); // eye
    camera.lookAt(0, 0, 0);


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
    renderer.setClearColor("#000000");

    renderer.shadowMap.enabled = true;
    // add the output of the renderer to the DIV with id "world"
    document.getElementById('canvas-container').appendChild(renderer.domElement);


    // controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', function () { renderer.render(scene, camera); });

    /**********************
     * OBJETOS 
     ***********************/

    loader.load('plant.glb',

        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.6, 0.6, 0.6);
            mesh.position.set(1.7, 0, -7.5)
            mesh.rotation.set(0, 2, 0)
            scene.add(mesh);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });

    loader.load('plant.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.6, 0.6, 0.6);
            mesh.position.set(-1.2, 0, -7.5)
            mesh.rotation.set(0, 2, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('photo.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.009, 0.009, 0.009);
            mesh.position.set(2.7, 1, -8);
            mesh.rotation.set(0, 4.7, 0);
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('piano.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.1, 0.1, 0.1);
            mesh.position.set(1.7, 0, 7.5)
            mesh.rotation.set(0, 2, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('table.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.003, 0.002, 0.003);
            mesh.position.set(6.9, 0, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('Coffee_table.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.09, 0.09, 0.09);
            mesh.position.set(9, 0.1, 7);
            mesh.rotation.y = 5;
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('centerTable.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.0007, 0.0007, 0.0007);
            mesh.position.set(-7.5, 0, 8.5)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('centerTable.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.0007, 0.0007, 0.0007);
            mesh.position.set(-5, 0, 8.5)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('littlePlant.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.03, 0.03, 0.03);
            mesh.position.set(-5, 0.25, 8.5)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('Pool-table.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.5, 0.5, 0.5);
            mesh.position.set(-6.5, 0.6, -0.5)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('chair.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.08, 0.08, 0.08);
            mesh.rotation.set(0, 1.55, 0)
            chair.add(mesh)
            chairs.push(chair)
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('chair.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.08, 0.08, 0.08);
            mesh.rotation.set(0, 3.1, 0)
            chair2.add(mesh)
            chairs.push(chair2)
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('sofa.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.001, 0.001, 0.001);
            mesh.position.set(7.7, 0, -7.7)
            mesh.rotation.set(0, 0.7, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('sofa.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.001, 0.001, 0.001);
            mesh.position.set(8.5, 0, -6.5)
            mesh.rotation.set(0, -0.9, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('bed.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.1, 0.1, 0.1);
            mesh.position.set(-8, 0.2, -7)
            mesh.rotation.set(0, 1.5, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('table_bed.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.05, 0.05, 0.05);
            mesh.position.set(-9, 0, -8)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('fridge.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.19, 0.19, 0.19);
            mesh.position.set(8.45, 0.1, 8.8)
            mesh.rotation.set(0, 1.5, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('sink.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.0003, 0.0003, 0.0003);
            mesh.position.set(7.2, 0.45, 8.9)
            // mesh.rotation.set(0, 1.5, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(0.64, 0, -0.02)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(-0.2, 0, -0.02)
            mesh.rotation.set(0, 0, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(-0.7, 0, -0.36)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(-0.71, 0, -1.2)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(1.15, 0, -0.36)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('handrail.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            mesh.position.set(1.15, 0, -1.2)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('Bookshelf.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.02, 0.02, 0.02);
            mesh.position.set(-2.5, 0.45, 8)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });

    loader.load('Bookshelf.glb',

        function (gltf) {
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.02, 0.02, 0.02);
            mesh.position.set(-2.5, 0.45, 7.2)
            mesh.rotation.set(0, 1.58, 0)
            scene.add(mesh);
        },
        undefined,
        function (err) {
            console.log(err);
        });
}

function createLights() {
    // //Create a PointLight and turn on shadows for the light
    // let pointLight = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight.position.set( 1.8, 2, 6.8);
    // pointLight.castShadow = true; // default false
    // scene.add(pointLight);

    // let pointLight2 = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight2.position.set( -7.5, 2, 7);
    // pointLight2.castShadow = true; // default false
    // scene.add(pointLight2);

    // let pointLight3 = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight3.position.set( -7.5, 2, 0);
    // pointLight3.castShadow = true; // default false
    // scene.add(pointLight3);

    // let pointLight4 = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight4.position.set( -7.5, 2, -5);
    // pointLight4.castShadow = true; // default false
    // scene.add(pointLight4);

    // let pointLight5 = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight5.position.set(-2, 2, -5);
    // pointLight5.castShadow = true; // default false
    // scene.add(pointLight5);

    // let pointLightCenter = new THREE.PointLight( 0xffd675, 0.8, 10);
    // pointLightCenter.position.set(0.5, 2, 0);
    // pointLightCenter.castShadow = true; // default false
    // scene.add(pointLightCenter);

    // let pointLight6 = new THREE.PointLight( 0xffd675, 1.5, 6 );
    // pointLight6.position.set(7, 2, -6);
    // pointLight6.castShadow = true; // default false
    // scene.add(pointLight6);

    // let pointLight7 = new THREE.PointLight( 0xffd675, 1, 6 );
    // pointLight7.position.set(7, 2, 0);
    // pointLight7.castShadow = true; // default false
    // scene.add(pointLight7);

    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1.5);
    scene.add(hemisphereLight);

    // white spotlight shining from the side, casting a shadow

    const spotLight = new THREE.SpotLight( 0xffd675, 1, 0, 0.5);
    spotLight.position.set(7, 1, 6);
    spotLight.target.position.set(10.5, 0, 9)

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 500;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);
    scene.add( spotLight.target);
}

function createBoard() {

    /**********************
     * TABULEIRO 
     ***********************/
    //GEOMETRY
    let geomBoard = new THREE.BoxGeometry(9.5, 0.1, 9.5);
    let geomBoard2 = new THREE.BoxGeometry(9.5, 0.1, 9.5);
    let geomBoard3 = new THREE.BoxGeometry(8.85, 0.1, 8.85);
    let geomBoard4 = new THREE.BoxGeometry(8.7, 0.1, 8.7);

    //TEXTURES
    // let textBoard = new THREE.TextureLoader().load('./textures/board.jpeg');
    // let normalBoard = new THREE.TextureLoader().load('./textures/board_normal.jpg');

    //TEXTURES
    let textBoard = new THREE.TextureLoader().load('./textures/floor.jpg');
    let normalBoard = new THREE.TextureLoader().load('./textures/floor_normal.jpg');

    textBoard.wrapS = THREE.RepeatWrapping;
    textBoard.wrapT = THREE.RepeatWrapping;
    textBoard.repeat.set(4, 4);

    //Material Board
    let matBoard = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matBoard.map = textBoard;
    matBoard.normalMap = normalBoard;

    //Mesh Board
    let board1 = new THREE.Mesh(geomBoard, matBoard);
    board1.position.set(-4.5, 0, 4.58);

    let board2 = new THREE.Mesh(geomBoard2, matBoard);
    board2.position.set(5, 0, 4.58);

    let board3 = new THREE.Mesh(geomBoard3, matBoard);
    board3.position.set(5.5, 0, -4.58);

    let board4 = new THREE.Mesh(geomBoard4, matBoard);
    board4.position.set(-4.98, 0, -4.51);

    scene.add(board1, board2, board3, board4);

}

function createBorder() {

    //TEXTURES
    let textFloor4 = new THREE.TextureLoader().load('./textures/floor4.jpg');
    let normalFloor4 = new THREE.TextureLoader().load('./textures/floor4_normal.jpg');

    //GEOMETRY
    let geomBorder1 = new THREE.BoxGeometry(18.9, 1.5, 0.3);
    let geomBorder2 = new THREE.BoxGeometry(9, 1.5, 0.3);
    let geomBorder3 = new THREE.BoxGeometry(0.3, 1.5, 18.2);
    let geomBorder4 = new THREE.BoxGeometry(0.3, 1.5, 18.5);

    //Material Board
    let matBoard = new THREE.MeshPhongMaterial({ color: 0xf0e0d0 });
    matBoard.map = textFloor4;
    matBoard.normalMap = normalFloor4;

    //Border positions
    let border1 = new THREE.Mesh(geomBorder1, matBoard);
    border1.position.set(0.25, 0.6, 9.2);

    let border2 = new THREE.Mesh(geomBorder2, matBoard);
    let border2_2 = new THREE.Mesh(geomBorder2, matBoard);
    border2.position.set(-5, 0.6, -9);
    border2_2.position.set(5.2, 0.6, -9);
    scene.add(border2, border2_2);

    let border3 = new THREE.Mesh(geomBorder3, matBoard);
    border3.position.set(-9.35, 0.6, 0.25);
    let border4 = new THREE.Mesh(geomBorder4, matBoard);
    border4.position.set(9.8, 0.6, 0.1);
    
    border4.receiveShadow = true;

    scene.add(border1, border3, border4);

}
function createKitchen() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor1 = new THREE.BoxGeometry(4.9, 0.1, 4.9);

    //TEXTURES
    let textFloor1 = new THREE.TextureLoader().load('./textures/floor1.jpg');
    let normalFloor1 = new THREE.TextureLoader().load('./textures/floor1_normal.jpg');

    //Material floor
    let matFloor1 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matFloor1.map = textFloor1;
    matFloor1.normalMap = normalFloor1;

    //Mesh floor
    floor1 = new THREE.Mesh(geomFloor1, matFloor1);
    floor1.position.set(7.2, 0.1, 6.7);
    scene.add(floor1);


    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall2 = new THREE.BoxGeometry(3, 1.2, 0.1);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 3);

    //Mobilia
    let geomBalcao = new THREE.BoxGeometry(2, 0.3, 0.3);

    // //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    // //WallsKitchen
    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(8.25, 0.6, 4.2);
    scene.add(wall2);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(4.72, 0.6, 7.75);
    scene.add(wall4);

    let balcao = new THREE.Mesh(geomBalcao, matWall);
    balcao.position.set(7.2, 0.3, 8.9);
    scene.add(balcao);

}

//Ventoinha
function createFan() {
    /* ----------------------------- Ventoinha ----------------------------- */

    fan = new THREE.Object3D();

    const materialWhite = new THREE.MeshPhongMaterial({ color: 0xd8d0d1 });
    const materialBrown = new THREE.MeshPhongMaterial({ color: 0x59332e });
    const materialDarkBrown = new THREE.MeshPhongMaterial({ color: 0x23190f });

    // Create the base
    let geomBase = new THREE.CylinderGeometry(0.2, 0.4, 0.2, 16, 1);
    let base = new THREE.Mesh(geomBase, materialWhite);
    base.position.set(35, 1.7, 26.5)
    fan.add(base);

    // Create the conect
    let geomConect = new THREE.CylinderGeometry(0.05, 0.05, 1.1, 32);
    conect = new THREE.Mesh(geomConect, materialWhite);
    conect.position.set(35, 2.3, 26.5)
    conect.rotation.y = Math.PI / 2
    fan.add(conect);

    // Create the torus
    const geometry = new THREE.TorusGeometry(0.48, 0.03, 3, 100);
    torus = new THREE.Mesh(geometry, materialWhite);
    torus.position.x = 0.3;
    torus.position.y = 0.39;
    torus.rotation.y = -Math.PI / 2
    conect.add(torus);

    // propeller
    let geomPropeller = new THREE.BoxGeometry(0.3, 0.08, 0.08);

    propeller = new THREE.Mesh(geomPropeller, materialDarkBrown);

    // propeller2
    let geomPropeller2 = new THREE.BoxGeometry(0.45, 0.12, 0.12);

    propeller2 = new THREE.Mesh(geomPropeller2, materialDarkBrown);

    // blades
    let geomBlade = new THREE.BoxGeometry(0.01, 0.8, 0.1);
    let geomBlade2 = new THREE.BoxGeometry(0.01, 0.8, 0.1);

    let blade = new THREE.Mesh(geomBlade, materialWhite);
    blade.position.set(0.20, 0, 0);

    // SECOND propeller
    let blade2 = new THREE.Mesh(geomBlade2, materialWhite);
    blade2.rotation.x = Math.PI / 2;
    blade2.position.set(0.20, 0, 0);

    propeller.add(blade);
    propeller.add(blade2);

    propeller.position.set(0.1, 0.4, 0);
    propeller2.position.set(0.1, 0.4, 0);
    conect.add(propeller);
    conect.add(propeller2);

    fan.scale.set(0.25, 0.25, 0.25);
    fan.position.y = 0;

    console.log("Plane created")
    scene.add(fan);

    /*****************************
    * SHADOWS 
    ****************************/
    // fan meshes must cast and receive shadows
    fan.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}

function createBallroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor2 = new THREE.BoxGeometry(5.9, 0.2, 5.5);

    //TEXTURES
    let textFloor2 = new THREE.TextureLoader().load('./textures/floor2.jpg');
    let normalFloor2 = new THREE.TextureLoader().load('./textures/floor2_normal.jpg');

    //Material
    let matFloor2 = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    matFloor2.map = textFloor2;
    matFloor2.normalMap = normalFloor2;

    //Mesh
    let floor2 = new THREE.Mesh(geomFloor2, matFloor2);
    floor2.position.set(0.25, 0, 6.3);
    scene.add(floor2);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(5.9, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(2, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 5.7);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 5.7);
    let geomDoor = new THREE.BoxGeometry(2.1, 1.2, 0.1);

    //TEXTURES
    // let textWall = new THREE.TextureLoader().load('./textures/wall2.jpg');
    // let normalWall = new THREE.TextureLoader().load('./textures/wall2_normal.jpg');

    // //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    //matWall.map = textWall;
    //matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Ballroom
    let wall2 = new THREE.Mesh(geomWall2, matWall);
    let wall2_2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-1.8, 0.6, 3.5);
    wall2_2.position.set(2.3, 0.6, 3.5);
    scene.add(wall2, wall2_2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-2.75, 0.6, 6.3);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(3.25, 0.6, 6.3);
    scene.add(wall4);

    //Doors Ballroom
    let door = new THREE.Mesh(geomDoor, matDoor);
    door.position.set(0.25, 0.6, 3.5);
    scene.add(door);
}

//Teclas Piano
function createPianoKeys() {
    let geomPiano = new THREE.BoxGeometry(1.5, 1.5, 0.05);
    const matPiano = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.0,
        transparent: true,
    });

    let piano = new THREE.Mesh(geomPiano, matPiano);
    piano.position.set(1.7, 0.2, 7);
    piano.rotation.set(1, 0, 0);
    scene.add(piano)

    let geomPianoKey = new THREE.BoxGeometry(0.01, 0.01, 0.1);
    let matPianoKey = new THREE.MeshPhongMaterial({ color: 0xFFF00 });

    let pianoKeyDo = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeyDo.position.set(1.624, 0.52, 6.929);
    pianoKeyDo.rotation.set(0, 0.435, 0);

    let pianoKeyRe = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeyRe.position.set(1.6135, 0.52, 6.9335);
    pianoKeyRe.rotation.set(0, 0.435, 0);

    let pianoKeyMi = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeyMi.position.set(1.603, 0.52, 6.9382);
    pianoKeyMi.rotation.set(0, 0.435, 0);

    let pianoKeyFa = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeyFa.position.set(1.572, 0.52, 6.9525);
    pianoKeyFa.rotation.set(0, 0.435, 0);

    let pianoKeySol = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeySol.position.set(1.5615, 0.52, 6.957);
    pianoKeySol.rotation.set(0, 0.435, 0);

    let pianoKeyLa = new THREE.Mesh(geomPianoKey, matPianoKey);
    pianoKeyLa.position.set(1.5515, 0.52, 6.9621);
    pianoKeyLa.rotation.set(0, 0.435, 0);

    scene.add(pianoKeyDo, pianoKeyRe, pianoKeyMi, pianoKeyFa, pianoKeySol, pianoKeyLa)
}

function createConservatory() {

    /* ----------------------------- FLOOR ----------------------------- */
    // //GEOMETRY
    let geomFloor3 = new THREE.BoxGeometry(4.8, 0.2, 4.7);

    //TEXTURES
    let textFloor3 = new THREE.TextureLoader().load('./textures/floor3.jpg');
    let normalFloor3 = new THREE.TextureLoader().load('./textures/floor3_normal.jpg');

    //Material floor
    let matFloor3 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matFloor3.map = textFloor3;
    matFloor3.normalMap = normalFloor3;

    // //Mesh
    let floor3 = new THREE.Mesh(geomFloor3, matFloor3);
    floor3.position.set(-6.85, 0, 6.7);
    scene.add(floor3);

    // /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall2 = new THREE.BoxGeometry(3.4, 0.3, 0.1);
    let geomWall4 = new THREE.BoxGeometry(0.1, 0.3, 3.4);

    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    //Walls Conservatory

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-7.5, 0.2, 4.3);
    scene.add(wall2);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-4.4, 0.2, 7.4);
    scene.add(wall4);
}

function createGlobe() {
    globe = new THREE.Object3D();

    const materialGrey = new THREE.MeshPhongMaterial({ color: 0xf9f9f9 });

    //Earth
    let geomEarth = new THREE.SphereGeometry(0.16, 32, 32);

    let mapTexture = new THREE.TextureLoader().load('textures/no_clouds_4k.jpg');
    let bumpmapTexture = new THREE.TextureLoader().load("textures/elev_bump_4k.jpg")

    let materialEarth = new THREE.MeshPhongMaterial({
        map: mapTexture,
        bumpMap: bumpmapTexture,
        bumpScale: 0.05
    });


    // Create the base
    let geomBase = new THREE.SphereGeometry(0.1, 32, 32);
    let baseGlobe = new THREE.Mesh(geomBase, materialGrey);
    baseGlobe.position.set(-7.5, 0.25, 8.5)
    globe.add(baseGlobe);

    // Create the conect
    let geomBase2 = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 32);
    base2 = new THREE.Mesh(geomBase2, materialGrey);
    base2.position.set(-7.5, 0.3, 8.5)
    base2.rotation.y = Math.PI / 2
    globe.add(base2);

    // Create the Globe
    earth = new THREE.Mesh(geomEarth, materialEarth);
    earth.position.set(-7.5, 0.55, 8.5)
    earth.rotation.y = Math.PI / 2
    globe.add(earth);



    console.log("Plane created")
    scene.add(globe);

    /*****************************
    * SHADOWS 
    ****************************/
    // globe meshes must cast and receive shadows
    globe.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
}


function createBilliardroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor4 = new THREE.BoxGeometry(5.5, 0.2, 4);

    //TEXTURES
    let textFloor4 = new THREE.TextureLoader().load('./textures/floor4.jpg');
    let normalFloor4 = new THREE.TextureLoader().load('./textures/floor4_normal.jpg');

    //Material
    let matFloor4 = new THREE.MeshPhongMaterial({ color: 0xA57301 });
    matFloor4.map = textFloor4;
    matFloor4.normalMap = normalFloor4;

    // //Mesh
    let floor4 = new THREE.Mesh(geomFloor4, matFloor4);
    floor4.position.set(-6.5, 0, -0.5);
    scene.add(floor4);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(5.5, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(5.5, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 1.7);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 1.7);
    let geomDoor = new THREE.BoxGeometry(0.1, 1.2, 0.7);

    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Billiardroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-6.5, 0.6, -2.5);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-6.5, 0.6, 1.5);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-3.7, 0.6, 0.7);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-3.7, 0.6, -1.7);
    scene.add(wall4);

    //Doors Billiardroom
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-3.7, 0.6, -0.5);
    scene.add(door1);
}

//Bolas mesa de bilhar
function createBalls() {
    //GEOMETRY
    let geomBall = new THREE.SphereGeometry(0.03, 32, 32);

    //MESH
    let matRed = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    let matYellow = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    let matGreen = new THREE.MeshPhongMaterial({ color: 0x31A336 });
    let matBlue = new THREE.MeshPhongMaterial({ color: 0x332CF0 });
    let matPurple = new THREE.MeshPhongMaterial({ color: 0x50126B });
    let matOrange = new THREE.MeshPhongMaterial({ color: 0xF7640B });
    let matDarkPink = new THREE.MeshPhongMaterial({ color: 0x50126B });
    let matWhite = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    let matBlack = new THREE.MeshPhongMaterial({ color: 0x000000 });

    //BALLS
    let ball1 = new THREE.Mesh(geomBall, matRed);
    ball1.position.set(-6.3, 0.65, -0.5);

    let ball2 = new THREE.Mesh(geomBall, matYellow);
    ball2.position.set(-6.3, 0.65, -0.56);

    let ball3 = new THREE.Mesh(geomBall, matGreen);
    ball3.position.set(-6.3, 0.65, -0.44);

    let ball4 = new THREE.Mesh(geomBall, matRed);
    ball4.position.set(-6.3, 0.65, -0.62);

    let ball5 = new THREE.Mesh(geomBall, matBlue);
    ball5.position.set(-6.3, 0.65, -0.38);

    let ball6 = new THREE.Mesh(geomBall, matBlue);
    ball6.position.set(-6.35, 0.65, -0.59);

    let ball7 = new THREE.Mesh(geomBall, matGreen);
    ball7.position.set(-6.35, 0.65, -0.53);

    let ball8 = new THREE.Mesh(geomBall, matPurple);
    ball8.position.set(-6.35, 0.65, -0.47);

    let ball9 = new THREE.Mesh(geomBall, matYellow);
    ball9.position.set(-6.35, 0.65, -0.41);

    let ball10 = new THREE.Mesh(geomBall, matOrange);
    ball10.position.set(-6.40, 0.65, -0.56);

    let ball11 = new THREE.Mesh(geomBall, matBlack);
    ball11.position.set(-6.40, 0.65, -0.50);

    let ball12 = new THREE.Mesh(geomBall, matDarkPink);
    ball12.position.set(-6.40, 0.65, -0.44);

    scene.add(ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12);
    spheres.push(ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12);

    // "invisible" helper plane
    plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 1, 10, 10), new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.0,
        transparent: true,
        visible: true,
        side: THREE.DoubleSide
    }));
    // a) auxiliary plane must be placed horizontally
    plane.rotation.x = -Math.PI / 2
    plane.position.set(-6.5, 0.65, -0.5)
    //comment the above two lines for exercises b) and c)
    scene.add(plane);
}

function createBedroom() {
    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor5 = new THREE.BoxGeometry(5, 0.2, 4);

    //TEXTURES
    let normalFloor5 = new THREE.TextureLoader().load('./textures/floor5_normal.jpg');

    //Material Floor
    let matFloor5 = new THREE.MeshPhongMaterial({ color: 0x346a9f });
    matFloor5.normalMap = normalFloor5;

    //Mesh
    let floor5 = new THREE.Mesh(geomFloor5, matFloor5);
    floor5.position.set(-6.9, 0, -7);
    scene.add(floor5);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(2.91, 1.2, 0.1);
    let geomWall1_2 = new THREE.BoxGeometry(1.395, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(0.1, 1.2, 4);
    let geomDoor = new THREE.BoxGeometry(0.7, 1.2, 0.1);

    //TEXTURE
    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Bedroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    let wall1_2 = new THREE.Mesh(geomWall1_2, matWall);
    wall1.position.set(-7.9, 0.6, -5);
    wall1_2.position.set(-5.047, 0.6, -5);
    scene.add(wall1, wall1_2);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-4.4, 0.6, -7);
    scene.add(wall2);

    //Doors Bedroom
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-6.09, 0.6, -5);
    scene.add(door1);

    /* ----------------------------- DADO ----------------------------- */

    //TEXTURES
    let lado1 = new THREE.TextureLoader().load('./textures/lado1.jpg');
    let lado2 = new THREE.TextureLoader().load('./textures/lado2.jpg');
    let lado3 = new THREE.TextureLoader().load('./textures/lado3.jpg');
    let lado4 = new THREE.TextureLoader().load('./textures/lado4.jpg');
    let lado5 = new THREE.TextureLoader().load('./textures/lado5.jpg');
    let lado6 = new THREE.TextureLoader().load('./textures/lado6.jpg');

    let matArray = [];
    matArray.push(new THREE.MeshBasicMaterial({ map: lado1 }));
    matArray.push(new THREE.MeshBasicMaterial({ map: lado2 }));
    matArray.push(new THREE.MeshBasicMaterial({ map: lado3 }));
    matArray.push(new THREE.MeshBasicMaterial({ map: lado4 }));
    matArray.push(new THREE.MeshBasicMaterial({ map: lado5 }));
    matArray.push(new THREE.MeshBasicMaterial({ map: lado6 }));

    let geomCube = new THREE.BoxGeometry(0.25, 0.25, 0.25);

    dice = new THREE.Mesh(geomCube, matArray);

    dice.position.set(-8, 0.8, -6.8);
    scene.add(dice)

    dices.push(dice)

    controls = new THREE.DragControls(dices, camera, renderer.domElement);

    controls.addEventListener('dragstart', function (event) {
        dragDice = true
    });

    controls.addEventListener('dragend', function (event) {
        dragDice = false
    });

}

function createHall() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor6 = new THREE.BoxGeometry(4.5, 0.2, 5);

    //TEXTURES
    let textFloor6 = new THREE.TextureLoader().load('./textures/floor6.jpg');
    let normalFloor6 = new THREE.TextureLoader().load('./textures/floor6_normal.jpg');

    //Material
    let matFloor6 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matFloor6.map = textFloor6;
    matFloor6.normalMap = normalFloor6;

    //Mesh
    let floor6 = new THREE.Mesh(geomFloor6, matFloor6);
    floor6.position.set(0.2, 0, -6.5);
    scene.add(floor6);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall2 = new THREE.BoxGeometry(1.5, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 5.15);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 5.15);
    let geomDoor = new THREE.BoxGeometry(1.5, 1.2, 0.1);

    // //TEXTURES
    // // let textWall = new THREE.TextureLoader().load('./textures/wall3.jpg');
    // // let normalWall = new THREE.TextureLoader().load('./textures/wall3_normal.jpg');


    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // // matWall.map = textWall;
    // // matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Hall

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    let wall2_2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(1.7, 0.6, -4);
    wall2_2.position.set(-1.3, 0.6, -4);
    scene.add(wall2, wall2_2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(2.5, 0.6, -6.52);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-2, 0.6, -6.52);
    scene.add(wall4);

    //Doors Hall
    let door = new THREE.Mesh(geomDoor, matDoor);
    door.position.set(0.2, 0.6, -9.05);
    scene.add(door);
}

//Fogueira
function createFire() {

    // //TEXTURES
    // let textFire = new THREE.TextureLoader().load('./textures/fire.png');

    // let matFire = new THREE.MeshBasicMaterial({ color: 0xffa500, wireframe: true })
    // matFire.map = textFire;

    // let geomBall = new THREE.SphereGeometry(0.03, 32, 32);

    // //MESH
    // let ball, pos = -66.3

    // for (let i = 0; i < 10; i++) {
    //     pos += 0.5
    //     ball = new THREE.Mesh(geomBall, matFire);
    //     ball.position.set(pos*0.1, 0.65, 7);
    //     scene.add(ball)
    //     fireBalls.push(ball)
    // }

}

function createLivingroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor7 = new THREE.BoxGeometry(5.7, 0.2, 4.8);

    //TEXTURES
    let textFloor7 = new THREE.TextureLoader().load('./textures/floor7.jpg');
    let normalFloor7 = new THREE.TextureLoader().load('./textures/floor7_normal.jpg');

    //Material
    let matFloor7 = new THREE.MeshPhongMaterial({ color: 0xA57301 });
    matFloor7.map = textFloor7;
    matFloor7.normalMap = normalFloor7;

    //Mesh
    let floor7 = new THREE.Mesh(geomFloor7, matFloor7);
    floor7.position.set(7, 0, -6.7);
    scene.add(floor7);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall2 = new THREE.BoxGeometry(3.5, 1.2, 0.1);
    let geomWall2_2 = new THREE.BoxGeometry(1.395, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 4.6);
    let geomDoor2 = new THREE.BoxGeometry(0.7, 1.2, 0.1);

    //Material Lounge
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });


    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Lounge
    let wall2 = new THREE.Mesh(geomWall2, matWall);
    let wall2_2 = new THREE.Mesh(geomWall2_2, matWall);
    wall2.position.set(7.9, 0.6, -4.25);
    wall2_2.position.set(4.75, 0.6, -4.25);
    scene.add(wall2, wall2_2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(4.1, 0.6, -6.6);
    scene.add(wall3);

    //Doors Lounge
    let door2 = new THREE.Mesh(geomDoor2, matDoor);
    door2.position.set(5.8, 0.6, -4.25);
    scene.add(door2);

    function createTv() {
        //GEOMETRY
        let geomScreen = new THREE.BoxGeometry(1, .73, .1);
        let geomScreenOn = new THREE.BoxGeometry(.9, .6, .001);
        let geomButtonOff = new THREE.SphereGeometry(0.02, 32, 32);
        let geomButtonOn = new THREE.SphereGeometry(0.02, 32, 32);


        //Material Lounge
        let matScreen = new THREE.MeshPhongMaterial({ color: 0x000000 });
        let matScreenOn = new THREE.MeshPhongMaterial({ color: 0xffffff });
        matScreenOn.map = new THREE.TextureLoader().load('./images/imgTv.jpg');
        let matButtonOff = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        let matButtonOn = new THREE.MeshPhongMaterial({ color: 0x008000 });

        let tvScreen = new THREE.Mesh(geomScreen, matScreen);
        tvScreen.position.set(7.3, 0.9, -4.4);
        tvScreenOn = new THREE.Mesh(geomScreenOn, matScreenOn);
        tvScreenOn.position.set(7.3, 0.93, -4.3);
        buttonOff = new THREE.Mesh(geomButtonOff, matButtonOff);
        buttonOff.position.set(7.7, 0.6, -4.5);
        buttonOn = new THREE.Mesh(geomButtonOn, matButtonOn);
        buttonOn.position.set(7.7, 0.6, -4.4);


        scene.add(tvScreen, tvScreenOn, buttonOff, buttonOn)
    }

    createTv();
}

function createDiningroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor8 = new THREE.BoxGeometry(5.8, 0.2, 5);

    //Material
    let matFloor8 = new THREE.MeshPhongMaterial({ color: 0xd7ae85 });
    //Mesh
    let floor8 = new THREE.Mesh(geomFloor8, matFloor8);
    floor8.position.set(6.9, 0, 0);
    scene.add(floor8);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(4, 0.3, 0.1);
    let geomWall2 = new THREE.BoxGeometry(5.8, 1.2, 0.1);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 3.5);

    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Diningroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(7.8, 0.2, 2.5);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(6.9, 0.6, -2.5);
    scene.add(wall2);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(3.95, 0.6, -0.8);
    scene.add(wall4);
}

function createChairs() {
    let geomChair = new THREE.BoxGeometry(0.8, 2.1, 1.3);
    const matChair = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        opacity: 0.0,
        transparent: true,
    });

    chair = new THREE.Mesh(geomChair, matChair);
    chair.position.set(6.5, 0, 1)
    scene.add(chair)

    chair2 = new THREE.Mesh(geomChair, matChair);
    chair2.position.set(8.4, 0, -0.2)
    scene.add(chair2)

    controls = new THREE.DragControls(chairs, camera, renderer.domElement);

    controls.addEventListener('dragstart', function (event) {

    });

    controls.addEventListener('dragend', function (event) {

    });
}

function createStairs() {

    let geomStair = new THREE.BoxGeometry(1.7, 0.5, 0.5);

    let geomFloor = new THREE.BoxGeometry(1.72, 0.5, 1);
    let geomFloor2 = new THREE.BoxGeometry(1.8, 0.5, 1);

    let geomWall = new THREE.BoxGeometry(2, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(0.1, 1.2, 3);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 3);

    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(0.3, -0.6, 0);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(1.15, -0.6, -1.5);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-0.7, -0.6, -1.5);

    scene.add(wall1, wall2, wall3);

    // Stairs
    let matStair = new THREE.MeshPhongMaterial({ color: 0xa80f2e })

    let floor = new THREE.Mesh(geomFloor, matStair);
    floor.position.set(0.225, -0.2, -3.5);

    let stair1 = new THREE.Mesh(geomStair, matStair);
    stair1.position.set(0.225, -0.2, -3);

    let stair2 = new THREE.Mesh(geomStair, matStair);
    stair2.position.set(0.225, -0.45, -2.5);

    let stair3 = new THREE.Mesh(geomStair, matStair);
    stair3.position.set(0.225, -0.7, -2);

    let stair4 = new THREE.Mesh(geomStair, matStair);
    stair4.position.set(0.225, -0.95, -1.5);

    let stair5 = new THREE.Mesh(geomStair, matStair);
    stair5.position.set(0.225, -1.2, -1);

    let stair6 = new THREE.Mesh(geomFloor2, matStair);
    stair6.position.set(0.225, -1.45, -0.5);

    scene.add(floor, stair1, stair2, stair3, stair4, stair5, stair6);
}

function cluedoLetters() {

    let geomBack = new THREE.BoxGeometry(2.75, 2, 0);

    let matStair = new THREE.MeshPhongMaterial({ color: 0x000000 })

    let back = new THREE.Mesh(geomBack, matStair);
    back.position.set(0.35, 0, 1.1);
    back.rotation.set(-1, 0, 0);
    scene.add(back)

    const loader = new THREE.FontLoader();

    loader.load('fonts/Poppins Medium_Regular.json', function (font) {

        const letterC = new THREE.TextGeometry('CL    E', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.05,
        });

        const meshC = new THREE.Mesh(letterC, new THREE.MeshBasicMaterial({
            color: 'white',
            roughness: 0.5
        }))

        const letterU = new THREE.TextGeometry('U', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.05,
        });

        const meshU = new THREE.Mesh(letterU, new THREE.MeshBasicMaterial({
            color: 'red',
            roughness: 0.5,
            border: 'black'
        }))

        meshC.position.set(-1.25, 0.3, 1.1)
        meshC.rotation.set(-1, 0, 0)
        scene.add(meshC)

        meshU.position.set(0.25, 0.3, 1.1)
        meshU.rotation.set(-1, 0, 0)
        scene.add(meshU)
    });
}

function animate() {

    //Movimento Dado

    if (dice.position.x > -8 || dice.position.x < -8) {
        dice.position.x = -8
    }

    if (dice.position.z > -6.8 || dice.position.z < -6.8) {
        dice.position.z = -6.8
    }

    if (dice.position.y > 0.8 || dice.position.y < 0.8) {
        dice.position.y = 0.8
    }

    if (mouseXposition < -0.26 && dragDice == true) {
        dice.rotation.y -= 0.26
    }

    if (mouseXposition > -0.16 && dragDice == true) {
        dice.rotation.y += 0.4
    }

    if (mouseYposition > -0.07 && dragDice == true) {
        dice.rotation.z += 0.4
    }

    if (mouseYposition < -0.7 && dragDice == true) {
        dice.rotation.z -= 0.4
    }

    //Movimento Cadeiras

    //Chair 1

    if (chair.position.y < 0 || chair.position.y > 0) {
        chair.position.y = 0
    }

    if (chair.position.x < 6.5 || chair.position.x > 6.5) {
        chair.position.x = 6.5
    }

    if (chair.position.z < 0.32) {
        chair.position.z = 0.32
    }

    if (chair.position.z > 1.5) {
        chair.position.z = 1.5
    }

    //Chair 2

    if (chair2.position.y < 0 || chair2.position.y > 0) {
        chair2.position.y = 0
    }

    if (chair2.position.z < -0.2 || chair2.position.z > -0.2) {
        chair2.position.z = -0.2
    }

    if (chair2.position.x > 9.28) {
        chair2.position.x = 9.28
    }

    if (chair2.position.x < 7.74) {
        chair2.position.x = 7.74
    }

    //Movimento Ventoinha
    if (ladoEsq == true) {
        conect.rotation.y -= 0.02;
    }

    if (ladoEsq == false) {
        conect.rotation.y += 0.02;
    }

    if (conect.rotation.y > 3.9) {
        ladoEsq = true
        ladoDir = false
    }

    if (conect.rotation.y < 1.5) {
        ladoDir = true
        ladoEsq = false
    }

    //Movimento Globo
    earth.rotation.y += 0.01;

    // rotate de fan blade
    propeller.rotation.x += 0.3;

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {

        //console.log(intersects[0]);
        console.log(intersects[0].object.id);

        //Click Kitchen
        if (intersects[0].object.id == 24 && clicked == true) {
            console.log(intersects[0]);
            camera.position.set(7.2, 1, 5.7)
            camera.lookAt(10, 0, 10);
            clicked = false
        }
        //Click Ballroom
        if (intersects[0].object.id == 36 && clicked == true) {
            camera.position.set(0.2, 1.1, 4.7)
            camera.lookAt(0, 0, 10);
            clicked = false
        }

        //Click Piano
        if (intersects[0].object.id == 42 && clicked == true) {
            camera.position.set(1.4, 0.8, 6.7)
            camera.lookAt(2.9, -1, 10);
            clicked = false
        }

        //Click PianoKeyDO
        if (intersects[0].object.id == 43 && clicked == true) {
            let audio = new Audio('sounds/do.wav');
            audio.play();
            clicked = false
        }

        //Click PianoKeyRE
        if (intersects[0].object.id == 44 && clicked == true) {
            let audio = new Audio('sounds/re.wav');
            audio.play();
            clicked = false
        }

        //Click PianoKeyMI
        if (intersects[0].object.id == 45 && clicked == true) {
            let audio = new Audio('sounds/mi.wav');
            audio.play();
            clicked = false
        }

        //Click PianoKeyFA
        if (intersects[0].object.id == 46 && clicked == true) {
            let audio = new Audio('sounds/fa.wav');
            audio.play();
            clicked = false
        }

        //Click PianoKeySOL
        if (intersects[0].object.id == 47 && clicked == true) {
            let audio = new Audio('sounds/sol.wav');
            audio.play();
            clicked = false
        }
        //Click PianoKeyLA
        if (intersects[0].object.id == 48 && clicked == true) {
            let audio = new Audio('sounds/la.wav');
            audio.play();
            clicked = false
        }

        //Click Conservatory
        if (intersects[0].object.id == 49 && clicked == true) {
            camera.position.set(-6.85, 1, 5.7)
            camera.lookAt(-6.85, 1, 9);
            clicked = false
        }
        //Click Billiardroom
        if (intersects[0].object.id == 53 && clicked == true) {
            camera.position.set(-6.5, 1.8, -1)
            camera.lookAt(-6.5, -1, 0.5);
            clicked = false
        }
        //Click Hall
        if (intersects[0].object.id == 78 && clicked == true) {
            camera.position.set(0.2, 1.8, -5)
            camera.lookAt(0, 1, -7.9);
            clicked = false
        }

        //Click Bedroom
        if (intersects[0].object.id == 72 && clicked == true) {
            camera.position.set(-7.5, 1.1, -5.8)
            camera.lookAt(-8.5, 1, -7.9);
            clicked = false
        }

        //Click LivingRoom
        if (intersects[0].object.id == 84 && clicked == true) {
            camera.position.set(7, 1, -7.7)
            camera.lookAt(7, 1, 6.7);
            clicked = false
        }

        //Click TV - ON
        if (intersects[0].object.id == 94 && clicked == true) {
            tvScreenOn.position.set(7.3, 0.93, -4.5)
            buttonOff.position.set(7.7, 0.6, -4.4)
            buttonOn.position.set(7.7, 0.6, -4.5)
            clicked = false
        }
        //Click TV - OFF
        if (intersects[0].object.id == 95 && clicked == true) {
            tvScreenOn.position.set(7.3, 0.93, -4.3)
            buttonOff.position.set(7.7, 0.6, -4.5)
            buttonOn.position.set(7.7, 0.6, -4.4)
            clicked = false
        }

        //Click Diningroom
        if (intersects[0].object.id == 95 && clicked == true) {
            camera.position.set(6.9, 3, -1.5)
            camera.lookAt(6.8, 0.5, 0.5);
            clicked = false
        }
        clicked = false
    }

    if (key == 'Escape') {     //ESC key
        camera.position.set(0, 20, 20); // eye
        camera.lookAt(0, 0, 0);
        key = ''
        clicked = false
    }

    requestAnimationFrame(animate);

    // render
    renderer.render(scene, camera);
}

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    mouseXposition = mouse.x
    mouseYposition = mouse.y

    // create a raycaster and update the picking ray with the camera and current mouse position
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (selectedObject) {
        //drag an object around if we've already clicked on one
        let intersects = raycaster.intersectObject(plane);
        selectedObject.position.copy(intersects[0].point.sub(offset));
    }

}

function onMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // create a raycaster and update the picking ray with the camera and current mouse position
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
        //disable the orbit controller (drag the object around and not rotate the scene)
        //assign the first intersected object to the selectedObject global variable
        selectedObject = intersects[0].object;

        // determine the offset between the point (in the plane) where we clicked and the center of the object
        let intersectsPlane = raycaster.intersectObject(plane);
        offset.copy(intersectsPlane[0].point).sub(selectedObject.position);
        //console.log("object selected ", selectedObject.position, offset)
    }
}

function onMouseUp(event) {
    selectedObject = null;
    clicked = true
}

window.onkeydown = function handleKeyDown(event) {
    key = event.key;
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);
