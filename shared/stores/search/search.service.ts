import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import authService from '../../services/auth.service';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';

export class SearchService {

  public search(searchParameters: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/search`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(searchParameters)
      }).pipe(
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
