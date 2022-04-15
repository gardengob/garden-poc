import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { treeComponent3d } from '../../webGL/components3d/Tree/Tree.main'
import { vegetableGardenComponent3d } from '../../webGL/components3d/VegetableGarden/VegetalGarden.main'
import { AppManager } from '../../webGL/webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGL/webGLArchitecture/Classes/Scene/Scene'
import { AppStateEnum } from '../../webGL/webGLArchitecture/Enums/AppStateEnum'

import css from './Garden3d.module.scss'

export interface IWindowSize {
  width: number
  height: number
}

export default function Garden3d() {
  const canvasRef = useRef(null)
  const [windowSize, setWindowSize] = useState<IWindowSize>({width: 0, height: 0})

  useEffect(() => {
    
    const appManager = AppManager.getInstance()

    window.addEventListener('resize', resizeCanvas)

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

    appManager.devMode = true

    //déso j'en ai eu marre
    resizeCanvas()
    resizeCanvas()

    const gardenScene = new Scene()

    gardenScene.components.push(treeComponent3d)
    gardenScene.components.push(vegetableGardenComponent3d)

    treeComponent3d.root.position.set(2,0,2)
    vegetableGardenComponent3d.root.position.set(-2,0,2)

    appManager.scene.add(treeComponent3d.root)
    appManager.scene.add(vegetableGardenComponent3d.root)

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
    <div className={css.webgl}>
      <canvas className={css.canvas} ref={canvasRef} id="canvas" />
    </div>
  )
}
