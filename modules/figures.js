import * as THREE from "three"

export const createCube = (scene) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'red' })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    return cube
}