import { StateSignal } from '@solid-js/signal'
import { Component3d } from '../../webGL/webGLArchitecture/Classes/Compoment3d/Component3d'
import { Component3dName } from '../../webGL/webGLArchitecture/Types/Component3dNameType'
class SpaceEntryService {
  public signal = StateSignal<Component3dName>(undefined)

  public setNearElement(componentName: Component3dName) {
    this.signal.dispatch(componentName)
  }
}

export default new SpaceEntryService()
