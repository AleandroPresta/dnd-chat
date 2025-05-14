import { Injectable } from '@angular/core';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import { firebaseApp } from '../../../firebase.config';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = getAuth(firebaseApp);

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

    login(
        email: string,
        password: string,
        rememberMe: boolean = false
    ): Promise<any> {
        // Set the appropriate persistence type based on the rememberMe flag
        const persistenceType = rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence;

        // First set the persistence, then sign in
        return setPersistence(this.auth, persistenceType)
            .then(() => {
                return signInWithEmailAndPassword(this.auth, email, password);
            })
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
