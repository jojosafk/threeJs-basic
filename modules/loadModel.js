import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scene } from "./initScene.js";

function loadGLTFModel(modelPath, texturePath, position, size) {
    console.log(size)
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath); // Cargar textura

    textureLoader.load(texturePath, 
        (texture) => {
            // console.log('Ruta de la textura:', texturePath);
        },
        undefined,
        (error) => {
            console.error('Error al cargar la textura:', error);
        }
    );

    gltfLoader.load(modelPath, (gltf) => {
        const model = gltf.scene;

        model.scale.set(size.x, size.y, size.z); 

        model.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });

        // Posicionar el modelo
        model.position.copy(position);
        scene.add(model);
        return model.scene;
    }, undefined,
    (error) => {
        console.error('Error al cargar el modelo:', error);
    });
}

export const loadModels = () => {
    const astronauta = loadGLTFModel(
        'astronaut_stylized/scene.gltf',
        'astronaut_stylized/textures/base_material_baseColor.jpeg',
        new THREE.Vector3(5, -5, -5),
        {x:3,y:3,z:3}

    )
    const satellite = loadGLTFModel(
        'space_satellite/scene.gltf',
        'space_satellite/textures/Satellite_baseColor.jpeg',
        new THREE.Vector3(5, 20, -5),
        {x:5,y:5,z:5,}
    )
    // loadGLTFModel(
    //     'stylized_stones_minipack/scene.gltf',
    //     'stylized_stones_minipack/textures/Satellite_baseColor.jpeg',
    //     new THREE.Vector3(5, -2, -5),
    //     {x:-3,y:-3,z:-3,}
    // )
    
    return {astronauta,satellite}
}


