import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MailBoxGraphConstruction } from './MailBox.graphConstruction'
import { MailBoxInitialization } from './MailBox.intialization'

// const loadingManager = LoadingManager.getInstance()

export const mailboxComponent3d = new Component3d()
mailboxComponent3d.root.position.set(2, 0, -2)
mailboxComponent3d.index = 4
mailboxComponent3d.expectedObjects = []

MailBoxGraphConstruction(mailboxComponent3d)
MailBoxInitialization(mailboxComponent3d)
