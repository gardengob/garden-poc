import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { TreeGraphConstruction } from './Tree.graphConstruction'
import { TreeInitialization } from './Tree.initialization'

// const loadingManager = LoadingManager.getInstance()

export const treeComponent3d = new Component3d()
treeComponent3d.root.position.set(2, 0, 2)
treeComponent3d.index = 1
treeComponent3d.expectedObjects = []

TreeGraphConstruction(treeComponent3d)
TreeInitialization(treeComponent3d)
