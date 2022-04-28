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
  MeshStandardMaterial,
  BackSide,
} from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGLArchitecture/Classes/Scene/Scene'
import { kitchenComponent3d } from '../Kitchen/Kitchen.main'
import { mailboxComponent3d } from '../MailBox/MailBox.main'
import { treeComponent3d } from '../Tree/Tree.main'
import { vegetableGardenComponent3d } from '../VegetableGarden/VegetableGarden.main'
import gsap from 'gsap/all'
import { contestComponent3d } from '../Contest/Contest.main'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { Geometry, GLTF } from 'three-stdlib'
import { memoryComponent3d } from '../MemoriesScene/Memory.main'
import { MaterialHelper } from '../../webGLArchitecture/Utils/MaterialHelper'
import SpaceEntryService from '../../../services/events/SpaceEntryService'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export const gardenScene = new Scene()
const loadingManager = LoadingManager.getInstance()

gardenScene.expectedObjects = ['garden_base']

gardenScene.components.push(vegetableGardenComponent3d)
gardenScene.components.push(treeComponent3d)
gardenScene.components.push(kitchenComponent3d)
gardenScene.components.push(mailboxComponent3d)
gardenScene.components.push(contestComponent3d)
gardenScene.components.push(memoryComponent3d)

const cubeGeometery = new BoxGeometry(0.1, 0.1, 0.1)
const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 })

const cube = new Mesh(cubeGeometery, cubeMaterial)

gardenScene.sceneBase.add(cube)
//scene plan
// const geometry = new PlaneGeometry(10, 10)
// const material = new MeshBasicMaterial({
//   color: 0x50aa22,
//   side: DoubleSide,
// })
// const plane = new Mesh(geometry, material)
// plane.rotateX(Math.PI / 2)
// plane.position.y = -0.5
// gardenScene.sceneBase.add(plane)

const targetCurve = new CatmullRomCurve3([
  new Vector3(-8, 1, 28),
  new Vector3(-8, 1, 20),
  new Vector3(-8, 1, 8),
  new Vector3(-8, 1, 2),
  new Vector3(-8, 1, -6),
  new Vector3(-8, 1, -10),
  new Vector3(-8, 1, -14),
  new Vector3(-8, 1, -20),
  new Vector3(2, 1, -22),
  new Vector3(2, 1, -16),
  new Vector3(2, 1, -8),
  new Vector3(2, 1, -0.5),
  new Vector3(2, 5, 0.5),
  new Vector3(2, 1, 1.5),
  new Vector3(2, 1, 6),
  new Vector3(2, 1, 8),
  new Vector3(2, 1, 16),
  new Vector3(2, 1, 28),
])
targetCurve.curveType = 'catmullrom'
targetCurve.tension = 0
targetCurve.closed = true

const targetPoints = targetCurve.getPoints(500)
const curveTargetGeometry = new BufferGeometry().setFromPoints(targetPoints)

const targetCurveMaterial = new LineBasicMaterial({ color: 0xfa00fa })
const targetCurveObject = new Line(curveTargetGeometry, targetCurveMaterial)
gardenScene.sceneBase.add(targetCurveObject)

let target = new Vector3(0, 0, 0)

gardenScene.onInit = (scene) => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )

  gardenScene.assignLoadedSceneObjects(gltfMap)

  MaterialHelper.disableLights(gardenScene.sceneBase)

  scene.assignLoadedSceneObjects(gltfMap)
  const gardenBase = scene.getObject('garden_base')

  const gardenBaseModel = gardenBase.getModel()

  gardenBaseModel.position.set(-18, 0, 0)
  scene.sceneBase.add(gardenBaseModel)
  scene.sceneBase.position.set(0, 0, 0)
  gardenBaseModel.scale.set(1.2, 1, 1.2)

  //background
  const skyCubegeometry = new BoxGeometry(100, 100, 100)
  const skyCubeMaterial = new MeshStandardMaterial({ color: '#00ced1' })
  skyCubeMaterial.side = BackSide
  const skyCube = new Mesh(skyCubegeometry, skyCubeMaterial)

  gardenScene.sceneBase.add(skyCube)

  const appManager = AppManager.getInstance()
  const pointsObjects = gardenScene.getPoints()

  const gardenPoints = pointsObjects.map((point: Object3D) => {
    let worldVector: Vector3 = new Vector3()
    point.getWorldPosition(worldVector)
    return worldVector
  })

  //Create a closed wavey loop
  const curve = new CatmullRomCurve3(gardenPoints)
  curve.curveType = 'catmullrom'
  curve.tension = 0.5
  curve.closed = true

  const points = curve.getPoints(500)
  const curveGeometry = new BufferGeometry().setFromPoints(points)

  const curveMaterial = new LineBasicMaterial({ color: 0xfffa00 })
  const curveObject = new Line(curveGeometry, curveMaterial)
  gardenScene.sceneBase.add(curveObject)
  scene.cameraPath = curve
  const curveStart = scene.cameraPath.getPoint(0)
  appManager.cameraHolder.position.set(curveStart.x, curveStart.y, curveStart.z)
}

let camPosIndex = { x: 0, y: 0 }
let scrolling = 0
let step = 0

var _scrollTimeout = null
let camMovMode = 'free'
document.addEventListener('mousewheel', (e: WheelEvent) => {
  const direction = e.deltaY > 0 ? 1 : -1
  scrolling = direction
  step = (direction * e.y) / 450

  clearTimeout(_scrollTimeout)
  _scrollTimeout = setTimeout(function () {
    console.log("Haven't scrolled in 250ms")
  }, 250)
})
let closeElement: Component3d = null

gardenScene.onAnimationLoop = (ellapsedTime) => {
  let timedStep = step * ellapsedTime
  if (scrolling < -0.1 || (scrolling > 0.1 && camMovMode == 'free')) {
    if (scrolling > 0) {
      scrolling -= 0.01
    }
    if (scrolling < 0) {
      scrolling += 0.01
    }

    const appManager = AppManager.getInstance()
    if (camPosIndex.y + timedStep > 0 && camPosIndex.y + timedStep < 10000) {
      camPosIndex.y += timedStep * Math.abs(scrolling)
    }

    if (camPosIndex.y + timedStep > 10000) {
      camPosIndex.y = 0
    }

    let notCloseToAnyThing = true
    for (let i = 0; i < gardenScene.entryPoints.length; i++) {
      const element = gardenScene.entryPoints[i]

      const worldElementPosition = new Vector3()
      element.object.getWorldPosition(worldElementPosition)

      const worldCameraPosition = new Vector3()
      appManager.camera.getWorldPosition(worldCameraPosition)

      if (
        worldElementPosition.x > worldCameraPosition.x - 2 &&
        worldElementPosition.x < worldCameraPosition.x + 2 &&
        worldElementPosition.y > worldCameraPosition.y - 2 &&
        worldElementPosition.y < worldCameraPosition.y + 2 &&
        worldElementPosition.z > worldCameraPosition.z - 2 &&
        worldElementPosition.z < worldCameraPosition.z + 2
      ) {
        notCloseToAnyThing = false
        if (element.component != closeElement) {
          closeElement = element.component
          notCloseToAnyThing = false
          camMovMode
          console.log('pas loin de ', element)
          SpaceEntryService.setNearElement(element.component.name)

          //ACTION : in front of element
        }
      }
    }
    if (notCloseToAnyThing && closeElement !== null) {
      closeElement = null
      console.log('exit ')
      //ACTION : not front of element
    }

    const curve = gardenScene.cameraPath
    const camPos = curve.getPointAt(camPosIndex.y / 10000)
    const camRot = curve.getTangentAt(camPosIndex.y / 10000)
    // const camTarget = targetCurve.getPointAt(
    //   (camPosIndex.y * 0.6) / 0.4 / 10000
    // )
    const curvPercent = camPosIndex.y / 10000

    console.log(
      'curve percent',
      Math.round((camPosIndex.y / 10000) * 100) / 100
    )

    // cube.position.set(camTarget.x, camTarget.y, camTarget.z)

    // appManager.camera.lookAt(camTarget)
    appManager.cameraHolder.position.set(camPos.x, camPos.y, camPos.z)

    target = new Vector3(camRot.z, 1, -camRot.x)
    const targetPoint = target.add(camPos)
    if (!closeElement) {
      // const worldtarget = new Vector3()
      // closeElement.cameraLookAtTarget.getWorldPosition(worldtarget)
      // appManager.camera.lookAt(worldtarget)
    }
    appManager.camera.lookAt(targetPoint.x, camPos.y - 0.2, targetPoint.z)
  }
}
