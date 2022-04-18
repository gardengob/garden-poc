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
  Points,
  PointsMaterial,
  Vector3,
} from 'three'
import { Geometry, GLTF } from 'three-stdlib'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { VegetableGardenGraphConstruction } from './VegetableGarden.graphContruction'
import { VegetableGardenInitialization } from './VegetableGarden.initialization'

const loadingManager = LoadingManager.getInstance()

export const vegetableGardenComponent3d = new Component3d()
vegetableGardenComponent3d.index = 2

vegetableGardenComponent3d.expectedObjects = ['pocHouse']

vegetableGardenComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    vegetableGardenComponent3d.expectedObjects
  )

  vegetableGardenComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = vegetableGardenComponent3d.getObject('pocHouse')
  const tsetCrve = vegetableGardenComponent3d.getObjectFromGraph('CourbeBézier')

  const light = new AmbientLight(0x404040) // soft white light
  vegetableGardenComponent3d.root.add(light)
  vegetableGardenComponent3d.root.position.set(-2, 0, 2)
  console.log('cegetableGardenComponent initialized')
  VegetableGardenGraphConstruction(vegetableGardenComponent3d)
  VegetableGardenInitialization(vegetableGardenComponent3d)
}
