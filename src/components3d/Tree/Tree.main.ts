import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/IComponent3d'

const appManager = AppManager.getInstance()
// const loadingManager = LoadingManager.getInstance()

export const treeComponent3d = new Component3d()

treeComponent3d.expectedObjects = ['']
