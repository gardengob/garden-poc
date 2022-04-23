import { CatmullRomCurve3, Object3D, Vector3 } from 'three'
import { IUpdatable } from '../../Interfaces/IUpdatable'
import { Component3d } from '../Compoment3d/Component3d'

export class Scene implements IUpdatable {
  sceneBase: Object3D = new Object3D()
  components: Component3d[] = []
  cameraPath: CatmullRomCurve3
  entryPoints: { object: Object3D; component: Component3d }[] = []

  onAnimationLoop: (ellapsedTime) => void

  onInit: ((scene: Scene) => void) | undefined

  init() {
    this.components.sort((a: Component3d, b: Component3d) => {
      if (a.index && b.index) {
        return a.index - b.index
      }
      return -1
    })
    for (let i = 0; i < this.components.length; i++) {
      const component3d = this.components[i]
      if (component3d.onInit) {
        component3d.onInit(component3d)
      }
      this.sceneBase.add(component3d.root)
    }
    this.onInit(this)
  }

  update(elapsedTime: number): void {
    if (this.onAnimationLoop) {
      this.onAnimationLoop(elapsedTime)
    }
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

  getPoints(): Object3D[] {
    const camPoints = []
    this.sceneBase.traverse((obj) => {
      if (
        obj.name.includes('cameraPathPoint') ||
        obj.name.includes('entryPoint')
      ) {
        camPoints.push(obj)
      }
    })

    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i]
      element.root.traverse((obj) => {
        if (obj.name.includes('entryPoint')) {
          this.entryPoints.push({ object: obj, component: element })
        }
      })
    }
    return camPoints
  }
}
