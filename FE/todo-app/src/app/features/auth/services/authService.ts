import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginDto } from '../models/login.dto';
import { RegisterDto } from '../models/register.dto';
import { tap, map } from 'rxjs/operators';

type LoginBody = { success: boolean; data: { access_token: string } };

// Connect the FE with backend API
// 1. Create the property that point to the BE url (base apiURL)
// 2. Define the method that actually make HTTP call 
// 3. Connect the serve to the component
@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    // 1. 
    private baseUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'access_token';


    //2.
    //Syntax: http.post<Config>('/api/config', newConfig)
    // Server trả về 1 access có shape là { accessToken: string } response.accessToken
    // This method accept the loginDTo object and send it to the BE serve 
    // login(data: LoginDto) {
    //     return this.http.post<{ accessToken: string }>(`${this.baseUrl}/login`, data, {
    //         observe: 'response',
    //     });
    // }
    login(data: LoginDto) {
        return this.http
            .post<LoginBody>(`${this.baseUrl}/login`, data, { observe: 'response' })
            .pipe(
                tap((res) => {
                    const token = res.body?.data?.access_token;
                    if (token) this.setToken(token);
                })
            );
    }


    register(data: RegisterDto) {
        return this.http.post(`${this.baseUrl}/register`, data, {
            observe: 'response',
        });
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
        this.router.navigate(['/login']);
    }
}

