import { Mesh, MeshBasicMaterial, Object3D } from 'three'

export class MaterialHelper {
  static addReceiveShadow(object3D): void {
    object3D.traverse((child) => {
      child.receiveShadow = true
    })
  }

  static addCastShadow(object3D: Object3D): void {
    object3D.traverse((child) => {
      child.castShadow = true
    })
  }
  static addAllShadow(object3D: Object3D): void {
    MaterialHelper.addCastShadow(object3D)
    MaterialHelper.addReceiveShadow(object3D)
  }

  static disableLights(object3D, excludedObjects: Object3D[] = []) {
    const namesToExclude: string[] = []

    excludedObjects.forEach((obj) => {
      namesToExclude.push(obj.uuid)
      namesToExclude.push(...this.getChildrenUuid(obj))
    })

    object3D.traverse((child) => {
      if (child instanceof Mesh && !namesToExclude.includes(child.uuid)) {
        const prevMaterial = child.material
        const newMaterial = new MeshBasicMaterial()
        newMaterial.copy(prevMaterial as MeshBasicMaterial)
        //@ts-ignore
        if (prevMaterial.map === null && prevMaterial.emissiveMap) {
          //@ts-ignore
          newMaterial.map = prevMaterial.emissiveMap // Dans le cas ou il n'y a rien dans la propriété map
        }
        child.material = newMaterial
      }
    })
  }
  static getChildrenUuid(object3D: Object3D): string[] {
    const children: string[] = []
    object3D.traverse((child) => {
      children.push(child.uuid)
    })
    return children
  }
}
