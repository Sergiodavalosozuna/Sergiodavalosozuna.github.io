import * as THREE from 'three';


// Starting positons of the images from the top
const STARTY = 0;

//Create a new scene 
const scene = new THREE.Scene();
// create and position the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = STARTY;


camera.position.z = 30;
// Create list of images in the 'img' folder
let imgList = [
    'bgd.PNG',
    'dl.PNG',
    'yorkt.PNG',

]

// add every listed image as a plane mesh with texture to scene 
for (const image in imgList) {
    // every mesh has a gomentry, textur, and material
    console.log(image)
    const geometry = new THREE.PlaneGeometry(30, 20);
    const texture = new THREE.TextureLoader().load('img/' + imgList[image])
    const material = new THREE.MeshBasicMaterial({
        color: "",
        side: THREE.DoubleSide,
        map: texture //  add the texture image here
    });
    const plane = new THREE.Mesh(geometry, material);
    // Add the new plane to the scene 

    scene.add(plane);
}
const background = new THREE.TextureLoader().load('img/bk.jpg');
scene.background = background;

console.log(scene);

// Move the camera with the scroll bar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.1;
    console.log(top);
};

// add scrollbar event to move camera
document.body.onscroll = moveCamera;

// resize the threejs canvas with the window

// add adjust for phone sizes

function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //adjust for phone and desktop size
    if (window.innerWidth <= 600) {
        camera.position.x = 0;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 0
            scene.children[child].position.y = child * -50;
        }
    } else {
        camera.position.x = 15;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            scene.children[child].position.y = child * -30;
        }

    }


}
// resize canvase on window resize
window.addEventListener('resize', resizeWindow, false);


// create the renderer and attach to the canvas 
const renderer = new THREE.WebGLRenderer(
    { canvas: document.querySelector('#bg') }
);
// set initial canvas size 
resizeWindow();
// set renederer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// animation loop (calls itself recursively)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}//start the animation
animate();