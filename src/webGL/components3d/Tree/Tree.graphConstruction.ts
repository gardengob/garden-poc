import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function TreeGraphConstruction(compoment3d: Component3d) {
  const cubeGeometery = new BoxGeometry(1, 1, 1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffffff })

  const cube = new Mesh(cubeGeometery, cubeMaterial)
  cube.name = 'tree_base_cube'
  compoment3d.root.add(cube)

  const point1 = new Object3D()
  point1.name = 'tree_cameraPathPoint_1'
  point1.position.set(1, 0, 1)

  const point2 = new Object3D()
  point2.name = 'tree_cameraPathPoint_2'
  point2.position.set(0, 0, 1)

  compoment3d.root.add(cube)

  compoment3d.root.add(point1)
  compoment3d.root.add(point2)

  compoment3d.points = [point1.position, point2.position]
}
