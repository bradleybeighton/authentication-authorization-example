import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import store from 'store2';
import { AuthService } from '../services/auth.service';
import { Observable, map, of } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const token = store.get('access-token');
    try {
      if (token) {
        // need to check that the token is still valid
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
          return this.authService.refreshToken().pipe(
            map((token: any) => {
              // Store the user's authentication token in local storage.
              store.set('access-token', token.accessToken);

              return true;
            })
          );
          
        } else {
          return of(true);
        }
      } else {
        this.navigateToLogin();
        return of(false);
      }
    } catch (ex) {
      this.navigateToLogin();
      return of(false);;
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
