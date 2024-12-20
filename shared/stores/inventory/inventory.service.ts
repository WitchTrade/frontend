import { of } from 'rxjs'
import { tap } from 'rxjs/operators'
import authService from '../../services/auth.service'
import { createNotification } from '../notification/notification.model'
import { notificationService } from '../notification/notification.service'
import { createInventory, InventoryChangeDTO } from './inventory.model'
import { inventoryStore } from './inventory.store'

export class InventoryService {
  public removeInventory() {
    inventoryStore.update(() => createInventory({}))
  }

  public fetchInventory() {
    return authService
      .request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`)
      .pipe(
        tap({
          next: async (res) => {
            const json = await res.json()
            if (res.ok) {
              inventoryStore.update(() => json)
            } else if (res.status !== 404) {
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

  public syncInventory() {
    return authService
      .request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`, {
        method: 'PATCH',
      })
      .pipe(
        tap({
          next: async (res) => {
            const json = await res.json()
            if (res.ok) {
              inventoryStore.update(() => json)
              const notification = createNotification({
                content: 'Successfully synced inventory!',
                duration: 5000,
                type: 'success',
              })
              notificationService.addNotification(notification)
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

  public updateInventory(data: InventoryChangeDTO) {
    return authService
      .request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .pipe(
        tap({
          next: async (res) => {
            const json = await res.json()
            if (res.ok) {
              inventoryStore.update(() => json)
              const notification = createNotification({
                content: 'Updated inventory settings',
                duration: 5000,
                type: 'success',
              })
              notificationService.addNotification(notification)
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

  public updateSyncSettings(data: any) {
    return authService
      .request(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/syncsettings`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      .pipe(
        tap({
          next: async (res) => {
            const json = await res.json()
            if (res.ok) {
              inventoryStore.update(() => json)
              const notification = createNotification({
                content: 'Updated sync settings',
                duration: 5000,
                type: 'success',
              })
              notificationService.addNotification(notification)
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
}

export const inventoryService = new InventoryService()
