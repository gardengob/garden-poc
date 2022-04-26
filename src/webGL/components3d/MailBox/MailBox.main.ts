import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MailBoxGraphConstruction } from './MailBox.graphConstruction'
import { MailBoxInitialization } from './MailBox.intialization'
import { Geometry, GLTF } from 'three-stdlib'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { AmbientLight } from 'three'
const loadingManager = LoadingManager.getInstance()

export const mailboxComponent3d = new Component3d()
mailboxComponent3d.root.position.set(2, 0, -2)
mailboxComponent3d.index = 4
mailboxComponent3d.expectedObjects = ['boitemail_space']

mailboxComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    mailboxComponent3d.expectedObjects
  )

  mailboxComponent3d.assignLoadedSceneObjects(gltfMap)
  const space = mailboxComponent3d.getObject('boitemail_space')

  const light = new AmbientLight(0x404040) // soft white light
  mailboxComponent3d.root.add(light)
  mailboxComponent3d.root.add(space.getModel())
  mailboxComponent3d.root.position.set(10, 0, 20)
  console.log('cegetableGardenComponent initialized')
}

MailBoxGraphConstruction(mailboxComponent3d)
MailBoxInitialization(mailboxComponent3d)
