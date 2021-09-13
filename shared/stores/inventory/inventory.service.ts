import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap } from 'rxjs/operators';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { User } from '../user/user.model';
import { userQuery, UserQuery } from '../user/user.query';
import { createInventory, InventoryChangeDTO } from './inventory.model';
import { InventoryStore, inventoryStore } from './inventory.store';

export class InventoryService {

  constructor(private inventoryStore: InventoryStore, private _userQuery: UserQuery) { }

  public removeInventory() {
    this.inventoryStore.update(createInventory({}));
  }

  public fetchInventory(user: User) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`,
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              this.inventoryStore.update(json);
            } else if (res.status !== 404) {
              const notification = createNotification({
                content: json.message,
                duration: 5000,
                type: 'error'
              });
              notificationService.addNotification(notification);
            }
          },
          error: err => {
            const notification = createNotification({
              content: err,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
            return of(err);
          }
        })
      );
  }

  public syncInventory(user: User) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              this.inventoryStore.update(json);
              const notification = createNotification({
                content: 'Synced inventory from steam!',
                duration: 5000,
                type: 'success'
              });
              notificationService.addNotification(notification);
            } else {
              const notification = createNotification({
                content: json.message,
                duration: 5000,
                type: 'error'
              });
              notificationService.addNotification(notification);
            }
          },
          error: err => {
            const notification = createNotification({
              content: err,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
            return of(err);
          }
        })
      );
  }

  public updateInventory(data: InventoryChangeDTO) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            this.inventoryStore.update(json);
            const notification = createNotification({
              content: 'Updated inventory settings',
              duration: 5000,
              type: 'success'
            });
            notificationService.addNotification(notification);
          } else {
            const notification = createNotification({
              content: json.message,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
          }
        },
        error: err => {
          const notification = createNotification({
            content: err,
            duration: 5000,
            type: 'error'
          });
          notificationService.addNotification(notification);
          return of(err);
        }
      })
    );
  }

  public updateSyncSettings(data: any) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/inventory/syncsettings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            this.inventoryStore.update(json);
            const notification = createNotification({
              content: 'Updated sync settings',
              duration: 5000,
              type: 'success'
            });
            notificationService.addNotification(notification);
          } else {
            const notification = createNotification({
              content: json.message,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
          }
        },
        error: err => {
          const notification = createNotification({
            content: err,
            duration: 5000,
            type: 'error'
          });
          notificationService.addNotification(notification);
          return of(err);
        }
      })
    );
  }

}

export const inventoryService = new InventoryService(inventoryStore, userQuery);
