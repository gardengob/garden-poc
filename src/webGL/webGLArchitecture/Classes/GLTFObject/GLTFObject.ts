import type { Object3D } from 'three'
import { GLTF } from 'three-stdlib/loaders/GLTFLoader'
import type { IObject3DWrapper } from '../../Interfaces/IObject3DWrapper'

/**
 * GLTF specific Object3D wrapper
 * @public
 */
export class GLTFObject implements IObject3DWrapper {
  id: string
  GLTF: GLTF
  model: Object3D

  constructor(id: string, GLTF: GLTF) {
    this.id = id
    this.GLTF = GLTF

    //clone the model instead of affecting it for loading time saving purpose
    this.model = GLTF.scene.clone()
  }

  getModel(): Object3D {
    return this.model
  }
}
