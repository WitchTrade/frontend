import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap, skipUntil, last, catchError } from 'rxjs/operators';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { User } from '../user/user.model';
import { userService } from '../user/user.service';

export class SearchService {

  public search(searchParameters: string, user: User) {
    let options: RequestInit = {};
    if (user.id) {
      options = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };
    }
    // get all items and save them in the store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/search${searchParameters}`, options).pipe(
      tap({
        next: async res => {
          if (res.ok) {
            const notification = createNotification({
              content: 'Search complete',
              duration: 2500,
              type: 'success'
            });
            notificationService.addNotification(notification);
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
    ).pipe(skipUntil(userService.lazyTokenRefresh().pipe(last(), catchError(() => of(null)))));
  }

  public stats() {
    // get all items and save them in the store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/search/stats`).pipe(
      tap({
        next: async res => {
          if (!res.ok) {
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

export const searchService = new SearchService();
