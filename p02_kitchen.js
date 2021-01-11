let scene, camera, renderer
let controls

// 3D MODELS
let board

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene();
    createFloor();
    createLights();


    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    animate();
}

function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    let axes = new THREE.AxesHelper(600);
    scene.add(axes);

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 4000);
    //set the camera's view transformation
    camera.position.set(-50, 20, 1650); // eye
    camera.lookAt(0,0,0);                   // lookat


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
    renderer.setClearColor("#e4e0ba");

    // renderer.shadowMap.enabled = true;
    // add the output of the renderer to the DIV with id "world"
    document.getElementById('canvas-container').appendChild(renderer.domElement);
}

function createFloor() {
    
    // Create a plane (kitchen's floor)
    let geomFloor = new THREE.PlaneBufferGeometry(10000, 10000, 32, 32);

    //TEXTURES FLOOR
    let normalFloor = new THREE.TextureLoader().load('./textures/floor_normal.jpg');

    //Material Floor
    let matFloor = new THREE.MeshPhongMaterial({ color: 0xA9ADB0, side: THREE.DoubleSide });
    matFloor.normalMap = normalFloor;

    //Mesh Floor
    let floor = new THREE.Mesh(geomFloor, matFloor);
    floor.rotation.x = - Math.PI / 2;
    floor.position.y = -1;
    

    
    scene.add(floor);

    // /* ----------------------------- BOARD ----------------------------- */
    // //GEOMETRY
    // let geomBoard = new THREE.BoxGeometry(20, 0.1, 20);

    // //TEXTURES
    // let textBoard = new THREE.TextureLoader().load('./textures/board.jpeg');
    // let normalBoard = new THREE.TextureLoader().load('./textures/board_normal.jpg');

    // //Material Board
    // let matBoard = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // matBoard.map = textBoard;
    // matBoard.normalMap = normalBoard;

    // //Mesh Board
    // let board = new THREE.Mesh(geomBoard, matBoard);
    // board.position.set(0, 0, 0);
    // scene.add(board);

}

function createLights() {
    let light = new THREE.DirectionalLight();

    light.position.set(0, 3, 2)
    scene.add(light);
}



function animate() {

    // render
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}