let scene, camera, renderer
let controls, mesh

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
    createBedroom();
    createHall();
    createLivingroom();
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
            mesh.position.set(0.69, 0, 0)
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
            mesh.position.set(-0.15, 0, 0)
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
            mesh.position.set(-0.99, 0, 0)
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
            mesh.position.set(-1.35, 0, -0.5)
            mesh.rotation.set(0, 1.6, 0)
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
            mesh.position.set(-1.35, 0, -0.5)
            mesh.rotation.set(0, 1.6, 0)
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
    let geomWall2 = new THREE.BoxGeometry(3, 1.2, 0.1);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 3);
    //let geomDoor = new THREE.BoxGeometry(0.1, 1, 1);
    //let geomDoor2 = new THREE.BoxGeometry(0.75, 1.2, 0.1);

    //Mobilia
    let geomBalcao = new THREE.BoxGeometry(2, 0.3, 0.3);

    //Mobilia
    let geomTable = new THREE.BoxGeometry(2, 0.1, 1.3);

    // //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    // let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    // matDoor.map = textDoor;
    // matDoor.normalMap = normalDoor;

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
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 1.1);
    let geomDoor = new THREE.BoxGeometry(0.1, 1.2, 1.3);

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
    wall4.position.set(-3.7, 0.6, -2);
    scene.add(wall4);

    //Doors Billiardroom
    let door1 = new THREE.Mesh(geomDoor, matDoor);
    door1.position.set(-3.7, 0.6, -0.8);
    scene.add(door1);

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


        scene.add(ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9);
    }

    createBalls();

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
    let geomFloor8 = new THREE.BoxGeometry(6.3, 0.2, 5);

    // //TEXTURES

    //Material
    let matFloor8 = new THREE.MeshPhongMaterial({ color: 0xd7ae85 });
    //Mesh
    let floor8 = new THREE.Mesh(geomFloor8, matFloor8);
    floor8.position.set(6.5, 0, 0);
    scene.add(floor8);

    /* ----------------------------- WALL ----------------------------- */
    //GEOMETRY
    let geomWall = new THREE.BoxGeometry(5, 1.2, 0.1);
    let geomWall2 = new THREE.BoxGeometry(6.4, 1.2, 0.1);
    let geomWall3 = new THREE.BoxGeometry(0.1, 1.2, 5);
    let geomWall4 = new THREE.BoxGeometry(0.1, 1.2, 3);
    let geomDoor = new THREE.BoxGeometry(0.1, 1.2, 2.2);

    // //TEXTURES
    // let textWall = new THREE.TextureLoader().load('./textures/wall.jpg');
    // let normalWall = new THREE.TextureLoader().load('./textures/wall_normal.jpg');

    //Material Wall
    let matWall = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // matWall.map = textWall;
    // matWall.normalMap = normalWall;

    let matDoor = new THREE.MeshPhongMaterial({ color: 0xa06a34 });
    matDoor.map = textDoor;
    matDoor.normalMap = normalDoor;

    //Walls Diningroom
    let wall1 = new THREE.Mesh(geomWall, matWall);
    wall1.position.set(7.25, 0.6, 2.5);
    scene.add(wall1);

    // let wall2 = new THREE.Mesh(geomWall2, matWall);
    // wall2.position.set(6.5, 0.6, -2.5);
    // scene.add(wall2);

    // let wall4 = new THREE.Mesh(geomWall4, matWall);
    // wall4.position.set(3.3, 0.6, -1);
    // scene.add(wall4);

    // //Doors Diningroom
    // let door1 = new THREE.Mesh(geomDoor, matDoor);
    // door1.position.set(3.3, 0.6, 1.4);
    // scene.add(door1);
}



function animate() {

    requestAnimationFrame(animate);

    // render
    renderer.render(scene, camera);

    /********************************************
     * MOVIMENTO DA VISÃO COM AS TECLAS "WASD"
     *********************************************/
    if (keyboard[87]) {     //W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[83]) {     //S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) {     //A key
        camera.rotation.y -= Math.PI * 0.01
    }
    if (keyboard[68]) {     //D key
        camera.rotation.y += Math.PI * 0.01
    }
}
function keyDown(e) {
    keyboard[e.keyCode] = true;
}

function keyUp(e) {
    keyboard[e.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp)