let scene, camera, renderer
let controls, mesh, key
let clicked = false

let floor1

let spheres = []
let selectedObject, plane, offset

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 3D MODELS
let board

//Keys
let keyboard = {};

let player = { height: 1, speed: 0.1 }

const textDoor = new THREE.TextureLoader().load('./textures/door.jpg');
const normalDoor = new THREE.TextureLoader().load('./textures/door_normal.jpg');

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
    createBallroom();
    createConservatory();

    createBilliardroom();
    createBalls();

    createBedroom();
    createHall();
    createLivingroom();
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

    let axes = new THREE.AxesHelper(600);
    scene.add(axes);

    /**********************
     * CAMERA PARA MOVIMENTOS 
     ***********************/
    // // create a camera, which defines where we're looking at
    // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);

    // // position the camera
    // camera.position.set(0, player.height, -1);
    // camera.lookAt(new THREE.Vector3(0, player.height, 0));


    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    //set the camera's view transformation
    camera.position.set(0, 20, 20); // eye
    camera.lookAt(0, 0, 0);


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
    renderer.setClearColor("#e4e0ba");

    // renderer.shadowMap.enabled = true;
    // add the output of the renderer to the DIV with id "world"
    document.getElementById('canvas-container').appendChild(renderer.domElement);


    let controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    /**********************
     * OBJETOS 
     ***********************/
    // LOAD THE MESH
    let loader = new THREE.GLTFLoader().setPath('models/GLTF/');

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

        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.6, 0.6, 0.6);
            mesh.position.set(-1.2, 0, -7.5)
            mesh.rotation.set(0, 2, 0)
            scene.add(mesh);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
            console.log(err);
        });

    loader.load('piano.glb',

        // called when the resource is loaded
        function (gltf) {
            //console.log('model loaded: ' + gltf.scene.children.length + ' scene children meshes');
            console.log(gltf)
            mesh = gltf.scene;
            mesh.scale.set(0.1, 0.1, 0.1);
            mesh.position.set(1.7, 0, 7.5)
            mesh.rotation.set(0, 2, 0)
            scene.add(mesh);
        },
        undefined, // called while loading is progressing
        function (err) { // called when loading has errors
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
            mesh.position.set(6.5, 0, 1)
            mesh.rotation.set(0, 1.55, 0)
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
            mesh.position.set(8.4, 0, -0.2)
            mesh.rotation.set(0, 3.1, 0)
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
            mesh.position.set(-9, 0.2, -8)
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
        mesh.scale.set(0.02, 0.04 , 0.05);
        mesh.position.set(-2.5, 0, 8)
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
        mesh.scale.set(0.02, 0.04 , 0.05);
        mesh.position.set(-2.5, 0, 7)
        mesh.rotation.set(0, 1.58, 0)
        scene.add(mesh);
    }, 
    undefined,
    function (err) {
        console.log(err);
    });
}

function createLights() {
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.1);
    light.position.set(0, 5, 0)
    scene.add(light);
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

    //GEOMETRY
    let geomBorder1 = new THREE.BoxGeometry(18.9, 1.5, 0.3);
    let geomBorder2 = new THREE.BoxGeometry(9, 1.5, 0.3);
    let geomBorder3 = new THREE.BoxGeometry(0.3, 1.5, 18.2);
    let geomBorder4 = new THREE.BoxGeometry(0.3, 1.5, 18.5);

    //Material Board
    let matBoard = new THREE.MeshPhongMaterial({ color: 0xf0e0d0 });

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

    scene.add(border1, border3, border4);

}

function createKitchen() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor1 = new THREE.BoxGeometry(4.9, 0.1, 4.9);

    //Material floor
    let matFloor1 = new THREE.MeshPhongMaterial({ color: 0xadadad });

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

function createConservatory() {

    /* ----------------------------- FLOOR ----------------------------- */
    // //GEOMETRY
    let geomFloor3 = new THREE.BoxGeometry(4.8, 0.2, 4.7);

    //TEXTURES
    //Material
    let matFloor3 = new THREE.MeshPhongMaterial({ color: 0xb2b2ff });

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

    // //TEXTURES

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
    let matBlue = new THREE.MeshPhongMaterial({color: 0x332CF0});
    let matPurple = new THREE.MeshPhongMaterial({color: 0x50126B});
    let matOrange = new THREE.MeshPhongMaterial({color: 0xF7640B});
    let matDarkPink = new THREE.MeshPhongMaterial({color: 0x50126B});
    let matWhite = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
    let matBlack = new THREE.MeshPhongMaterial({color: 0x000000});


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
    let geomWall = new THREE.BoxGeometry(4, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(0.1, 1.2, 3);
    // let geomDoor = new THREE.BoxGeometry(0.1, 5, 2);

    //TEXTURE
    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });


    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

    //Walls Bedroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-7.3, 0.6, -5);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-4.4, 0.6, -7.5);
    scene.add(wall2);

    // //Doors Bedroom
    // let door1 = new THREE.Mesh(geomDoor, matDoor);
    // door1.position.set(-3.5, 2.4, -2.3);
    // scene.add(door1);
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

    // //TEXTURES
    // // let textWall = new THREE.TextureLoader().load('./textures/wall3.jpg');
    // // let normalWall = new THREE.TextureLoader().load('./textures/wall3_normal.jpg');


    //Material Lounge
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // // matWall.map = textWall;
    // // matWall.normalMap = normalWall;

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

function createStairs(){

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

function animate() {
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children);

	for ( let i = 0; i < intersects.length; i ++ ) {

        // console.log(intersects[0]);
        // console.log(intersects[0].object.id);

        //Click Kitchen
        if (intersects[0].object.id == 22 && clicked == true) {
            console.log(intersects[0]);
            camera.position.set(7.2, 1.1, 4.7)
            camera.lookAt(7.2, 0, 10);
            clicked = false
        }
        //Click Ballroom
        if (intersects[0].object.id == 26 && clicked == true) {
            camera.position.set(0.2, 1.1, 4.7)
            camera.lookAt(0, 0, 10);
            clicked = false
        }
        //Click Conservatory
        if (intersects[0].object.id == 32 && clicked == true) {
            camera.position.set(-6.85, 1, 5.7)
            camera.lookAt(-6.85, 1, 9);
            clicked = false
        }
        //Click Billiardroom
        if (intersects[0].object.id == 35 && clicked == true) {
            camera.position.set(-6.5, 1.1, 0.8)
            camera.lookAt(-6.5, 1, 0);
            clicked = false
        }
        //Click Bedroom
        if (intersects[0].object.id == 53 && clicked == true) {
            camera.position.set(-5.5, 1.1, -5.8)
            camera.lookAt(-10.5, 1, -7.9);
            clicked = false
        }
        //Click LivingRoom
        if (intersects[0].object.id == 62 && clicked == true) {
            camera.position.set(7, 1, -4.7)
            camera.lookAt(7, 1, -6.7);
            clicked = false
        }
        //Click Diningroom
        if (intersects[0].object.id == 67 && clicked == true) {
            camera.position.set(6.9, 2, -1.5)
            camera.lookAt(6.8, 0.5, 0.5);
            clicked = false
        }
    }
    
    if (key == 'Escape') {     //ESC key
        camera.position.set(0, 20, 20); // eye
        camera.lookAt(0, 0, 0);
        key = ''
    }

    requestAnimationFrame(animate);

    // render
    renderer.render(scene, camera);
}

function cluedoLetters(){

    const loader = new THREE.FontLoader();

    loader.load( 'fonts/Poppins Medium_Regular.json', function ( font ) {

        const letterC = new THREE.TextGeometry( 'CL    E', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.05,
        } );

        const meshC = new THREE.Mesh(letterC, new THREE.MeshBasicMaterial({
            color: 'white',
            roughness: 0.5
        }))

        const letterU = new THREE.TextGeometry( 'U', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.05,
        } );

        const meshU = new THREE.Mesh(letterU, new THREE.MeshBasicMaterial({
            color: 'red',
            roughness: 0.5,
            border: 'black'
        }))

        meshC.position.set(-1.35, 0, 0.9)
        meshC.rotation.set(-1,0,0)
        scene.add(meshC)

        meshU.position.set(0.25, 0, 0.9)
        meshU.rotation.set(-1,0,0)
        scene.add(meshU)
    } );

    // invisible helper plane (big enough)
    // for example, aligned with the XY-plane (Z=0)
    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 1, 10, 10),
        new THREE.MeshBasicMaterial({
        opacity: 0.1,
        transparent: false,
        visible: true
        })
    );
    plane.position.set(-6.5, 0.65, -0.5)
    plane.rotation.set(-1.58, 0, 0)
    scene.add(plane);

    // const controls = new THREE.DragControls( spheres, camera, renderer.domElement );

    // // add event listener to highlight dragged objects

    // controls.addEventListener( 'dragstart', function ( event ) {

    // } );

    // controls.addEventListener( 'dragend', function ( event ) {

    // } );
}

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    clicked = true

    if (selectedObject) {
        // gets (again) the new ray intersection with the helper plane
        let intersects = raycaster.intersectObject(plane);
        // drag the intersect object around
        selectedObject.position.copy(intersects[0].point.sub(offset));
    }
}

function onMouseDown() {
    // check if ray intersects any of the objects’ array
    let intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
        // gets closest intersected object (must be a global variable)
        selectedObject = intersects[0].object;
        // gets ray intersection with the helper plane
        let intersectsPlane = raycaster.intersectObject(plane);
        // calculates the offset (also a global variable):
        // plane ray intersection – intersected object center
        offset.copy(intersectsPlane[0].point).sub(selectedObject.position);
    }
}

function onMouseUp(event) {
    // finish drag & drop
    selectedObject = null;
}

window.onkeydown = function handleKeyDown(event) {
    key = event.key;
}

window.addEventListener( 'click', onMouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false );
window.addEventListener( 'mouseup', onMouseUp, false );