import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
