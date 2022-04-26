import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Object3D } from 'three'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

export function VegetableGardenGraphConstruction(compoment3d: Component3d) {
  compoment3d.index = 0

  const cubeGeometery = new BoxGeometry(1, 1, 1)
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 })

  const cube = new Mesh(cubeGeometery, cubeMaterial)
  cube.name = 'vegetable_garden_base_cube'

  const point1 = new Object3D()
  point1.name = 'vegetableGarden_cameraPathPoint_1'
  point1.position.set(1, 0, 2)

  const point2 = new Object3D()
  point2.name = 'vegetableGarden_entryPoint_2'
  point2.position.set(0, 0, 2)

  const point3 = new Object3D()
  point3.name = 'vegetableGarden_cameraPathPoint_3'
  point3.position.set(-2, 0, 1)
  // compoment3d.root.add(cube)

  // compoment3d.root.add(point1)
  // compoment3d.root.add(point2)
  // compoment3d.root.add(point3)

  compoment3d.points = [point1.position, point2.position, point3.position]
}
