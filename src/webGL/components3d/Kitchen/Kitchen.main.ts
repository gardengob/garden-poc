import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { KitchenGraphConstruction } from './Kitchen.graphConstruction'
import { KitchenInitialization } from './Kitchen.intialization'

// const loadingManager = LoadingManager.getInstance()

export const kitchenComponent3d = new Component3d()
kitchenComponent3d.root.position.set(-2, 0, -2)
kitchenComponent3d.index = 3
kitchenComponent3d.expectedObjects = []

KitchenGraphConstruction(kitchenComponent3d)
KitchenInitialization(kitchenComponent3d)
