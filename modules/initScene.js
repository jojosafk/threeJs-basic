import * as THREE from "three"
import { PointerLockControls } from "three/examples/jsm/Addons.js";

export const scene = new THREE.Scene(); // create a scene
let camera;
let controls;
let renderer;

export const setupScene = () => {
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    scene.add(camera);
    camera.position.set(0, -5.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject()); 

    window.addEventListener("resize", onWindowResize, false); 

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return { camera, controls, renderer };
};