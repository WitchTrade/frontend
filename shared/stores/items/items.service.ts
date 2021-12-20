import { setEntities } from '@ngneat/elf-entities';
import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap } from 'rxjs/operators';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { itemsStore } from './items.store';

export class ItemsService {

  public fetchAllItems() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/items`).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              itemsStore.update(setEntities(json));
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
        }
      )
    );
  }

}

export const itemsService = new ItemsService();
