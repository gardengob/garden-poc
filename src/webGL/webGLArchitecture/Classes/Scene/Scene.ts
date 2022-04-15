import { Object3D } from "three";
import { IUpdatable } from "../../Interfaces/IUpdatable";
import { Component3d } from "../Compoment3d/Component3d";

export class Scene implements IUpdatable {

    sceneBase: Object3D = new Object3D
    components: Component3d[] =[]

    update(elapsedTime: number): void {
        for (let i = 0; i < this.components.length; i++) {
            const component3d = this.components[i];
            component3d.update(elapsedTime)
        }
    }



}