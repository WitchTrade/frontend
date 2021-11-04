import { of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { tap } from 'rxjs/operators';
import { createNotification } from '../notification/notification.model';
import { notificationService } from '../notification/notification.service';
import { serverNotificationService } from '../serverNotification/server-notification.service';
import { userQuery } from '../user/user.query';
import { AdminStore, adminStore } from './admin.store';

export class AdminService {

  constructor(private adminStore: AdminStore) { }

  public fetchUsers() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/users`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      }
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.set(json);
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

  public ban(data: { userId: string, reason: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/ban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Banned ${json.username}`,
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
        }
      )
    );
  }

  public unban(data: { userId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/ban`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Unbanned ${json.username}`,
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
        }
      )
    );
  }

  public fetchBadges() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/badges`, {
      headers: {
        authorization: `Bearer ${userQuery.getValue().token}`
      }
    }).pipe(
      tap(
        {
          next: async (res) => {
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
        }
      )
    );
  }

  public addBadge(data: { userId: string; badgeId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/badge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Added badge to ${json.username}`,
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
        }
      )
    );
  }

  public removeBadge(data: { userId: string; badgeId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/badge`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Removed badge from ${json.username}`,
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
        }
      )
    );
  }

  public fetchRoles() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/roles`, {
      headers: {
        authorization: `Bearer ${userQuery.getValue().token}`
      }
    }).pipe(
      tap(
        {
          next: async (res) => {
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
        }
      )
    );
  }

  public addRole(data: { userId: string; roleId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Added role to ${json.username}`,
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
        }
      )
    );
  }

  public removeRole(data: { userId: string; roleId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/role`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Removed role from ${json.username}`,
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
        }
      )
    );
  }

  public verify(data: { userId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Verified ${json.username}`,
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
        }
      )
    );
  }

  public unverify(data: { userId: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/verify`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            const json = await res.json();
            if (res.ok) {
              this.adminStore.update(json.id, json);
              const notification = createNotification({
                content: `Unverified ${json.username}`,
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
        }
      )
    );
  }

  public fetchLog() {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/log`, {
      headers: {
        authorization: `Bearer ${userQuery.getValue().token}`
      }
    }).pipe(
      tap(
        {
          next: async (res) => {
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
        }
      )
    );
  }

  public broadcast(data: { text: string, iconLink: string, link: string; }) {
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/admin/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userQuery.getValue().token}`
      },
      body: JSON.stringify(data)
    }).pipe(
      tap(
        {
          next: async (res) => {
            if (res.ok) {
              serverNotificationService.fetchNotifications().subscribe();
              const notification = createNotification({
                content: 'Created broadcast notification',
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
        }
      )
    );
  }
}

export const adminService = new AdminService(adminStore);
