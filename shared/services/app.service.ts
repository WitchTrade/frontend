import { pairwise } from 'rxjs'

import { inventoryService } from '../stores/inventory/inventory.service'
import { itemsService } from '../stores/items/items.service'
import { pricesService } from '../stores/prices/prices.service'
import { serverNotificationService } from '../stores/serverNotification/server-notification.service'
import { themeService } from '../stores/theme/theme.service'
import { User } from '../stores/user/user.model'
import { userService } from '../stores/user/user.service'
import { userStore } from '../stores/user/user.store'
import { wtStatsService } from '../stores/wtStats/wtStats.service'

class AppService {
  public init(): void {
    const signature = [
      'background: #393166',
      'color: #bdb2ff',
      'padding-left: 4px',
      'padding-right: 4px',
      'border-radius: 20px',
    ].join(';')
    console.log(
      `\\    /\\
 )  ( ')
(  /  )
 \\(__)| %cGiyoMoon`,
      signature
    )

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
      })
    }

    themeService.init()
    userService.init()
    itemsService.fetchAllItems().subscribe()
    pricesService.fetchPrices().subscribe()
    wtStatsService.fetchWtStats().subscribe()

    userStore.pipe(pairwise()).subscribe(([oldUser, newUser]: User[]) => {
      if (!oldUser.loggedIn && newUser.loggedIn) {
        inventoryService.fetchInventory().subscribe()
        serverNotificationService.fetchNotifications().subscribe()
        userService.fetchSyncSettings().subscribe()
      }
    })
  }
}

const appService = new AppService()
export default appService
