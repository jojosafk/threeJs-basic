import * as THREE from "three"
import bk from "/skype_bk.png"
import dn from "/skype_dn.png"
import ft from "/skype_ft.png"
import lf from "/skype_lf.png"
import rt from "/skype_rt.png"
import up from "/skype_up.png"
import { createBoundingBoxes } from "./boundingBox"
import { scene } from "./initScene.js";

const floorSize = { width: 100, height: 100, depth: 0.001 }
const wallsSize = { width: 100, height: 60, depth: 0.001 }

export const createWalls = (scene) => {
    const wallGroup = new THREE.Group()
    scene.add(wallGroup)

    //frontWall
    const frontWallTexture = new THREE.TextureLoader().load(rt)
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallsSize.width, wallsSize.height, wallsSize.depth),
        new THREE.MeshBasicMaterial({
            map: frontWallTexture,
        }))
    frontWall.position.z = -50;

    //leftWall
    const leftWallTexture = new THREE.TextureLoader().load(bk)
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallsSize.width, wallsSize.height, wallsSize.depth),
        new THREE.MeshBasicMaterial({
            map: leftWallTexture,
        }))
    leftWall.position.x = -50;
    leftWall.rotation.y = Math.PI / 2

    //rightWall
    const rightWallTexture = new THREE.TextureLoader().load(ft)
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallsSize.width, wallsSize.height, wallsSize.depth),
        new THREE.MeshBasicMaterial({
            map: rightWallTexture,
        }))
    rightWall.position.x = 50;
    rightWall.rotation.y = Math.PI / 2

    //backWall
    const backWallTexture = new THREE.TextureLoader().load(lf)
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallsSize.width, wallsSize.height, wallsSize.depth),
        new THREE.MeshBasicMaterial({
            map: backWallTexture,
        }))
    backWall.position.z = 50;

    wallGroup.add(frontWall, leftWall, rightWall, backWall)

    return wallGroup
}

export const createFloor = (scene) => {
    const floorTexture = new THREE.TextureLoader().load(dn)
    floorTexture.wrapS = THREE.RepeatWrapping
    floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set(4, 4)
    const planeGeometry = new THREE.PlaneGeometry(floorSize.width, floorSize.height)
    const planeMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture, //  color:'green',
        side: THREE.DoubleSide
    })
    const floor = new THREE.Mesh(planeGeometry, planeMaterial)
    const convertRadians = (Math.PI / 180)

    floor.rotation.x = 90 * convertRadians
    floor.position.y = -7.5;
    scene.add(floor)
}

export const createCeiling = (scene) => {
    //Ceiling
    const ceilingTexture = new THREE.TextureLoader().load(up)
    const ceilingGeometry = new THREE.PlaneGeometry(floorSize.width, floorSize.height)

    const ceilingMaterial = new THREE.MeshBasicMaterial({
        map: ceilingTexture, //  color:'green',
        side: THREE.DoubleSide
    })
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = 30;
    scene.add(ceiling)
}

export const initWorld = () => {
    createFloor(scene);
    createCeiling(scene);
    const walls = createWalls(scene)
    createBoundingBoxes(walls);
    return { walls }
}