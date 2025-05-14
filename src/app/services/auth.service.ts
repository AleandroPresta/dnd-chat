import { Injectable } from '@angular/core';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    User,
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

    /**
     * Gets the current user if signed in
     * @returns Promise that resolves with the current user or null if not signed in
     */
    getCurrentUser(): Promise<User | null> {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                unsubscribe(); // Unsubscribe once we get the auth state
                resolve(user);
            });
        });
    }

    /**
     * Checks if a user is currently signed in
     * @returns Promise that resolves to true if user is signed in, false otherwise
     */
    isSignedIn(): Promise<boolean> {
        return this.getCurrentUser().then((user) => !!user);
    }
}
