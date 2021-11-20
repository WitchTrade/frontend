import { UserStore, userStore } from './user.store';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { fromFetch } from 'rxjs/fetch';
import { tap, skipUntil, last, catchError } from 'rxjs/operators';
import { userQuery, UserQuery } from './user.query';
import { firstValueFrom, of } from 'rxjs';
import { createUser, DecodedToken, RegisterUser, User } from './user.model';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { SyncSettingsStore, syncSettingsStore } from './syncSettings.store';
import { createSyncSettings } from './syncSettings.model';

export class UserService {

  constructor(private syncSettingsStore: SyncSettingsStore, private userStore: UserStore, private _userQuery: UserQuery, private _inventoryService: InventoryService) { }

  public async init() {
    const refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : sessionStorage.getItem('refreshToken');
    const token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : sessionStorage.getItem('jwt');
    if (!refreshToken || !token) {
      const user = createUser({ loggedIn: false });
      this.userStore.update(user);
      return;
    };

    // Decode token and check if it's still valid
    const decodedRefreshToken = jwt_decode<DecodedToken>(refreshToken);
    if (dayjs().add(1, 'minute').isAfter(dayjs.unix(decodedRefreshToken.exp))) {
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('refreshToken');
      this.userStore.reset();
      return;
    }

    const user = createUser({});
    user.loggedIn = true;
    user.token = token;
    user.refreshToken = refreshToken;

    // update the store with the new user information
    this.userStore.update(user);

    // fetch additional information from the server and add it to the user object
    await firstValueFrom(this.lazyTokenRefresh());
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/current`,
      {
        headers: {
          'Authorization': `Bearer ${this._userQuery.getValue().token}`
        }
      });
    if (!res.ok) {
      this.logout(true);
      return;
    }

    const json = await res.json();

    const completeUser = createUser(json);
    completeUser.loggedIn = true;
    completeUser.token = userQuery.getValue().token;
    completeUser.refreshToken = userQuery.getValue().refreshToken;

    // update the store with the new user information
    this.userStore.update(completeUser);
  }

  public lazyTokenRefresh() {
    if (!userQuery.getValue().token) {
      return of({});
    }
    const decodedToken = jwt_decode<DecodedToken>(userQuery.getValue().token);
    if (!dayjs().add(1, 'minute').isAfter(dayjs.unix(decodedToken.exp))) {
      return of({});
    }
    return userService.refresh();
  }

  public fetchSyncSettings() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/syncSettings`,
      {
        headers: {
          'Authorization': `Bearer ${this._userQuery.getValue().token}`
        },
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              this.syncSettingsStore.update(json);
            } else if (res.status !== 404) {
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
      ).pipe(skipUntil(userService.lazyTokenRefresh().pipe(last(), catchError(() => of(null)))));
  }

  public login(username: string, password: string, stayLoggedIn: boolean) {
    const body = JSON.stringify({ username, password });
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              const user = createUser(json);
              user.loggedIn = true;
              this.userStore.update(user);
              if (stayLoggedIn) {
                localStorage.setItem('jwt', user.token);
                localStorage.setItem('refreshToken', user.refreshToken);
              } else {
                sessionStorage.setItem('jwt', user.token);
                sessionStorage.setItem('refreshToken', user.refreshToken);
              }

              const notification = createNotification({
                content: `Logged in as ${json.username}`,
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

  public register(user: RegisterUser) {
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            const user = createUser(json);
            user.loggedIn = true;
            this.userStore.update(user);
            sessionStorage.setItem('jwt', user.token);
            sessionStorage.setItem('refreshToken', user.refreshToken);

            const notification = createNotification({
              content: `Registered and logged in as ${json.username}`,
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

  public refresh() {
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          token: userQuery.getValue().token,
          refreshToken: userQuery.getValue().refreshToken
        }
      )
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            const user = { ...userQuery.getValue() };
            user.token = json.token;
            user.refreshToken = json.refreshToken;
            this.userStore.update(user);
            if (localStorage.getItem('jwt')) {
              localStorage.setItem('jwt', user.token);
              localStorage.setItem('refreshToken', user.refreshToken);
            } else {
              sessionStorage.setItem('jwt', user.token);
              sessionStorage.setItem('refreshToken', user.refreshToken);
            }
          } else {
            const notification = createNotification({
              content: json.message,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
            this.logout(true);
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

  public updateAccountSettings(user: Partial<User>) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userQuery.getValue().token}`
      },
      body: JSON.stringify(user)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            const user = createUser(json);
            user.loggedIn = true;
            this.userStore.update(user);
            const notification = createNotification({
              content: 'Saved',
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
    ).pipe(skipUntil(userService.lazyTokenRefresh().pipe(last(), catchError(() => of(null)))));
  }

  public updateSyncSettings(syncSettings: any) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/syncSettings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._userQuery.getValue().token}`
      },
      body: JSON.stringify(syncSettings)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            const syncSettings = createSyncSettings(json);
            this.syncSettingsStore.update(syncSettings);
            const notification = createNotification({
              content: 'Saved',
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
    ).pipe(skipUntil(userService.lazyTokenRefresh().pipe(last(), catchError(() => of(null)))));
  }

  public changePassword(oldPassword: string, password: string) {
    const body = JSON.stringify({ oldPassword, password });
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/password`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._userQuery.getValue().token}`
        },
        body
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              const user = createUser(json);
              user.loggedIn = true;
              this.userStore.update(user);
              if (localStorage.getItem('jwt')) {
                localStorage.setItem('jwt', user.token);
                localStorage.setItem('refreshToken', user.refreshToken);
              } else {
                sessionStorage.setItem('jwt', user.token);
                sessionStorage.setItem('refreshToken', user.refreshToken);
              }

              const notification = createNotification({
                content: 'Password changed',
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
      ).pipe(skipUntil(userService.lazyTokenRefresh().pipe(last(), catchError(() => of(null)))));
  }

  public logout(background?: boolean) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refreshToken');
    this.userStore.update(createUser({ loggedIn: false }));
    this._inventoryService.removeInventory();
    if (!background) {
      const notification = createNotification({
        content: 'Logged out',
        duration: 5000,
        type: 'success'
      });
      notificationService.addNotification(notification);
    }
  }

  public fetchProfile(username: string) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/get/${username}`)
      .pipe(
        tap({
          next: async res => {
            if (!res.ok) {
              if (res.status !== 400) {
                const notification = createNotification({
                  content: res.statusText,
                  duration: 5000,
                  type: 'error'
                });
                notificationService.addNotification(notification);
              }
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

  public fetchProfileMarket(username: string) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/markets/user/${username}`)
      .pipe(
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

  public getSteamFriends() {
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/steam/friends`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this._userQuery.getValue().token}`
        }
      }).pipe(
        tap({
          next: async () => { },
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

}

export const userService = new UserService(syncSettingsStore, userStore, userQuery, inventoryService);
