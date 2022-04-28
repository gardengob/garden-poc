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
  AnimationMixer,
  AnimationClip,
  LoopOnce,
  CameraHelper,
  PerspectiveCamera,
  Camera,
  Curve,
  PMREMGenerator,
  ACESFilmicToneMapping,
  sRGBEncoding,
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
import { EXRLoader, Geometry, GLTF } from 'three-stdlib'
import { memoryComponent3d } from '../MemoriesScene/Memory.main'
import { MaterialHelper } from '../../webGLArchitecture/Utils/MaterialHelper'
import SpaceEntryService from '../../../services/events/SpaceEntryService'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { GLTFObject } from '../../webGLArchitecture/Classes/GLTFObject/GLTFObject'

export const gardenScene = new Scene()
const loadingManager = LoadingManager.getInstance()

gardenScene.expectedObjects = ['garden_base', 'base_fake_elements3']

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

const targetCurve: any = new CatmullRomCurve3([
  // mailbox
  new Vector3(-2, 1, 9),
  new Vector3(-2, 1, 7),
  new Vector3(-2, 1, 4),
  //vegetables
  new Vector3(-2, 1, 2.5),
  new Vector3(-2, 1, 0.5),
  //kitchen
  new Vector3(-2, 2, -3),
  new Vector3(-2, 2, -6),
  //memo
  new Vector3(0.5, 1.2, -5.5),
  new Vector3(0.5, 1.2, -4),
  new Vector3(0.5, 1.2, -2),
  //tree
  new Vector3(0.5, 1.2, 0),
  new Vector3(0.5, 2, 1.5),
  new Vector3(0.5, 1, 3),
  //contest
  new Vector3(1, 1.4, 7),
  new Vector3(0.5, 1.4, 9),
])
targetCurve.curveType = 'catmullrom'
targetCurve.tension = 0.2
targetCurve.closed = true

const targetPoints = targetCurve.getPoints(500)
const curveTargetGeometry = new BufferGeometry().setFromPoints(targetPoints)

const targetCurveMaterial = new LineBasicMaterial({ color: 0xfa00fa })
const targetCurveObject = new Line(curveTargetGeometry, targetCurveMaterial)
// gardenScene.sceneBase.add(targetCurveObject)

let target = new Vector3(0, 0, 0)
let firstFrame = false

let mixerCam
let pngCubeRenderTarget, exrCubeRenderTarget
let pngBackground, exrBackground
gardenScene.onInit = (scene) => {
  const appManager = AppManager.getInstance()

  new EXRLoader().load('hdri.exr', function (texture) {
    exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture)
    exrBackground = exrCubeRenderTarget.texture
    firstFrame = true
    texture.dispose()
  })
  // AppManager.getInstance().scene.background = background
  const pmremGenerator = new PMREMGenerator(appManager.renderer)
  pmremGenerator.compileEquirectangularShader()
  appManager.renderer.toneMapping = ACESFilmicToneMapping
  appManager.renderer.outputEncoding = sRGBEncoding

  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )
  gardenScene.assignLoadedSceneObjects(gltfMap)

  // MaterialHelper.disableLights(gardenScene.sceneBase)

  scene.assignLoadedSceneObjects(gltfMap)
  const gardenBase = scene.getObject('garden_base')
  const testBase = scene.getObject('base_fake_elements3')

  const clipsCam = (gardenBase as GLTFObject).GLTF.animations

  const gardenBaseModel = gardenBase.getModel()
  const testBaseModel = testBase.getModel()

  gardenBaseModel.position.set(-19.5, 0, 0)
  scene.sceneBase.add(gardenBaseModel)
  // scene.sceneBase.add(testBaseModel)
  scene.sceneBase.position.set(0, 0, 0)
  gardenBaseModel.scale.set(1.3, 1, 1.3)
  const cameraTest = (testBase as GLTFObject).GLTF.cameras[0]
  const helpertest = new CameraHelper(cameraTest as Camera)
  scene.sceneBase.add(cameraTest)
  scene.sceneBase.add(helpertest)

  mixerCam = new AnimationMixer(cameraTest as PerspectiveCamera)

  const clip = AnimationClip.findByName(clipsCam, 'CameraAction')
  const action = mixerCam.clipAction(clip)
  action.loop = LoopOnce
  action.play()

  // appManager.camera = cameraTest as PerspectiveCamera
  //background
  const skyCubegeometry = new BoxGeometry(100, 100, 100)
  const skyCubeMaterial = new MeshStandardMaterial({ color: '#D8DCD0 ' })
  skyCubeMaterial.side = BackSide
  const skyCube = new Mesh(skyCubegeometry, skyCubeMaterial)

  gardenScene.sceneBase.add(skyCube)

  const pointsObjects = gardenScene.getPoints()

  const gardenPoints = pointsObjects.map((point: Object3D) => {
    let worldVector: Vector3 = new Vector3()
    point.getWorldPosition(worldVector)
    return worldVector
  })
  // gardenPoints.forEach((gardenPoint) => {
  //   console.log(`new Vector3(${gardenPoint.x},1 ,${gardenPoint.z})`)
  // })

  //Create a closed wavey loop
  const curve: any = new CatmullRomCurve3(gardenPoints)
  curve.curveType = 'catmullrom'
  curve.tension = 0.5
  curve.closed = true

  const points = curve.getPoints(500)
  const curveGeometry = new BufferGeometry().setFromPoints(points)

  const curveMaterial = new LineBasicMaterial({ color: 0xfffa00 })
  curveMaterial.opacity = 0
  const curveObject = new Line(curveGeometry, curveMaterial)
  // gardenScene.sceneBase.add(curveObject)
  scene.cameraPath = curve
  const curveStart = scene.cameraPath.getPoint(camPosIndex.y)
  appManager.cameraHolder.position.set(curveStart.x, curveStart.y, curveStart.z)

  appManager.camera.lookAt(curveStart.add(new Vector3(-1, 0, 0)))
}

let camPosIndex = { x: 0, y: 0 }
let scrolling = 0
let step = 0

var _scrollTimeout = null
let camMovMode = 'free'
document.addEventListener('mousewheel', (e: WheelEvent) => {
  const direction = e.deltaY > 0 ? 1 : -1
  scrolling = direction
  step = direction / 1.2

  clearTimeout(_scrollTimeout)
  _scrollTimeout = setTimeout(function () {
    console.log("Haven't scrolled in 250ms")
    scrolling = 0
  }, 250)
})
let closeElement: Component3d = null
let newEnvMap
let background
gardenScene.onAnimationLoop = (ellapsedTime) => {
  // AppManager.getInstance().scene.background = background
  if (firstFrame) {
    newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null
    background = exrBackground
    gardenScene.sceneBase.traverse((obj) => {
      if (obj instanceof Mesh) {
        if (newEnvMap !== obj.material.envMap) {
          obj.material.envMap = newEnvMap
          obj.material.needsUpdate = true
        }
      }
    })
    firstFrame = false
  }
  // mixerCam.update(1 / 144)
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
        worldElementPosition.x > worldCameraPosition.x - 1 &&
        worldElementPosition.x < worldCameraPosition.x + 1 &&
        worldElementPosition.y > worldCameraPosition.y - 1 &&
        worldElementPosition.y < worldCameraPosition.y + 1 &&
        worldElementPosition.z > worldCameraPosition.z - 1 &&
        worldElementPosition.z < worldCameraPosition.z + 1
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
      SpaceEntryService.setNearElement(null)
      //ACTION : not front of element
    }

    const curve = gardenScene.cameraPath
    const camPos = curve.getPointAt(camPosIndex.y / 10000)
    const camPosTarget = targetCurve.getPointAt(camPosIndex.y / 10000)
    const camRot = curve.getTangentAt(camPosIndex.y / 10000)
    // const camTarget = targetCurve.getPointAt(
    //   (camPosIndex.y * 0.6) / 0.4 / 10000
    // )
    const curvPercent = camPosIndex.y / 10000

    // console.log(
    //   'curve percent',
    //   Math.round((camPosIndex.y / 10000) * 100) / 100
    // )

    cube.position.set(camPosTarget.x, camPosTarget.y, camPosTarget.z)

    // appManager.camera.lookAt(camTarget)
    appManager.cameraHolder.position.set(camPos.x, camPos.y, camPos.z)
    cube.position.set(camPos.x, camPos.y, camPos.z)

    target = new Vector3(camRot.z, 1, -camRot.x)
    const targetPoint = target.add(camPos)
    if (!closeElement) {
      // const worldtarget = new Vector3()
      // closeElement.cameraLookAtTarget.getWorldPosition(worldtarget)
      // appManager.camera.lookAt(worldtarget)
    }
    appManager.camera.lookAt(targetPoint.x, camPosTarget.y, targetPoint.z)
  }
}
