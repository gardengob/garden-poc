import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Object3D } from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function VegetableGardenGraphConstruction(compoment3d: Component3d) {
  compoment3d.index = 0

  const cubeGeometery = new BoxGeometry(0.1, 0.1, 0.1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffaaff })
  const cube3 = new Mesh(cubeGeometery, cubeMaterial)
  const cube5 = new Mesh(cubeGeometery, cubeMaterial)

  const point1 = new Object3D()
  point1.name = 'vegetableGarden_cameraPathPoint_1'
  point1.position.set(4, 1.2, -1)

  const point3 = new Object3D()
  point3.name = 'vegetableGarden_entryPersoPoint_3'
  point3.position.set(4, 1.2, -3)
  cube3.position.set(4, 1.2, -3)

  const point5 = new Object3D()
  point5.name = 'vegetableGarden_cameraPathPoint_5'
  point5.position.set(4, 1.2, -5)
  cube5.position.set(4, 1.2, -5)

  compoment3d.root.add(cube3)
  compoment3d.root.add(cube5)

  // compoment3d.root.add(point1)
  compoment3d.root.add(point3)
  compoment3d.root.add(point5)

  compoment3d.points = [point1.position, point3.position, point3.position]
}
