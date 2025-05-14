import { Injectable } from '@angular/core';
import { ref, push, onValue, off, DatabaseReference } from 'firebase/database';
import { database } from '../../../firebase.config'; // Import the database instance we created

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    messagesRef: DatabaseReference;

    constructor() {
        this.messagesRef = ref(database, 'messages');
    }
}
