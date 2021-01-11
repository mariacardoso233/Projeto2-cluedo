let scene, camera, renderer
let controls

// 3D MODELS
let board

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene();
    createLights();

    createBoard();
    createDices();

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
    camera.position.set(0, 17, 25);
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

    light.position.set(0, 3, 2)
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

// function DicePressed(e) {
// }

function createDices() {
    /* ----------------------------- DICE ----------------------------- */
    let geomDice = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let matDice = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let dice = new THREE.Mesh(geomDice, matDice);
    dice.position.set(2.5, 0.3, 1.5);

    let geomDice2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let matDice2 = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });

    let dice2 = new THREE.Mesh(geomDice2, matDice2);
    dice2.position.set(1.7, 0.3, 2);

    scene.add(dice, dice2);


    //Evento dado
    // window.addEventListener('click', DicePressed);
}

function animate() {

    // render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}