import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap } from 'rxjs/operators';
import { userStore } from './user.store';
import { createUser, RegisterUser, User } from './user.model';
import { inventoryService } from '../inventory/inventory.service';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { syncSettingsStore } from '../syncSettings/syncSettings.store';
import authService from '../../services/auth.service';
import { createSyncSettings } from '../syncSettings/syncSettings.model';

export class UserService {

  public async init() {
    const loggedIn = authService.init();
    if (!loggedIn) {
      const user = createUser({ loggedIn: false });
      userStore.update(() => user);
      return;
    }

    // fetch additional information from the server and add it to the user object
    this.fetchCurrentUser().subscribe(async (res) => {
      if (!res.ok) {
        this.logout(true);
        return;
      }
      const json = await res.json();

      const completeUser = createUser(json);
      completeUser.loggedIn = true;

      // update the store with the new user information
      userStore.update(() => completeUser);
    });
  }

  public fetchCurrentUser() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/current`);
  };

  public fetchSyncSettings() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/syncSettings`).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            syncSettingsStore.update(() => json);
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
    );
  };

  public login(username: string, password: string, stayLoggedIn: boolean) {
    const body = JSON.stringify({ username, password });
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              authService.setTokens(json.token, json.refreshToken, stayLoggedIn);
              const user = createUser(json);
              user.loggedIn = true;
              userStore.update(() => user);

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
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            authService.setTokens(json.token, json.refreshToken, false);
            const user = createUser(json);
            user.loggedIn = true;
            userStore.update(() => user);

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

  public updateAccountSettings(user: Partial<User>) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            authService.setTokens(json.token, json.refreshToken);
            const user = createUser(json);
            user.loggedIn = true;
            userStore.update(() => user);
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
    );
  }

  public updateSyncSettings(syncSettings: any) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/syncSettings`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(syncSettings)
    }).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            const syncSettings = createSyncSettings(json);
            syncSettingsStore.update(() => syncSettings);
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
    );
  }

  public changePassword(oldPassword: string, password: string) {
    const body = JSON.stringify({ oldPassword, password });
    // login user and save info to store
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/password`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body
      }).pipe(
        tap({
          next: async res => {
            const json = await res.json();
            if (res.ok) {
              authService.setTokens(json.token, json.refreshToken);
              const user = createUser(json);
              user.loggedIn = true;
              userStore.update(() => user);

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
      );
  }

  public logout(background?: boolean) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refreshToken');
    userStore.update(() => createUser({ loggedIn: false }));
    inventoryService.removeInventory();
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
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/steam/friends`).pipe(
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
    );
  }

  public getSteamLoginUrl() {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/steam/login`).pipe(
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

  public verifySteamProfileUrl(query: string) {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/steam/auth${query}`).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            authService.setTokens(json.token, json.refreshToken);
            const user = createUser(json);
            user.loggedIn = true;
            userStore.update(() => user);
            const notification = createNotification({
              content: 'Steam Profile Link verified',
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

}

export const userService = new UserService();
