import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:Y6FZ87f5';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    private isBrowser: boolean;

    constructor(
        private http: HttpClient
    ) {
        this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

        // Only access localStorage in browser environment
        if (this.isBrowser) {
            // Check if there's a stored user in localStorage
            const savedUser = localStorage.getItem('currentUser');
            const savedToken = localStorage.getItem('jwtToken');
            if (savedUser && savedToken) {
                const user = JSON.parse(savedUser);
                user.token = savedToken;
                this.currentUserSubject.next(user);
            }
        }
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
            tap(response => {
                if (response && response.jwt) {
                    // Store JWT token
                    const token = response.jwt;

                    // Create user object from JWT payload or additional user info if provided
                    // This is a simplified example, actual implementation may vary based on API
                    const user: User = {
                        id: response.user?.id || 'user_id',
                        email: email,
                        username: response.user?.username || email.split('@')[0],
                        token: token
                    };

                    // Only store in localStorage if in browser environment
                    if (this.isBrowser) {
                        localStorage.setItem('jwtToken', token);
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    this.currentUserSubject.next(user);
                }
            })
        );
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('jwtToken');
        }
        this.currentUserSubject.next(null);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        const hasToken = this.isBrowser ? !!localStorage.getItem('jwtToken') : false;
        return !!this.currentUserSubject.value && hasToken;
    }

    get token(): string | null {
        return this.isBrowser ? localStorage.getItem('jwtToken') : null;
    }
}
