import { Object3D, Vector3 } from 'three'
import { IUpdatable } from '../../Interfaces/IUpdatable'
import { Component3d } from '../Compoment3d/Component3d'

export class Scene implements IUpdatable {
  sceneBase: Object3D = new Object3D()
  components: Component3d[] = []

  init() {
    for (let i = 0; i < this.components.length; i++) {
      const component3d = this.components[i]
      if (component3d.onInit) {
        component3d.onInit(component3d)
      }
      this.sceneBase.add(component3d.root)
    }
  }

  update(elapsedTime: number): void {
    for (let i = 0; i < this.components.length; i++) {
      const component3d = this.components[i]
      if (component3d.onInit) {
        component3d.update(elapsedTime)
      }
    }
  }

  getComponentsPathPoints(): Vector3[] {
    const pathPoints: Vector3[] = []
    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i]
      pathPoints.push(...element.points)
    }
    return pathPoints
  }
}
