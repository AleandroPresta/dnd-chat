import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate: CanActivateFn = (route, state) => {
        const auth = getAuth();
        return new Promise<boolean>((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(true);
                } else {
                    this.router.navigate(['/signin']);
                    resolve(false);
                }
            });
        });
    };
}
