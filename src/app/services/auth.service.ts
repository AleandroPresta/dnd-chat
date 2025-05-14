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
import { DatabaseReference, ref } from '@angular/fire/database';
import { database } from '../../../firebase.config';
import { user } from '@angular/fire/auth';
import { child, get } from 'firebase/database';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = getAuth(firebaseApp);

    usernameRef: DatabaseReference;

    constructor() {
        this.usernameRef = ref(database, 'users');
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

    getUserNameById(userId: string): Promise<string> {
        const userSpecificRef = child(this.usernameRef, userId);

        return get(userSpecificRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // snapshot.val() will contain all the data for that specific user ID (e.g., { username: '...', email: '...' })
                    console.log(
                        'Data found for user',
                        userId,
                        ':',
                        snapshot.val()
                    );

                    // If you only want a *specific* value under that user (like just the username)
                    const userData = snapshot.val();
                    if (userData && userData.username) {
                        return userData.username;
                    } else {
                        console.log('Username not found for user', userId);
                        alert('Username not found for user ' + userId);
                        throw new Error('Username not found');
                    }
                } else {
                    console.log('No data available for user:', userId);
                    alert('No data available for user ' + userId);
                    throw new Error('No data available');
                }
            })
            .catch((error) => {
                console.error(
                    'Error fetching data for user',
                    userId,
                    ':',
                    error
                );
                alert('Error fetching data for user ' + userId + ': ' + error);
                throw error;
            });
    }
}
