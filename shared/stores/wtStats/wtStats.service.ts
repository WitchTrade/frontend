import { of } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { tap } from 'rxjs/operators'
import { createNotification } from '../notification/notification.model'
import { notificationService } from '../notification/notification.service'
import { wtStatsStore } from './wtStats.store'

export class WtStatsService {
  public fetchWtStats() {
    return fromFetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/stats/witchtrade`
    ).pipe(
      tap({
        next: async (res) => {
          const json = await res.json()
          if (res.ok) {
            wtStatsStore.update(() => json)
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

export const wtStatsService = new WtStatsService()
