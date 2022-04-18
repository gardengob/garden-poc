import {
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  BufferGeometry,
  CubicBezierCurve3,
  Line,
  LineBasicMaterial,
  Vector3,
  CatmullRomCurve3,
  Object3D,
  ArrowHelper,
  BoxGeometry,
} from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGLArchitecture/Classes/Scene/Scene'
import { kitchenComponent3d } from '../Kitchen/Kitchen.main'
import { mailboxComponent3d } from '../MailBox/MailBox.main'
import { treeComponent3d } from '../Tree/Tree.main'
import { vegetableGardenComponent3d } from '../VegetableGarden/VegetableGarden.main'
import gsap from 'gsap/all'

export const gardenScene = new Scene()

gardenScene.components.push(vegetableGardenComponent3d)
gardenScene.components.push(treeComponent3d)
gardenScene.components.push(kitchenComponent3d)
gardenScene.components.push(mailboxComponent3d)

//scene plan
const geometry = new PlaneGeometry(10, 10)
const material = new MeshBasicMaterial({
  color: 0x50aa22,
  side: DoubleSide,
})
const plane = new Mesh(geometry, material)
plane.rotateX(Math.PI / 2)
plane.position.y = -0.5
gardenScene.sceneBase.add(plane)

gardenScene.onInit = (scene) => {
  const pointsObjects = gardenScene.getPoints()
  console.log(pointsObjects)

  const gardenPoints = pointsObjects.map((point: Object3D) => {
    let worldVector: Vector3 = new Vector3()
    point.getWorldPosition(worldVector)
    return worldVector
  })
  //Create a closed wavey loop
  const curve = new CatmullRomCurve3(gardenPoints)

  const points = curve.getPoints(500)
  const curveGeometry = new BufferGeometry().setFromPoints(points)

  const curveMaterial = new LineBasicMaterial({ color: 0xfffa00 })
  const curveObject = new Line(curveGeometry, curveMaterial)
  gardenScene.sceneBase.add(curveObject)
  scene.cameraPath = curve
}
//a changer en debugpoints() qui ajouteai juste le material

// Create the final object to add to the scene
let camPosIndex = { x: 0, y: 0 }
let scrolling = 0
let step = 0

var _scrollTimeout = null

document.addEventListener('mousewheel', (e: WheelEvent) => {
  const direction = e.deltaY > 0 ? 1 : -1
  scrolling = direction
  step = (direction * e.y) / 90

  clearTimeout(_scrollTimeout)
  _scrollTimeout = setTimeout(function () {
    console.log("Haven't scrolled in 250ms")
  }, 250)
})
gardenScene.onAnimationLoop = (ellapsedTime) => {
  if (scrolling < -0.1 || scrolling > 0.1) {
    if (scrolling > 0) {
      scrolling -= 0.01
    }
    if (scrolling < 0) {
      scrolling += 0.01
    }
    console.log('scrolling', scrolling)
    const appManager = AppManager.getInstance()
    if (camPosIndex.y + step > 0 && camPosIndex.y + step < 10000) {
      camPosIndex.y += step * Math.abs(scrolling)
    }

    if (camPosIndex.y + step > 10000) {
      camPosIndex.y = 0
    }

    const curve = gardenScene.cameraPath
    var camPos = curve.getPointAt(camPosIndex.y / 10000)
    var camRot = curve.getTangentAt(camPosIndex.y / 10000)
    appManager.cameraHolder.position.set(camPos.x, camPos.y, camPos.z)

    const target = new Vector3(-camRot.z, camRot.y, camRot.x)

    appManager.camera.lookAt(target.add(camPos))
  } else {
  }
}
