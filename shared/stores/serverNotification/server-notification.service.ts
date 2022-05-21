import {
  deleteAllEntities,
  deleteEntities,
  setEntities,
} from '@ngneat/elf-entities'
import { of } from 'rxjs'
import { tap } from 'rxjs/operators'
import authService from '../../services/auth.service'
import { createNotification } from '../notification/notification.model'
import { notificationService } from '../notification/notification.service'
import { ServerNotification } from './server-notification.model'
import { serverNotificationStore } from './server-notification.store'

export class ServerNotificationService {
  public fetchNotifications() {
    return authService
      .request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notifications`)
      .pipe(
        tap({
          next: async (res) => {
            const json = await res.json()
            if (res.ok) {
              serverNotificationStore.update(setEntities(json))
            } else {
              const notification = createNotification({
                content: json.message,
                duration: 5000,
                type: 'error',
              })
              notificationService.addNotification(notification)
            }
          },
          error: (err) => {
            const notification = createNotification({
              content: err,
              duration: 5000,
              type: 'error',
            })
            notificationService.addNotification(notification)
            return of(err)
          },
        })
      )
  }

  public deleteNotification(notification: ServerNotification) {
    return authService
      .request(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notifications/${notification.id}`,
        {
          method: 'DELETE',
        }
      )
      .pipe(
        tap({
          next: async (res) => {
            if (res.ok) {
              serverNotificationStore.update(deleteEntities(notification.id))
            } else {
              const notification = createNotification({
                content: res.statusText,
                duration: 5000,
                type: 'error',
              })
              notificationService.addNotification(notification)
            }
          },
          error: (err) => {
            const notification = createNotification({
              content: err,
              duration: 5000,
              type: 'error',
            })
            notificationService.addNotification(notification)
            return of(err)
          },
        })
      )
  }

  public deleteAllNotifications() {
    return authService
      .request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notifications`, {
        method: 'DELETE',
      })
      .pipe(
        tap({
          next: async (res) => {
            if (res.ok) {
              serverNotificationStore.update(deleteAllEntities())
            } else {
              const notification = createNotification({
                content: res.statusText,
                duration: 5000,
                type: 'error',
              })
              notificationService.addNotification(notification)
            }
          },
          error: (err) => {
            const notification = createNotification({
              content: err,
              duration: 5000,
              type: 'error',
            })
            notificationService.addNotification(notification)
            return of(err)
          },
        })
      )
  }
}

export const serverNotificationService = new ServerNotificationService()
