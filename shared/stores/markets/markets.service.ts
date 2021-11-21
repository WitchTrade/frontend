import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap } from 'rxjs/operators';
import authService from '../../services/auth.service';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';

export class MarketsService {

  public fetchAllMarkets() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets`).pipe(
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

  public fetchOwnMarket() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/own`).pipe(
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

  public editMarket(body: { offerlistNote: string, wishlistNote: string; }) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Note updated',
                duration: 5000,
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
      );
  }

  public fetchUserMarket(username: string) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/user/${username}`).pipe(
      tap({
        next: async res => {
          if (!res.ok && res.status !== 404) {
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

  public fetchPrices() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/prices`).pipe(
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

  public createOffer(offer: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/offers`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(offer)
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Offer created',
                duration: 5000,
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
      );
  }

  public syncOffers(data: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/offers/`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              const notification = createNotification({
                content: `${json.newOffers} offer${json.newOffers === 1 ? '' : 's'} created, ${json.updatedOffers} updated and ${json.deletedOffers} deleted`,
                duration: 5000,
                type: 'success'
              });
              notificationService.addNotification(notification);
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

  public updateOffer(id: number, offer: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/offers/${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(offer)
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Offer edited',
                duration: 5000,
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
      );
  }

  public deleteOffer(id: number) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/offers/${id}`,
      {
        method: 'DELETE'
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Offer deleted',
                duration: 5000,
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
      );
  }

  public deleteAllOffers() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/offers`,
      {
        method: 'DELETE'
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'All offers deleted',
                duration: 5000,
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
      );
  }

  public createWish(wish: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/wishes`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(wish)
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Wish list item created',
                duration: 5000,
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
      );
  }

  public updateWish(id: number, wish: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/wishes/${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(wish)
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Wishlist item edited',
                duration: 5000,
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
      );
  }

  public deleteWish(id: number) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/wishes/${id}`,
      {
        method: 'DELETE'
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'Wish list item deleted',
                duration: 5000,
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
      );
  }

  public deleteAllWishes() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/wishes`,
      {
        method: 'DELETE'
      }).pipe(
        tap({
          next: async res => {
            if (res.ok) {
              const notification = createNotification({
                content: 'All wishlist items deleted',
                duration: 5000,
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
      );
  }

}

export const marketsService = new MarketsService();
