import { useEffect, useRef } from 'react'

import * as THREE from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { AppStateEnum } from '../../webGLArchitecture/Enums/AppStateEnum'
import css from './Garden3d.module.scss'
export default function Garden3d() {
  const canvasRef = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas)

    const appManager = AppManager.getInstance()

    const scene = new THREE.Scene()

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)

    appManager.scene.add(mesh)
    appManager.canvas = canvasRef.current

    const axesHelper = new THREE.AxesHelper(5)
    appManager.scene.add(axesHelper)

    const helper = new THREE.CameraHelper(appManager.camera)
    appManager.scene.add(helper)

    appManager.camera.lookAt(new THREE.Vector3(0, 0, 0))

    appManager.appState = AppStateEnum.INITIALIZING

    //déso j'en ai eu marre
    resizeCanvas()
    resizeCanvas()

    render()
  }, [])

  function render() {
    const appManager = AppManager.getInstance()
    requestAnimationFrame(render)
    // stats.begin()
    const elapsedTime = appManager.clock.getElapsedTime()
    const deltaTime = elapsedTime - appManager.oldElapsedTime
    appManager.oldElapsedTime = elapsedTime

    appManager.update(elapsedTime)

    // stats.end()
  }

  function resizeCanvas() {
    const appManager = AppManager.getInstance()

    appManager.canvas.style.width = '100%'
    appManager.canvas.style.height = '100%'

    appManager.canvas.width = appManager.canvas.offsetWidth
    appManager.canvas.height = appManager.canvas.offsetHeight

    appManager.onWindowResize()
  }

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  )
}
