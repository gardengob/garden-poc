import { Object3D, Vector3 } from 'three'
import { IObject3DWrapper } from '../../Interfaces/IObject3DWrapper'
import { IPathable } from '../../Interfaces/IPathable'
import { IUpdatable } from '../../Interfaces/IUpdatable'

export enum Component3dStateEnum {
  ONGOING = 'ONGOING',
  GLOBAL_ONGOING = 'GLOBAL_ONGOING',
  IDLE = 'IDLE',
}

export class Component3d implements IUpdatable, IPathable {
  index: number
  points: Vector3[] = []

  root: Object3D = new Object3D()
  position: Vector3

  // Component States
  status: Component3dStateEnum
  statesDictionnary: Map<String, any> = new Map()
  animationFunctions: Map<string, () => void> = new Map<string, () => void>()

  // Component3d objects
  expectedObjects: string[] = []
  loadedSceneObjects: Map<string, IObject3DWrapper> = new Map<
    string,
    IObject3DWrapper
  >()


  //closure called on component3d init
  onInit: ((component3d: Component3d) => void) | undefined

  //closure called once per frame
  onAnimationLoop:
    | ((ellapsedTime: number, component3d: Component3d) => void)
    | undefined

  onGlobalAnimationLoop:
    | ((ellapsedTime: number, component3d: Component3d) => void)
    | undefined

  //closure called on component3d's start
  onStart: ((component3d: Component3d) => void) | undefined

  /**
   * get a THREE.js object directly by it's Playlet's scene graph
   * 
   * @param name - the name of the wanted object
   * 
   * @public
   */
  getObjectFromGraph(modelName: string): Object3D {
    try {
      return this.root.getObjectByName(modelName)!;
    } catch (error) {
      throw Error('Model not available')
    }
  }

  update(ellapsedTime: number) {
    // this.interactionManager.update()
    if (this.status == Component3dStateEnum.ONGOING) {
      if (this.onAnimationLoop) {
        this.onAnimationLoop(ellapsedTime, this)
      }
    } else if (this.status == Component3dStateEnum.GLOBAL_ONGOING) {
      if (this.onGlobalAnimationLoop) {
        this.onGlobalAnimationLoop(ellapsedTime, this)
      }
    }
  }

  toGlobalView(): void {
    this.status = Component3dStateEnum.GLOBAL_ONGOING
  }

  enter(): void {
    this.status = Component3dStateEnum.ONGOING
  }

  stop(): void {
    this.status = Component3dStateEnum.IDLE
  }
}
