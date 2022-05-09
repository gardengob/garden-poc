import { CatmullRomCurve3, Vector3 } from 'three'

export class CameraPath {
  curve: CatmullRomCurve3
  elevationCurve: CatmullRomCurve3

  constructor(pathDatas: { point: Vector3; targetElevation: number }[]) {
    this.curve = this.buildCameraPath(pathDatas.map((data) => data.point))
    const elevationCurvePoints = pathDatas.map(
      (data) => new Vector3(data.point.x, data.targetElevation, data.point.z)
    )
    this.elevationCurve = this.buildCameraPath(elevationCurvePoints)
  }

  private buildCameraPath(points: Vector3[]): CatmullRomCurve3 {
    const curve: any = new CatmullRomCurve3(points)
    curve.curveType = 'catmullrom'
    curve.tension = 0.5
    curve.closed = true

    return curve
  }
}
