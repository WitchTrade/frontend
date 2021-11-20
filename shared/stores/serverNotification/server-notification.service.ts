import { ServerNotificationStore, serverNotificationStore } from './server-notification.store';
import { ServerNotification } from './server-notification.model';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import authService from '../../services/auth.service';

export class ServerNotificationService {

  constructor(private serverNotificationStore: ServerNotificationStore) { }

  public fetchNotifications() {
    // get all notifications and save them in the store
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notifications`).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            this.serverNotificationStore.set(json);
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

  public deleteNotification(notification: ServerNotification) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notifications/${notification.id}`, {
      method: 'DELETE'
    }).pipe(
      tap({
        next: async res => {
          if (res.ok) {
            this.serverNotificationStore.remove(notification.id);
          } else {
            const notification = createNotification({
              content: res.statusText,
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

export const serverNotificationService = new ServerNotificationService(serverNotificationStore);
