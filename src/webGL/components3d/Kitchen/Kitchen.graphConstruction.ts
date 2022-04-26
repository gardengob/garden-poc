import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function KitchenGraphConstruction(compoment3d: Component3d) {
  // const cubeGeometery = new BoxGeometry(1, 1, 1)
  // const cubeMaterial = new MeshBasicMaterial({ color: 0xaad5ff })
  // const cube = new Mesh(cubeGeometery, cubeMaterial)
  // cube.name = 'kitchen_base_cube'
  // compoment3d.root.add(cube)
  compoment3d.points = [
    new Vector3(-3, 0, 1),
    new Vector3(0, 0, 2),
    new Vector3(2, 0, -2),
  ]
  const point2 = new Object3D()
  point2.name = 'kitchen_cameraPathPoint_2'
  point2.position.set(3.5, 1, 1.5)
  const point3 = new Object3D()
  point3.name = 'kitchen_entryPersoPoint_3'
  point3.position.set(3, 1.2, 0.5)
  const point4 = new Object3D()
  point4.name = 'kitchen_cameraPathPoint_4'
  point4.position.set(4, 1, -1)
  // compoment3d.root.add(cube)
  compoment3d.root.add(point2)
  compoment3d.root.add(point3)
  compoment3d.root.add(point4)
}
