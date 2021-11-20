import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { pairwise } from 'rxjs';

import { itemsService } from '../stores/items/items.service';
import { userService } from '../stores/user/user.service';
import themeService from './theme.service';
import { userQuery } from '../stores/user/user.query';
import { inventoryService } from '../stores/inventory/inventory.service';
import { serverNotificationService } from '../stores/serverNotification/server-notification.service';
import { User } from '../stores/user/user.model';

class AppService {
  public init(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }

    dayjs.extend(relativeTime);
    dayjs.extend(duration);

    themeService.init();
    userService.init();
    itemsService.fetchAllItems().subscribe();

    userQuery.select().pipe(pairwise()).subscribe(([oldUser, newUser]: User[]) => {
      if (!oldUser.loggedIn && newUser.loggedIn) {
        inventoryService.fetchInventory().subscribe();
        serverNotificationService.fetchNotifications().subscribe();
        userService.fetchSyncSettings().subscribe();
      }
    });
  }
}

const appService = new AppService();
export default appService;
