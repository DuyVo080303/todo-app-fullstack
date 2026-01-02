import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.component.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './features/auth/interceptors/auth.interceptor';

// API Integration 1. Create HTTP Clients
//  2. Create the CONFIG API  (environemnts)
//  3. Create authService (DUE to using Auth feature) authService.ts (store API Logic) Call API
// 4. Call API into Login From and Register Form
// 5. Interceptor to standardize input  and sign interceptor 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};

