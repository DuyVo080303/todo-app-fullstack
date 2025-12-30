import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/authService';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }

    return next(req);
};


// import { Injectable } from '@angular/core';
// import {
//     HttpEvent,
//     HttpHandler,
//     HttpInterceptor,
//     HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/authService';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) { }

//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         const token = this.authService.getToken();

//         console.log('🔥 AuthInterceptor RUNNING');
//         console.log('👉 Token:', token);

//         if (token) {
//             req = req.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//         }

//         return next.handle(req);
//     }
// }
