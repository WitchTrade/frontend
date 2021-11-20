import dayjs from 'dayjs';
import { DecodedToken } from '../stores/user/user.model';
import jwt_decode from 'jwt-decode';
import { fromFetch } from 'rxjs/fetch';
import { notificationService } from '../stores/notification/notification.service';
import { userService } from '../stores/user/user.service';
import { createNotification } from '../stores/notification/notification.model';
import { mergeMap, of } from 'rxjs';

class AuthService {
  private _token = '';
  private _refreshToken = '';

  public init() {
    const token = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : sessionStorage.getItem('jwt');
    const refreshToken = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : sessionStorage.getItem('refreshToken');
    if (!refreshToken || !token) {
      return false;
    };

    this._token = token as string;
    this._refreshToken = refreshToken as string;

    // Decode refresh token and check if it's still valid
    const decodedRefreshToken = jwt_decode<DecodedToken>(this._refreshToken);
    if (dayjs().add(1, 'minute').isAfter(dayjs.unix(decodedRefreshToken.exp))) {
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('refreshToken');
      return false;
    }

    return true;
  }

  public setTokens(token: string, refreshToken: string, stayLoggedIn?: boolean) {
    this._token = token;
    this._refreshToken = refreshToken;
    if (stayLoggedIn || localStorage.getItem('jwt')) {
      localStorage.setItem('jwt', this._token);
      localStorage.setItem('refreshToken', this._refreshToken);
    } else {
      sessionStorage.setItem('jwt', this._token);
      sessionStorage.setItem('refreshToken', this._refreshToken);
    }
  }

  public request(url: string, init?: RequestInit) {
    return this._getValidToken().pipe(mergeMap(token => {
      if (token) {
        if (!init) {
          init = {};
        }
        if (!init.headers) {
          init.headers = {};
        }
        init.headers['authorization'] = `Bearer ${token}`;
      }
      return fromFetch(url, init);
    }));
  }

  private _getValidToken() {
    if (!this._token) {
      return of('');
    }
    const decodedToken = jwt_decode<DecodedToken>(this._token);
    if (!dayjs().add(1, 'minute').isAfter(dayjs.unix(decodedToken.exp))) {
      return of(this._token);
    }
    return this._refreshTokenMethod();
  }

  private _refreshTokenMethod() {
    // login user and save info to store
    return fromFetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          token: this._token,
          refreshToken: this._refreshToken
        }
      )
    }).pipe(
      mergeMap(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          const notification = createNotification({
            content: json.message,
            duration: 5000,
            type: 'error'
          });
          notificationService.addNotification(notification);
          userService.logout(true);
        }
        this._token = json.token;
        this._refreshToken = json.refreshToken;
        if (localStorage.getItem('jwt')) {
          localStorage.setItem('jwt', this._token);
          localStorage.setItem('refreshToken', this._refreshToken);
        } else {
          sessionStorage.setItem('jwt', this._token);
          sessionStorage.setItem('refreshToken', this._refreshToken);
        }
        return this._token;
      })
    );
  }

}

const authService = new AuthService();
export default authService;
