import {
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BoxGeometry,
  AnimationMixer,
  AnimationClip,
  CameraHelper,
  PerspectiveCamera,
  Camera,
  LoopRepeat,
} from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGLArchitecture/Classes/Scene/Scene'
import { kitchenComponent3d } from '../Kitchen/Kitchen.main'
import { mailboxComponent3d } from '../MailBox/MailBox.main'
import { treeComponent3d } from '../Tree/Tree.main'
import { vegetableGardenComponent3d } from '../VegetableGarden/VegetableGarden.main'
import { contestComponent3d } from '../Contest/Contest.main'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { GLTF } from 'three-stdlib'
import { memoryComponent3d } from '../MemoriesScene/Memory.main'
import { MaterialHelper } from '../../webGLArchitecture/Utils/MaterialHelper'
import SpaceEntryService from '../../../services/events/SpaceEntryService'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { GLTFObject } from '../../webGLArchitecture/Classes/GLTFObject/GLTFObject'
import ScrollService from '../../../services/events/ScrollService'

export const gardenScene = new Scene()
const loadingManager = LoadingManager.getInstance()

gardenScene.expectedObjects = ['garden_base', 'base_fake_elements3']

gardenScene.components.push(vegetableGardenComponent3d)
gardenScene.components.push(treeComponent3d)
gardenScene.components.push(kitchenComponent3d)
gardenScene.components.push(mailboxComponent3d)
gardenScene.components.push(contestComponent3d)
gardenScene.components.push(memoryComponent3d)

MaterialHelper.disableLights(gardenScene.sceneBase)

let cameraTest: PerspectiveCamera
let mixerCam
const ANIMATION_SPEED = 1 / 144
const ANIMATION_SPEED_COEF = 1 / 20
let scrolling = 0
let closeElement: Component3d = null

gardenScene.onInit = (scene) => {
  const appManager = AppManager.getInstance()

  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )

  scene.assignLoadedSceneObjects(gltfMap)
  const gardenBase = scene.getObject('garden_base')
  const testBase = scene.getObject('base_fake_elements3')

  const clipsCam = (testBase as GLTFObject).GLTF.animations

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

  // ANIMATIONS
  mixerCam = new AnimationMixer(testBaseModel)
  const clip = AnimationClip.findByName(clipsCam, 'Action')
  const action = mixerCam.clipAction(clip)
  action.loop = LoopRepeat
  action.play()

  gardenScene.assignPoints()
}

ScrollService.signal.on((e) => {
  scrolling = e !== null ? e.deltaY : 0
})
gardenScene.onAnimationLoop = (ellapsedTime) => {
  const appManager = AppManager.getInstance()

  if (scrolling < -0.1 || scrolling > 0.1) {
    if (scrolling > 0) {
      mixerCam.update(
        ANIMATION_SPEED *
          ANIMATION_SPEED_COEF *
          ellapsedTime *
          Math.sqrt(scrolling)
      )
    }
    if (scrolling < 0) {
      mixerCam.update(
        -ANIMATION_SPEED *
          ANIMATION_SPEED_COEF *
          ellapsedTime *
          Math.sqrt(Math.abs(scrolling))
      )
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
        SpaceEntryService.setNearElement(element.component.name)

        //ACTION : in front of element
      }
    }
  }
  if (notCloseToAnyThing && closeElement !== null) {
    closeElement = null
    SpaceEntryService.setNearElement(null)
    //ACTION : not front of element
  }
}
