import { Notification } from './notification.model';
import { NotificationStore, notificationStore } from './notification.store';

export class NotificationService {

  private _notificationId = 0;

  constructor(private notificationStore: NotificationStore) {
  }

  public addNotification(notification: Notification) {
    notification.id = this._notificationId;
    this._notificationId++;

    notificationStore.add(notification);
    this._initDestroy(notification);
  }

  private _initDestroy(notification: Notification) {
    setTimeout(() => {
      this.notificationStore.remove(notification.id);
    }, notification.duration);
  }

}

export const notificationService = new NotificationService(notificationStore);
