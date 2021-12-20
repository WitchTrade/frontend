import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { pairwise } from 'rxjs';

import { itemsService } from '../stores/items/items.service';
import { userService } from '../stores/user/user.service';
import themeService from './theme.service';
import { inventoryService } from '../stores/inventory/inventory.service';
import { serverNotificationService } from '../stores/serverNotification/server-notification.service';
import { User } from '../stores/user/user.model';
import { userStore } from '../stores/user/user.store';

class AppService {
  public init(): void {
    const signature = [
      'background: #393166',
      'color: #bdb2ff',
      'padding-left: 4px',
      'padding-right: 4px',
      'border-radius: 20px'
    ].join(';');
    console.log(`\\    /\\
 )  ( ')
(  /  )
 \\(__)| %cGiyoMoon`, signature);

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

    userStore.pipe(pairwise()).subscribe(([oldUser, newUser]: User[]) => {
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
