import * as THREE from 'three';

// Starting position of the images from the top
const STARTY = -12;

// Create a new scene
const scene = new THREE.Scene();

// Create and position the camera
const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.3, 1000);
camera.position.y = STARTY;
camera.position.z = 30;

// Create list of images in the 'img' folder
let imgList = [
    'pp1.jpg',
    'Honor11.png',
    'honor22.png',
    'pa2.png',
    'mario.png',
    'flappybird.png',
    'Ace.png',
    'connect4.png'
];


// Add every listed image as a plane mesh with texture to scene
for (const image in imgList) {
    // Every mesh has a geometry, texture, and material
    // if else statement used if certain images require a different aspect ratio
    if (image == 0) {
        var geometry = new THREE.PlaneGeometry(20, 30);// profile picture
    }
    if (image == 1) {
        var geometry = new THREE.PlaneGeometry(35, 25);// honor 11
    }
    if (image == 2) {
        var geometry = new THREE.PlaneGeometry(35, 25); // honor 22
    }
    if (image == 3) {
        var geometry = new THREE.PlaneGeometry(35, 25);//Attendance 
    }
    if (image == 4) {
        var geometry = new THREE.PlaneGeometry(25, 25);// Mario
    }
    if (image == 5) {
        var geometry = new THREE.PlaneGeometry(20, 20);//Flappy Bird
    }
    if (image == 6) {
        var geometry = new THREE.PlaneGeometry(20, 25);// ACE Game
    }
    if (image == 7) {
        var geometry = new THREE.PlaneGeometry(20, 25);// Connect 4 
    }

    if (image != 0 && image != 1 && image != 2 && image != 3 && image != 4 && image != 5 && image != 6 && image != 7) {
        var geometry = new THREE.PlaneGeometry(20, 13.33);
    }
    const texture = new THREE.TextureLoader().load('img/' + imgList[image]);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: texture // Add the texture image here
    });
    const plane = new THREE.Mesh(geometry, material);

    // Add the new plane to the scene
    scene.add(plane);
};

// Set initial background
const backgroundImages = [
    "background1.jpg",
    "background2.jpg",
    "oceanGalaxy.jpg",
    "coolclouds.jpg",
    "anime.jpg",
    "Fcar.jpg",
    "cyberPunk.jpg",
    "animelake.jpg",
    "animecharacter.jpg",
    "pot.jpg",
    "palmtree.jpg"
];
scene.background = new THREE.TextureLoader().load(`img/${backgroundImages[0]}`);

document.addEventListener("DOMContentLoaded", function () {
    function changeBackground() {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const imageUrl = `img/${backgroundImages[randomIndex]}`;
        scene.background = new THREE.TextureLoader().load(imageUrl);
    }

    // Change background initially and then every 5 seconds (5000 milliseconds)
    changeBackground();
    setInterval(changeBackground, 5000);
});

// Move the camera with the scroll bar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.1;
}

// Add scrollbar event to move the camera
document.body.onscroll = moveCamera;

// Resize the Three.js canvas with the window
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Adjust for phone sizes and desktop size
    for (const [index, child] of scene.children.entries()) {
        if (window.innerWidth <= 600) {
            camera.position.x = 0;
            child.rotation.y = -10;
            child.position.y = index * -15;
        } else {
            camera.position.x = 50;
            child.rotation.y = 15 * (Math.PI / 180);
            child.position.y = index * -38.6;
        }
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Resize canvas on window resize
window.addEventListener('resize', resizeWindow, false);

// Create the renderer and attach to the canvas
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

// Set initial canvas size
resizeWindow();

// Set renderer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Animation loop (calls itself recursively)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the animation
animate();
