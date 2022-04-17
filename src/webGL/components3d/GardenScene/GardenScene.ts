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
} from 'three'
import { Scene } from '../../webGLArchitecture/Classes/Scene/Scene'
import { treeComponent3d } from '../Tree/Tree.main'
import { vegetableGardenComponent3d } from '../VegetableGarden/VegetalGarden.main'

export const gardenScene = new Scene()

gardenScene.components.push(vegetableGardenComponent3d)
gardenScene.components.push(treeComponent3d)

const geometry = new PlaneGeometry(10, 10)
const material = new MeshBasicMaterial({
  color: 0x50aa22,
  side: DoubleSide,
})
const plane = new Mesh(geometry, material)
plane.rotateX(Math.PI / 2)
plane.position.y = -0.5
gardenScene.sceneBase.add(plane)
vegetableGardenComponent3d.buildPoints()

const gardenPoints = gardenScene.getComponentsPathPoints()
//Create a closed wavey loop
const curve = new CatmullRomCurve3(gardenPoints)

const points = curve.getPoints(50)
const curveGeometry = new BufferGeometry().setFromPoints(points)

const curveMaterial = new LineBasicMaterial({ color: 0xff0000 })

// Create the final object to add to the scene

// Create the final object to add to the scene
const curveObject = new Line(curveGeometry, curveMaterial)
gardenScene.sceneBase.add(curveObject)
