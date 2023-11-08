
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight,
  0.1,
  1000
);


//Avatar 
const Smtexture = new THREE.TextureLoader().load('diamondblock.webp');

const Sm = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: Smtexture })
);

scene.add(Sm)


// Moon 
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon);


const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(100);
camera.position.setY(10)

const goePog = new THREE.CylinderGeometry(41.37, 41.37, 6, 32);

const texturePog = new THREE.TextureLoader().load('eevee.png');
const matPog = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, wireframe: false, map: texturePog });

const pog = new THREE.Mesh(goePog, matPog);

scene.add(pog);



function addStar(){
  const goemetry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( goemetry, material ); 

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );


  star.position.set(x, y, z); 
  scene.add(star)

}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('space1.jpg');
scene.background = spaceTexture;


//lights 
const pointLight = new THREE.PointLight(0xFFFFFF, 1000, 1000)
pointLight.position.set(0, 20, 50);

const ambenLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
scene.add(pointLight)
scene.add(ambenLight);

//HElpers 
const ligherHelper = new THREE.PointLightHelper(pointLight); 
const gridHelper = new THREE.GridHelper(200, 50); 

const axesHelper = new THREE.AxesHelper(20, 20, 20);
scene.add(ligherHelper, gridHelper, axesHelper)


moon.position.z = 30;
moon.position.setX(-10);

// Scroll animation 

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  Sm.rotation.y += 0.01;
  Sm.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera


function animate(time) {
  requestAnimationFrame(animate);

  //pog.rotation.y += 0.01;
  pog.rotation.x += 0.02;
  pog.rotation.y += 0.005;
  pog.rotation.z += 0.01;

  

  renderer.render(scene, camera);
}

animate();
