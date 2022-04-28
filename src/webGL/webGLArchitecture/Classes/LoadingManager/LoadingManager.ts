import { DRACOLoader } from 'three-stdlib/loaders/DRACOLoader'
import { GLTF, GLTFLoader } from 'three-stdlib/loaders/GLTFLoader'

/**
 * Loading manager singleton
 * @public
 */
export class LoadingManager {
  private static instance: LoadingManager
  loader: GLTFLoader
  loadingPercent: number
  loadingIndex: number = 0
  totalLoadingPercent: number = 0

  modelsToLoad: Map<string, string> = new Map()
  loadedGLTF: Map<string, GLTF> = new Map()

  constructor() {
    this.loader = new GLTFLoader()
    this.loadingPercent = 0
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    this.loader.setDRACOLoader(dracoLoader)
  }

  /**
   * Load all objects in the modelsToLoad array and expose them to the whole application
   * provides callback to access diffrents loading moments
   *
   * @param onError - closure called on loading error
   * @param onLoading - closure called on loading progress (of one model)
   * @param onAllLoaded - closure called when every model is loaded - usefull to change app state and exiting the loading mode
   * @param onModelLoaded - closure called when one model laoding in finished
   *
   */
  loadAllModels(
    onError: (error: ErrorEvent) => void,
    onLoading: (xhr: ProgressEvent<EventTarget>) => void,
    onAllLoaded: () => void,
    onModelLoaded: (gltf: GLTF, loadingPercent: number) => void
  ): void {
    this.modelsToLoad.forEach((objectUrl, key) => {
      console.log('objectUrl', objectUrl)
      this.loader.load(
        // resource URL
        objectUrl,
        // called when the resource is loaded
        (gltf) => {
          console.log(key, gltf)
          this.loadedGLTF.set(key, gltf)
          this.loadingIndex += 1
          this.totalLoadingPercent += this.loadingIndex / this.loadedGLTF.size

          onModelLoaded(
            gltf,
            (this.totalLoadingPercent / this.modelsToLoad.size) * 100
          )
          if (this.modelsToLoad.size <= this.loadedGLTF.size) {
            onAllLoaded()
          }
        },
        // called while loading is progressing
        function (xhr) {
          //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          onLoading(xhr)
        },
        // called when loading has errors
        function (error) {
          onError(error)
          console.log('An error happened', error)
        }
      )
    })
  }

  // singleton Method
  static getInstance(): LoadingManager {
    if (!LoadingManager.instance) {
      LoadingManager.instance = new LoadingManager()
    }
    return LoadingManager.instance
  }

  /**
   * get a loaded GLTF by name
   *
   * @param gltfName - the name of the wanted GLTF
   *
   * @return a GLTF
   */
  getGLTF(gltfName: string): GLTF {
    const gltf = this.loadedGLTF.get(gltfName)
    if (gltf) {
      return gltf
    } else {
      throw new Error('GLTF ' + gltfName + ' not loaded')
    }
  }

  /**
   * get a list of loaded gltf (useful for scene instanciation)
   *
   * @param objectnameArray - an array of GLTF names
   *
   * @return a Map of GLTF
   */
  getFromList(objectnameArray: string[]): Map<string, GLTF> {
    const gltfMap = new Map()
    objectnameArray.forEach((objName) => {
      const gltf = this.loadedGLTF.get(objName)
      if (gltf) {
        gltfMap.set(objName, gltf)
      } else {
        throw new Error('GLTF ' + objName + ' not loaded')
      }
    })
    return gltfMap
  }
}
