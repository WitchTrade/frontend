import { addEntities, deleteEntities } from '@ngneat/elf-entities'
import { Notification } from './notification.model'
import { notificationStore } from './notification.store'

export class NotificationService {
  private _notificationId = 0

  public addNotification(notification: Notification) {
    notification.id = this._notificationId
    this._notificationId++

    notificationStore.update(addEntities(notification))
    this._initDestroy(notification)
  }

  private _initDestroy(notification: Notification) {
    setTimeout(() => {
      notificationStore.update(deleteEntities(notification.id))
    }, notification.duration)
  }
}

export const notificationService = new NotificationService()
