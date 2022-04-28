import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function MailBoxGraphConstruction(compoment3d: Component3d) {
  const cubeGeometery = new BoxGeometry(0.1, 0.1, 0.1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xaaaaff })
  const cube1 = new Mesh(cubeGeometery, cubeMaterial)
  const cube2 = new Mesh(cubeGeometery, cubeMaterial)
  const cube3 = new Mesh(cubeGeometery, cubeMaterial)
  // compoment3d.root.add(cube)
  // compoment3d.points = [
  //   new Vector3(-3, 0, 1),
  //   new Vector3(0, 0, 2),
  //   new Vector3(2, 0, -2),
  // ]
  const point1 = new Object3D()
  point1.name = 'mailbox_cameraPathPoint_1'
  point1.position.set(3, 1.2, 2)
  cube1.position.set(3, 1.2, 2)
  const point2 = new Object3D()
  point2.name = 'mailbox_entryPersoPoint_2'
  point2.position.set(3, 1.2, 0)
  cube2.position.set(3, 1.2, 0)
  const point3 = new Object3D()
  point3.name = 'mailbox_cameraPathPoint_3'
  point3.position.set(3, 1.2, -3)
  cube3.position.set(3, 1.2, -3)
  compoment3d.root.add(point1)
  compoment3d.root.add(point2)
  compoment3d.root.add(point3)

  // compoment3d.root.add(cube1)
  // compoment3d.root.add(cube2)
  // compoment3d.root.add(cube3)
}
