import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// або для 3D DOM:
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// --- Сцена і камера ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// --- Renderer ---
// --- WebGL Renderer для куба ---
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// --- CSS3D Renderer для тексту ---
const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(labelRenderer.domElement);

// --- Куб ---
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.BoxGeometry(3);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// --- Коло ---
// const geometry = new THREE.SphereGeometry(1, 32, 32); // радіус, ширина, висота сегментів
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);


// --- DOM елемент як 3D об’єкт ---
const text = document.querySelector("#info")
const label = new CSS3DObject(text);
label.position.set(0, 2, 0); // 2 одиниці вище куба
scene.add(label);

// --- Анімація ---
function animate() {
  requestAnimationFrame(animate);
    
  // обертання куба
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  const time = Date.now() * 0.001;
  label.element.style.color = `hsl(${(time*100)%360}, 100%, 50%)`;
  renderer.render( scene, camera );
}
animate();
// renderer.setAnimationLoop(animate);

// --- Адаптивність ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});