import { Vector3 } from 'three'

export interface IPathable {
  index: number
  points: Vector3[]
  debugPoints()
}
