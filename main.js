
import * as THREE from "three"

//scene
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(camera)
camera.position.z = 5


//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
console.log(window.innerHeight)
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement)


//lights
let ambientLight = new THREE.AmbientLight(0x101010, 1);
ambientLight.position.x = camera.position.x //light follow the camera
ambientLight.position.y = camera.position.y //light follow the camera
ambientLight.position.z = camera.position.z //light follow the camera
scene.add(ambientLight)

// Direction of light
let sunlight = new THREE.DirectionalLight(0xddddd, 1);
sunlight.position.y = 15;
scene.add(sunlight)


// Create cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

document.addEventListener('keydown', () => {
  const pressed = event.key
  if (pressed == 'ArrowUp') {
    camera.translateY(0.05)
  }
})

// FLOOR
// const planeGeometry = new THREE.PlaneGeometry(50, 50)
const floorTexture = new THREE.TextureLoader().load('elyvisions/elyvisions/arch3_dn.png')
floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(20, 20)

const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture, //  color:'green',
  side: THREE.DoubleSide
})
const floor = new THREE.Mesh(planeGeometry, planeMaterial)
floor.rotation.x = Math.PI / 2
floor.position.y = -Math.PI
scene.add(floor)

// WALLS
const wallGroup = new THREE.Group()
scene.add(wallGroup)
//frontWall
const frontWallTexture = new THREE.TextureLoader().load('elyvisions/elyvisions/arch3_ft.png')
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, -0.05),
  new THREE.MeshBasicMaterial({
    map: frontWallTexture,
  }))
frontWall.position.z = -20
//leftWall
const leftWallTexture = new THREE.TextureLoader().load('elyvisions/elyvisions/arch3_lf.png')
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.001),
  new THREE.MeshBasicMaterial({
    map: leftWallTexture,
  }))
leftWall.position.x = -20
leftWall.position.y = Math.PI / 2
//rightWall
const rightWallTexture = new THREE.TextureLoader().load('elyvisions/elyvisions/arch3_lf.png')
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 20, 0.001),
  new THREE.MeshBasicMaterial({
    map: rightWallTexture,
  }))
rightWall.position.x = 20
rightWall.position.y = Math.PI / 2

wallGroup.add(frontWall, leftWall, rightWall)


let render = function () {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
