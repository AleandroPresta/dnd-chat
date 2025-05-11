import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatRoom } from '../models/chat-room.model';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:Y6FZ87f5';
    private currentRoomSubject = new BehaviorSubject<ChatRoom | null>(null);
    public currentRoom$ = this.currentRoomSubject.asObservable();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    // Get all available chat rooms
    getChatRooms(): Observable<ChatRoom[]> {
        return this.http.get<ChatRoom[]>(
            `${this.apiUrl}/chat/rooms`,
            this.getHttpOptions()
        );
    }

    // Get specific chat room with messages
    getChatRoom(roomId: string): Observable<ChatRoom> {
        return this.http.get<ChatRoom>(
            `${this.apiUrl}/chat/rooms/${roomId}`,
            this.getHttpOptions()
        );
    }

    // Join a chat room
    joinRoom(roomId: string): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/chat/rooms/${roomId}/join`,
            {},
            this.getHttpOptions()
        );
    }

    // Leave a chat room
    leaveRoom(roomId: string): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/chat/rooms/${roomId}/leave`,
            {},
            this.getHttpOptions()
        );
    }

    // Send a message in a chat room
    sendMessage(roomId: string, content: string): Observable<Message> {
        return this.http.post<Message>(
            `${this.apiUrl}/chat/rooms/${roomId}/messages`,
            { content },
            this.getHttpOptions()
        );
    }

    // Get messages for a specific room
    getMessages(roomId: string): Observable<Message[]> {
        return this.http.get<Message[]>(
            `${this.apiUrl}/chat/rooms/${roomId}/messages`,
            this.getHttpOptions()
        );
    }

    // Create a new chat room
    createRoom(name: string, description?: string): Observable<ChatRoom> {
        return this.http.post<ChatRoom>(
            `${this.apiUrl}/chat/rooms`,
            { name, description },
            this.getHttpOptions()
        );
    }

    // Set current active room
    setCurrentRoom(room: ChatRoom): void {
        this.currentRoomSubject.next(room);
    }

    // Clear current room on exit
    clearCurrentRoom(): void {
        this.currentRoomSubject.next(null);
    }

    // Helper to get HTTP options with auth token
    private getHttpOptions() {
        const token = this.authService.token;
        if (!token) {
            return {};
        }

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        };
    }
}
