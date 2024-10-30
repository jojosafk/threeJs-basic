
import * as THREE from "three"
import { initWorld } from "./modules/world.js";
import { loadModels } from "./modules/loadModel.js";
import { addMovement, updateMovement } from "./modules/movement.js";
import { scene, setupScene } from "./modules/initScene.js";
import { createLights } from "./modules/light.js";
import { addRotationX } from "./modules/animations.js";

const clock = new THREE.Clock();

const { camera, controls, renderer } = setupScene()
const {walls} = initWorld()
const {astronauta,satellite} = loadModels()

addMovement(controls)

createLights(scene,{x:1,y:1,z:1})

let render = function () {

  const delta = clock.getDelta();
  updateMovement(delta, controls, camera, walls);
  renderer.gammaFactor = 2.2;
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
