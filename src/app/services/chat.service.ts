import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:Y6FZ87f5';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getMessages(): Message[] {
        return [
            {
                id: 1,
                content: 'Hello, how are you?',
                senderId: 1,
                timestamp: new Date(),
            },
            {
                id: 2,
                content: 'I am fine, thank you!',
                senderId: 2,
                timestamp: new Date(),
            },
        ];
    }
}
