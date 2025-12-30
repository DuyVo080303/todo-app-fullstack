import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../duy';
import { LoginDto } from '../../features/auth/models/login.dto';
import { RegisterDto } from '../../features/auth/models/register.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private baseUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'accessToken';

    login(data: LoginDto) {
        return this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, data);
    }

    register(data: RegisterDto) {
        return this.http.post(`${this.baseUrl}/register`, data);
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    clearToken() {
        localStorage.removeItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout() {
        this.clearToken();
        this.router.navigate(['/auth/login']);
    }
}

