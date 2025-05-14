import { Injectable } from '@angular/core';
import {
    ref,
    push,
    onValue,
    off,
    set,
    DatabaseReference,
    Unsubscribe,
} from 'firebase/database';
import { database } from '../../../firebase.config'; // Import the database instance we created
import { Message } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    messagesRef: DatabaseReference;
    private unsubscribeMessages: Unsubscribe | null = null;
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    public messages$ = this.messagesSubject.asObservable();

    constructor() {
        this.messagesRef = ref(database, 'messages');
    }

    /**
     * Subscribe to messages from Firebase
     */
    subscribeToMessages(): void {
        // Prevent multiple subscriptions
        if (this.unsubscribeMessages) {
            return;
        }

        this.unsubscribeMessages = onValue(this.messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messageList: Message[] = [];

            if (data) {
                // Convert object of objects to array
                Object.keys(data).forEach((key) => {
                    const msg = data[key];
                    messageList.push({
                        id: parseInt(key),
                        content: msg.content,
                        user_id: msg.user_id,
                        created_at: new Date(msg.created_at),
                    });
                });
            }

            // Update the BehaviorSubject with the new message list
            this.messagesSubject.next(messageList);
        });
    }

    /**
     * Unsubscribe from message updates
     */
    unsubscribeFromMessages(): void {
        if (this.unsubscribeMessages) {
            this.unsubscribeMessages();
            this.unsubscribeMessages = null;
        }
    }

    /**
     * Send a new message
     * @param content The message content
     * @param userId The user ID
     * @returns Promise that resolves when the message is sent
     */
    sendMessage(content: string, userId: string): Promise<void> {
        // Create a new unique key under the 'messages' reference
        const newMessageRef = push(this.messagesRef);

        // Prepare data for the new message
        const messageData = {
            content: content,
            user_id: userId,
            created_at: new Date().toISOString(),
        };

        // Write the data to the location specified by newMessageRef
        return set(newMessageRef, messageData)
            .then(() => {
                console.log('Message sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                throw error; // Rethrow to allow caller to handle errors
            });
    }
}
