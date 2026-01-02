import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/authService';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const token = auth.getToken();
    let requestToSend = req;

    if (token) {
        requestToSend = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    // Catch Error 401 and return to login page
    return next(requestToSend).pipe(
        catchError((err: any) => {
            if (err?.status === 401) {
                auth.clearToken();

                // tránh loop nếu đang ở trang login
                if (!router.url.startsWith('/login')) {
                    router.navigate(['/login']);
                }
            }
            return throwError(() => err);
        })
    );
};