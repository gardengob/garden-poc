import { Points, PointsMaterial, Vector3 } from 'three'
import { Geometry } from 'three-stdlib'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { VegetableGardenInitialization } from './VegetalGarden.initialization'

// const loadingManager = LoadingManager.getInstance()

export const vegetableGardenComponent3d = new Component3d(
)

vegetableGardenComponent3d.expectedObjects = ['']
vegetableGardenComponent3d.index = 0

// var dotGeometry = new Geometry();
// dotGeometry.vertices.push(new Vector3( 0, 0, 0));
// var dotMaterial = new PointsMaterial( { size: 1, sizeAttenuation: false } );
// var dot = new Points( dotGeometry, dotMaterial );

// vegetableGardenComponent3d.root.add(dot)

// dot.position.set(1,0,0)

// vegetableGardenComponent3d.points.push(dot.position)
VegetableGardenInitialization(vegetableGardenComponent3d)
