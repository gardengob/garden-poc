import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CubicBezierCurve3,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PMREMGenerator,
  Points,
  PointsMaterial,
  Vector3,
} from 'three'
import { EXRLoader, Geometry, GLTF } from 'three-stdlib'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { VegetableGardenGraphConstruction } from './VegetableGarden.graphContruction'
import { VegetableGardenInitialization } from './VegetableGarden.initialization'

const loadingManager = LoadingManager.getInstance()

export const vegetableGardenComponent3d = new Component3d()
vegetableGardenComponent3d.cameraLookAtTarget.position.set(0, 1, 0)
vegetableGardenComponent3d.index = 2
vegetableGardenComponent3d.name = 'vegetable_garden'

vegetableGardenComponent3d.expectedObjects = ['potager_space']

vegetableGardenComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    vegetableGardenComponent3d.expectedObjects
  )

  vegetableGardenComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = vegetableGardenComponent3d.getObject('potager_space')
  const tsetCrve = vegetableGardenComponent3d.getObjectFromGraph('CourbeBézier')

  // const light = new AmbientLight(0x404040) // soft white light
  // vegetableGardenComponent3d.root.add(light)

  const garden = pocHouse.getModel()
  vegetableGardenComponent3d.root.add(garden)
  garden.position.y = 0.1
  vegetableGardenComponent3d.root.position.set(-6, 0, 5.5)
  VegetableGardenGraphConstruction(vegetableGardenComponent3d)
  VegetableGardenInitialization(vegetableGardenComponent3d)
}
