import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function MemoryGraphConstruction(compoment3d: Component3d) {
  // const cubeGeometery = new BoxGeometry(1, 1, 1)
  // const cubeMaterial = new MeshBasicMaterial({ color: 0xaad5ff })
  // const cube = new Mesh(cubeGeometery, cubeMaterial)
  // cube.name = 'memory_base_cube'
  // compoment3d.root.add(cube)
  const cubeGeometery = new BoxGeometry(0.1, 0.1, 0.1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xff1122 })
  const cube1 = new Mesh(cubeGeometery, cubeMaterial)
  const cube2 = new Mesh(cubeGeometery, cubeMaterial)
  const cube3 = new Mesh(cubeGeometery, cubeMaterial)

  compoment3d.points = [
    new Vector3(-3, 0, 1),
    new Vector3(0, 0, 2),
    new Vector3(2, 0, -2),
  ]
  const point1 = new Object3D()
  point1.name = 'memory_cameraPathPoint_2'
  point1.position.set(-5.5, 1.2, -1.5)
  cube1.position.set(-5.5, 1.2, -1.5)

  const point2 = new Object3D()
  point2.name = 'memory_entryPersoPoint_3'
  point2.position.set(-5.1, 1.2, 1)
  cube2.position.set(-5.1, 1.2, 1)

  const point3 = new Object3D()
  point3.name = 'memory_cameraPathPoint_4'
  point3.position.set(-5.5, 1.2, 2)
  cube3.position.set(-5.5, 1.2, 2)

  // compoment3d.root.add(cube)
  compoment3d.root.add(point1)
  compoment3d.root.add(point2)
  // compoment3d.root.add(point3)
  compoment3d.root.add(cube1)
  compoment3d.root.add(cube2)
  // compoment3d.root.add(cube3)
}
