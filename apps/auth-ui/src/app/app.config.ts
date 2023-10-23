import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: 'BACKEND_URL', useValue: 'http://localhost:3000/api' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
};
