import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Vector3,
} from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function VegetableGardenInitialization(compoment3d: Component3d) {
  const cubeGeometery = new BoxGeometry(1, 1, 1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 })

  const cube = new Mesh(cubeGeometery, cubeMaterial)
  cube.name = 'vegetable_garden_base_cube'
  compoment3d.points = [
    new Vector3(0, 0, 2),
    new Vector3(2, 0, 2),
    new Vector3(-2, 0, 2),
  ]
  compoment3d.root.add(cube)
}
