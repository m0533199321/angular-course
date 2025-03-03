import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Token } from './inetrceptors/token';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  provideHttpClient(), provideHttpClient(withInterceptors([Token])), provideAnimationsAsync()
  ]
};
