import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import store from 'store2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl: string;
  constructor(
    @Inject('BACKEND_URL') backendUrl: string,
    private http: HttpClient,
    private router: Router
  ) {
    this.backendUrl = backendUrl;
  }

  login(username: string, password: string) {
    return this.http.post(
      `${this.backendUrl}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
  }

  refreshToken() {
    return this.http.post(
      `${this.backendUrl}/login/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  signOut() {
    store.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const accessToken = store.get('access-token');
    return (
      accessToken !== null && accessToken !== '' && !this.isExpired(accessToken)
    );
  }

  isExpired(accessToken: string) {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(accessToken);
  }

  getUsername() {
    const accessToken = store.get('access-token');
    if (accessToken) {
      const helper = new JwtHelperService();
      const user = helper.decodeToken(accessToken);
      return user.username;
    }
  }

  getToken() {
    return store('access-token');
  }
}
