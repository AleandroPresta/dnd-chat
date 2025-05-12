import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private API_URL =
        'https://x8ki-letl-twmt.n7.xano.io/api:Y6FZ87f5/auth/login';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Check if there's a stored user in localStorage
        const savedUser = localStorage.getItem('currentUser');
        const savedToken = localStorage.getItem('jwtToken');
        if (savedUser && savedToken) {
            const user = JSON.parse(savedUser);
            user.token = savedToken;
            this.currentUserSubject.next(user);
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.API_URL, { email, password }).pipe(
            tap((response) => {
                if (response && response.jwt) {
                    // Store JWT token
                    const token = response.jwt;

                    // Create user object from JWT payload or additional user info if provided
                    // This is a simplified example, actual implementation may vary based on API
                    const user: User = {
                        id: response.user?.id || 0,
                        email: email,
                        firstName: response.user?.first_name || '',
                        lastName: response.user?.last_name || '',
                        token: token,
                    };

                    localStorage.setItem('jwtToken', token);
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    this.currentUserSubject.next(user);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
        this.currentUserSubject.next(null);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        const hasToken = !!localStorage.getItem('jwtToken');
        return !!this.currentUserSubject.value && hasToken;
    }

    get token(): string | null {
        return localStorage.getItem('jwtToken');
    }
}
