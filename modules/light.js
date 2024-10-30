import * as THREE from "three"
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export const createLights = (scene, { x, y, z }) => {
    const gui = new GUI();

    let ambientLight = new THREE.AmbientLight(0x101010, 1);
    scene.add(ambientLight)

    let sunlight = new THREE.DirectionalLight(0xffffff, 1);
    sunlight.position.y = 15;
    // directionalLight.position.set(1, 1, 1).normalize();
    scene.add(sunlight)


    const ambientFolder = gui.addFolder("Ambient Light");
    ambientFolder.add(ambientLight, "intensity", 0, 2);
    ambientFolder.add(sunlight, "intensity", 0, 10);
}