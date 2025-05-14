import { Injectable } from '@angular/core';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = getAuth();

    constructor() {}

    register(email: string, password: string): Promise<any> {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(
                    'Error during registration:',
                    errorCode,
                    errorMessage
                );
                throw error;
            });
    }

    login(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error during login:', errorCode, errorMessage);
                throw error;
            });
    }
}
