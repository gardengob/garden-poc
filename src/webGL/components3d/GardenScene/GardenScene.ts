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
  Quaternion,
  LoopRepeat,
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

let cameraTest: PerspectiveCamera

let mixerCam

gardenScene.onInit = (scene) => {
  const appManager = AppManager.getInstance()

  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )
  gardenScene.assignLoadedSceneObjects(gltfMap)

  scene.assignLoadedSceneObjects(gltfMap)
  const gardenBase = scene.getObject('garden_base')
  const testBase = scene.getObject('base_fake_elements3')

  const clipsCam = (testBase as GLTFObject).GLTF.animations

  appManager.scene.animations.push(...clipsCam)
  const gardenBaseModel = gardenBase.getModel()
  const testBaseModel = testBase.getModel()

  // gardenBaseModel.position.set(-19.5, 0, 0)
  scene.sceneBase.add(gardenBaseModel)
  scene.sceneBase.add(testBaseModel)

  cameraTest = testBaseModel.getObjectByName(
    'Caméra_Orientation'
  ) as PerspectiveCamera
  const helpertest = new CameraHelper(cameraTest as Camera)
  appManager.scene.add(testBaseModel)
  appManager.camera = cameraTest
  testBaseModel.add(helpertest)

  mixerCam = new AnimationMixer(testBaseModel)

  const clip = AnimationClip.findByName(appManager.scene.animations, 'Action')
  const action = mixerCam.clipAction(clip)
  action.loop = LoopRepeat
  action.play()

  const pointsObjects = gardenScene.getPoints()

  MaterialHelper.disableLights(gardenScene.sceneBase)
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
MaterialHelper.disableLights(gardenScene.sceneBase)

let closeElement: Component3d = null
let newEnvMap
let background
gardenScene.onAnimationLoop = (ellapsedTime) => {
  const appManager = AppManager.getInstance()

  const worldCameraPosition = new Vector3()
  appManager.camera.getWorldPosition(worldCameraPosition)
  console.log(gardenScene.entryPoints)

  if (scrolling < -0.1 || (scrolling > 0.1 && camMovMode == 'free')) {
    if (scrolling > 0) {
      mixerCam.update(1 / 144)
    }
    if (scrolling < 0) {
      mixerCam.update(-1 / 144)
    }
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
  //   if (notCloseToAnyThing && closeElement !== null) {
  //     closeElement = null
  //     console.log('exit ')
  //     SpaceEntryService.setNearElement(null)
  //     //ACTION : not front of element
  //   }
}
