import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

import { itemsService } from '../stores/items/items.service';
import { userService } from '../stores/user/user.service';
import themeService from './themeService';
import { userQuery } from '../stores/user/user.query';
import { inventoryService } from '../stores/inventory/inventory.service';
import { serverNotificationService } from '../stores/serverNotification/server-notification.service';

class AppService {
    public init(): void {
        dayjs.extend(relativeTime);
        dayjs.extend(duration);

        themeService.init();
        userService.init();
        itemsService.fetchAllItems().subscribe();

        userQuery.select().subscribe(user => {
            if (user.loggedIn) {
                inventoryService.fetchInventory(user).subscribe();
                serverNotificationService.fetchNotifications(user).subscribe();
            }
        });
    }
}

const appService = new AppService();
export default appService;