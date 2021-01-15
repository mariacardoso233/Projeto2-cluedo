let scene, camera, renderer
let controls

// 3D MODELS
let board

const textDoor = new THREE.TextureLoader().load('./textures/door.jpg');
const normalDoor = new THREE.TextureLoader().load('./textures/door_normal.jpg');

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene();
    createLights();

    createBoard();
    // createBorder();

    //Divisões do tabuleiro
    createKitchen();
    createBallroom();
    createConservatory();
    createBilliardroom();
    createLibrary();
    createStudy();
    createHall();
    createLounge();
    createDiningroom();

    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    animate();
}

function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    let axes = new THREE.AxesHelper(600);
    scene.add(axes);

    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

    // position the camera
    camera.position.set(0, 10, 10);
    camera.lookAt(scene.position);


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
    renderer.setClearColor("#e4e0ba");

    // renderer.shadowMap.enabled = true;
    // add the output of the renderer to the DIV with id "world"
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    //Controls
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });
}

function createLights() {
    let light = new THREE.DirectionalLight();

    light.position.set(0, 9, 2)
    scene.add(light);
}

function createBoard() {

    /* ----------------------------- BOARD ----------------------------- */
    //GEOMETRY
    let geomBoard = new THREE.BoxGeometry(20, 0.1, 20);

    //TEXTURES
    let textBoard = new THREE.TextureLoader().load('./textures/board.jpeg');
    let normalBoard = new THREE.TextureLoader().load('./textures/board_normal.jpg');

    //Material Board
    let matBoard = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matBoard.map = textBoard;
    matBoard.normalMap = normalBoard;

    //Mesh Board
    let board = new THREE.Mesh(geomBoard, matBoard);
    board.position.set(0, 0, 0);
    scene.add(board);

}


function createBorder() {

    //GEOMETRY
    let geomBorder1 = new THREE.BoxGeometry(24, 6, 0.1);
    let geomBorder2 = new THREE.BoxGeometry(24, 6, 0.1);
    let geomBorder3 = new THREE.BoxGeometry(0.1, 6, 24);
    let geomBorder4 = new THREE.BoxGeometry(0.1, 6, 24);

    //Material Board
    let matBoard = new THREE.MeshPhongMaterial({ color: 0xf0e0d0 });

    //Border positions
    let border1 = new THREE.Mesh(geomBorder1, matBoard);
    border1.position.set(0, 3, 12);
    let border2 = new THREE.Mesh(geomBorder2, matBoard);
    border2.position.set(0, 3, -12);
    let border3 = new THREE.Mesh(geomBorder3, matBoard);
    border3.position.set(-12, 3, 0);
    let border4 = new THREE.Mesh(geomBorder4, matBoard);
    border4.position.set(12, 3, 0);

    scene.add(border1, border2, border3, border4);

}


function createKitchen() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor1 = new THREE.BoxGeometry(4.9, 0.1, 4.9);

    //TEXTURES
    let textFloor1 = new THREE.TextureLoader().load('./textures/floor.jpg');
    let normalFloor1 = new THREE.TextureLoader().load('./textures/floor_normal.jpg');

    //Material floor
    let matFloor1 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matFloor1.map = textFloor1;
    matFloor1.normalMap = normalFloor1;

    //Mesh floor
    let floor1 = new THREE.Mesh(geomFloor1, matFloor1);
    floor1.position.set(7.2, 0.1, 6.7);
    scene.add(floor1);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(5, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(3, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 5.1);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 3);
    //let geomDoor = new THREE.BoxGeometry(0.1, 1, 1);
    //let geomDoor2 = new THREE.BoxGeometry(0.75, 1.2, 0.1);

    //Mobilia
    let geomBalcao = new THREE.BoxGeometry(2, 0.3, 0.3);

    //Mobilia
    let geomTable = new THREE.BoxGeometry(2, 0.1, 1.3);

    // //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    // //Material Wall
    let matTable = new THREE.MeshPhongMaterial({ color: 0xa06a34 });

    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

    // //WallsKitchen
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(7.2, 0.6, 9.2);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(8.25, 0.6, 4.2);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(9.7, 0.6, 6.7);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(4.72, 0.6, 7.75);
    scene.add(wall4);

    let balcao = new THREE.Mesh(geomBalcao, matWall);
    balcao.position.set(7.2, 0.3, 9);
    scene.add(balcao);

    let table = new THREE.Mesh(geomTable, matTable);
    table.position.set(7.2, 0.3, 6.7);
    scene.add(table);

    //DoorsKitchen
    //let door1 = new THREE.Mesh(geomDoor, matDoor);
    //let door2 = new THREE.Mesh(geomDoor2, matDoor);
    // door1.position.set(4.5, 2.4, 5);
    //door2.position.set(5.18, 0.6, 4.3);
    //scene.add(door2);

    /*
    let geomWall = new THREE.BoxGeometry(5, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(4.2, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 4.9);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 5);*/
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

    // // //TEXTURES
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
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(0.25, 0.6, 9.1);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    let wall2_2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-1.8,0.6, 3.5);
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
    let geomFloor3 = new THREE.BoxGeometry(4.5, 0.2, 4.5);

    // //TEXTURES
    // //Material
    let matFloor3 = new THREE.MeshPhongMaterial({ color: 0xb2b2ff });

    // //Mesh
    let floor3 = new THREE.Mesh(geomFloor3, matFloor3);
    floor3.position.set(-6.7, 0, 6.7);
    scene.add(floor3);

    // /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(4.5, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(4.5, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 4.65);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 2);
    let geomDoor = new THREE.BoxGeometry(0.1, 1.2, 1.1);
    let geomDoor2 = new THREE.BoxGeometry(1, 1.2, 0.1);

    // // //TEXTURES
    // let textWall = new THREE.TextureLoader().load('./textures/wall3.jpg');
    // let normalWall = new THREE.TextureLoader().load('./textures/wall3_normal.jpg');

     //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // matWall.map = textWall;
    // matWall.normalMap = normalWall;

    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

    //Walls Conservatory
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-6.7, 0.6, 9);
    scene.add(wall1);

    // let wall2 = new THREE.Mesh(geomWall2, matWall);
    // wall2.position.set(-6.7, 0.6, 4.4);
    // scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-9, 0.6, 6.73);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-4.4, 0.6, 8.05);
    scene.add(wall4);

    // // //Doors Conservatory
    // let door1 = new THREE.Mesh(geomDoor, matDoor);
    // let door2 = new THREE.Mesh(geomDoor2, matDoor);
    // door1.position.set(-4.5, 2.4, 5.2);
    // door2.position.set(-5, 2.4, 4.7);
    // scene.add(door1, door2);
}

function createBilliardroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor4 = new THREE.BoxGeometry(5, 0.2, 3.5);

    // //TEXTURES
    // //Material
    let matFloor4 = new THREE.MeshPhongMaterial({ color: 0xA57301 });

    // //Mesh
    let floor4 = new THREE.Mesh(geomFloor4, matFloor4);
    floor4.position.set(-6.5, 0, 1.5);
    scene.add(floor4);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    /*let geomWall = new THREE.BoxGeometry(5, 5, 0.1);
    let geomWall2 = new THREE.BoxGeometry(5, 5, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 5, 3.5);
    let geomWall4 = new THREE.BoxGeometry(0.1, 5, 1.5);
    let geomDoor = new THREE.BoxGeometry(0.1, 5, 2.2);

    //TEXTURES
    let textWall = new THREE.TextureLoader().load('./textures/wall.jpg');
    let normalWall = new THREE.TextureLoader().load('./textures/wall_normal.jpg');

    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    matWall.map = textWall;
    matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Billiardroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-6.5, 2.4, -0.3);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-6.5, 2.4, 3.3);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-9, 2.4, 1.5);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-4, 2.4, 0.4);
    scene.add(wall4);

    //Doors Billiardroom
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-4, 2.4, 2.2);
    scene.add(door1);*/
}

function createLibrary() {
    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor5 = new THREE.BoxGeometry(5, 0.2, 3.5);

    // //TEXTURES
    // //Material
    let matFloor5 = new THREE.MeshPhongMaterial({ color: 0xC6A865 });

    // //Mesh
    let floor5 = new THREE.Mesh(geomFloor5, matFloor5);
    floor5.position.set(-6, 0, -3);
    scene.add(floor5);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    /*let geomWall = new THREE.BoxGeometry(5, 5, 0.1);
    let geomWall2 = new THREE.BoxGeometry(5, 5, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 5, 3.5);
    let geomWall4 = new THREE.BoxGeometry(0.1, 5, 1.5);
    let geomDoor = new THREE.BoxGeometry(0.1, 5, 2);

    // //TEXTURES
    // let textWall = new THREE.TextureLoader().load('./textures/wall.jpg');
    // let normalWall = new THREE.TextureLoader().load('./textures/wall_normal.jpg');
    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xDAF7A6 });
    // matWall.map = textWall;
    // matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Library
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-6, 2.4, -1.3);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-6, 2.4, -4.8);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-8.5, 2.4, -3);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-3.5, 2.4, -4);
    scene.add(wall4);

    //Doors Library
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-3.5, 2.4, -2.3);
    scene.add(door1);*/
}

function createStudy() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor6 = new THREE.BoxGeometry(4.7, 0.2, 3.3);

    // //TEXTURES
    // //Material
    let matFloor6 = new THREE.MeshPhongMaterial({ color: 0x65B99B });

    // //Mesh
    let floor6 = new THREE.Mesh(geomFloor6, matFloor6);
    floor6.position.set(-6.5, 0, -7.6);
    scene.add(floor6);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    /*let geomWall = new THREE.BoxGeometry(4.9, 5, 0.1);
    let geomWall2 = new THREE.BoxGeometry(4.8, 5, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 5, 3.3);
    let geomWall4 = new THREE.BoxGeometry(0.1, 5, 1);
    let geomDoor = new THREE.BoxGeometry(0.1, 5, 1.4);

    //TEXTURES
    // let textWall = new THREE.TextureLoader().load('./textures/wall.jpg');
    // let normalWall = new THREE.TextureLoader().load('./textures/wall_normal.jpg');

    // Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0x81B965 });
    // matWall.map = textWall;
    // matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Study
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(-6.5, 2.4, -6);
    scene.add(wall1);

    let wall2 = new THREE.Mesh(geomWall2, matWall);
    wall2.position.set(-6.5, 2.4, -9.3);
    scene.add(wall2);

    let wall3 = new THREE.Mesh(geomWall3, matWall);
    wall3.position.set(-8.9, 2.4, -7.7);
    scene.add(wall3);

    let wall4 = new THREE.Mesh(geomWall4, matWall);
    let wall4_2 = new THREE.Mesh(geomWall4, matWall);
    wall4.position.set(-4.1, 2.4, -8.8);
    wall4_2.position.set(-4.1, 2.4, -6.5);
    scene.add(wall4, wall4_2);

    //Doors Study
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-4.1, 2.4, -7.7);
    scene.add(door1);*/
}

function createHall() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor7 = new THREE.BoxGeometry(4.5, 0.2, 5);

    //TEXTURES
    //Material
    let matFloor7 = new THREE.MeshPhongMaterial({ color: 0x73503C });

    //Mesh
    let floor7 = new THREE.Mesh(geomFloor7, matFloor7);
    floor7.position.set(0.2, 0, -6.5);
    scene.add(floor7);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(1.5, 1.2, 0.1);
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
    let wall1 = new THREE.Mesh(geomWall, matWall);
    let wall1_1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(1.7, 0.6, -9.05);
    wall1_1.position.set(-1.3, 0.6, -9.05);
    scene.add(wall1, wall1_1);

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

function createLounge() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor8 = new THREE.BoxGeometry(5, 0.2, 5.5);

    //TEXTURES
    //Material
    let matFloor8 = new THREE.MeshPhongMaterial({ color: 0x900C3F });

    //Mesh
    let floor8 = new THREE.Mesh(geomFloor8, matFloor8);
    floor8.position.set(7, 0, -6.7);
    scene.add(floor8);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    // let geomWall = new THREE.BoxGeometry(5.1, 5, 0.1);
    // let geomWall2 = new THREE.BoxGeometry(3.5, 5, 0.1);
    // let geomWall3 = new THREE.BoxGeometry(0.1, 5, 3.5);
    // let geomWall4 = new THREE.BoxGeometry(0.1, 5, 5.5);
    // let geomDoor = new THREE.BoxGeometry(0.1, 5, 2);
    // let geomDoor2 = new THREE.BoxGeometry(1.5, 5, 0.1);

    // //TEXTURES
    // // let textWall = new THREE.TextureLoader().load('./textures/wall3.jpg');
    // // let normalWall = new THREE.TextureLoader().load('./textures/wall3_normal.jpg');


    // //Material Lounge
    // let matWall = new THREE.MeshPhongMaterial({ color: 0xD6D68B});
    // // matWall.map = textWall;
    // // matWall.normalMap = normalWall;

    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

    // //Walls Lounge
    // let wall1 = new THREE.Mesh(geomWall, matWall);
    // wall1.position.set(7, 2.4, -9.5);
    // scene.add(wall1);

    // let wall2 = new THREE.Mesh(geomWall2, matWall);
    // wall2.position.set(7.8, 2.4, -4);
    // scene.add(wall2);

    // let wall3 = new THREE.Mesh(geomWall3, matWall);
    // wall3.position.set(4.5, 2.4, -7.7);
    // scene.add(wall3);

    // let wall4 = new THREE.Mesh(geomWall4, matWall);
    // wall4.position.set(9.5, 2.4, -6.8);
    // scene.add(wall4);

    // //Doors Lounge
    // let door1 = new THREE.Mesh(geomDoor, matDoor);
    // let door2 = new THREE.Mesh(geomDoor2, matDoor);
    // door1.position.set(4.5, 2.4, -5);
    // door2.position.set(5.3, 2.4, -4);
    // scene.add(door1, door2);
}

function createDiningroom() {

    /* ----------------------------- FLOOR ----------------------------- */
    //GEOMETRY
    let geomFloor9 = new THREE.BoxGeometry(6.3, 0.2, 5);

    //TEXTURES
    //Material
    let matFloor9 = new THREE.MeshPhongMaterial({ color: 0xA57301 });

    //Mesh
    let floor9 = new THREE.Mesh(geomFloor9, matFloor9);
    floor9.position.set(6.5, 0, 0);
    scene.add(floor9);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    // let geomWall = new THREE.BoxGeometry(6.4, 5, 0.1);
    // let geomWall2 = new THREE.BoxGeometry(6.4, 5, 0.1);
    // let geomWall3 = new THREE.BoxGeometry(0.1, 5, 5);
    // let geomWall4 = new THREE.BoxGeometry(0.1, 5, 3);
    // let geomDoor = new THREE.BoxGeometry(0.1, 5, 2.2);

    // // //TEXTURES
    // // let textWall = new THREE.TextureLoader().load('./textures/wall.jpg');
    // // let normalWall = new THREE.TextureLoader().load('./textures/wall_normal.jpg');

    // //Material Wall
    // let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // // matWall.map = textWall;
    // // matWall.normalMap = normalWall;

    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

    // //Walls Diningroom
    // let wall1 = new THREE.Mesh(geomWall, matWall);
    // wall1.position.set(6.5, 2.4, 2.5);
    // scene.add(wall1);

    // let wall2 = new THREE.Mesh(geomWall2, matWall);
    // wall2.position.set(6.5, 2.4, -2.5);
    // scene.add(wall2);

    // let wall3 = new THREE.Mesh(geomWall3, matWall);
    // wall3.position.set(9.7, 2.4, 0);
    // scene.add(wall3);

    // let wall4 = new THREE.Mesh(geomWall4, matWall);
    // wall4.position.set(3.3, 2.4, -1);
    // scene.add(wall4);

    // //Doors Diningroom
    // let door1 = new THREE.Mesh(geomDoor, matDoor);
    // door1.position.set(3.3, 2.4, 1.4);
    // scene.add(door1);
}


function animate() {

    // render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}