import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { ChatRoom } from '../models/chat-room.model';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:Y6FZ87f5';
    private currentRoomSubject = new BehaviorSubject<ChatRoom | null>(null);
    public currentRoom$ = this.currentRoomSubject.asObservable();

    mockChatRooms: Observable<ChatRoom[]> = new Observable((observer) => {
        const mockMembers: User[] = [
            {
                id: 1,
                email: 'alice@example.com',
                firstName: 'Alice',
                lastName: 'Smith',
            },
            {
                id: 2,
                email: 'bob@example.com',
                firstName: 'Bob',
                lastName: 'Johnson',
            },
            {
                id: 3,
                email: 'carol@example.com',
                firstName: 'Carol',
                lastName: 'Williams',
            },
        ];
        const mockMessagesGeneral = [
            {
                id: 1,
                content: 'Hello everyone!',
                sender: mockMembers[0],
                roomId: 1,
                timestamp: new Date(Date.now() - 1000 * 60 * 60),
            },
            {
                id: 2,
                content: 'Hi Alice! How are you?',
                sender: mockMembers[1],
                roomId: 1,
                timestamp: new Date(Date.now() - 1000 * 60 * 45),
            },
            {
                id: 3,
                content: "I'm good, thanks Bob!",
                sender: mockMembers[0],
                roomId: 1,
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
            },
            {
                id: 4,
                content: 'Hey everyone, what did I miss?',
                sender: mockMembers[2],
                roomId: 1,
                timestamp: new Date(Date.now() - 1000 * 60 * 10),
            },
        ];
        const mockMessagesRandom = [
            {
                id: 1,
                content: 'Random chat starts here!',
                sender: mockMembers[1],
                roomId: 2,
                timestamp: new Date(Date.now() - 1000 * 60 * 50),
            },
            {
                id: 2,
                content: 'Anyone up for a game?',
                sender: mockMembers[2],
                roomId: 2,
                timestamp: new Date(Date.now() - 1000 * 60 * 40),
            },
            {
                id: 3,
                content: 'Count me in!',
                sender: mockMembers[0],
                roomId: 2,
                timestamp: new Date(Date.now() - 1000 * 60 * 35),
            },
        ];
        const mockRooms: ChatRoom[] = [
            {
                id: 1,
                name: 'General',
                messages: mockMessagesGeneral,
                members: mockMembers,
            },
            {
                id: 2,
                name: 'Random',
                messages: mockMessagesRandom,
                members: mockMembers,
            },
        ];
        observer.next(mockRooms);
        observer.complete();
    });

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    // Get all available chat rooms
    getChatRooms(): Observable<ChatRoom[]> {
        return this.mockChatRooms;
    }

    // Get specific chat room with messages
    getChatRoom(roomId: string): Observable<ChatRoom> {
        console.log(`Fetching chat room with ID: ${roomId}`);
        return new Observable<ChatRoom>((observer) => {
            this.mockChatRooms.subscribe((rooms) => {
                const room = rooms.find((room) => room.id === parseInt(roomId));
                if (room) {
                    this.currentRoomSubject.next(room);
                    observer.next(room);
                } else {
                    observer.error(new Error('Room not found'));
                }
                observer.complete();
            });
        });
    }

    // Join a chat room
    joinRoom(roomId: number, userId: number): void {
        console.log(`User ${userId} joining room ${roomId}`);
    }

    // Get messages for a specific room
    getMessages(roomId: number): Observable<Message[]> {
        return this.mockChatRooms.pipe(
            map((rooms: ChatRoom[]) => {
                const room = rooms.find((room) => room.id === roomId);
                return room ? room.messages : [];
            })
        );
    }

    // Leave a chat room
    /*leaveRoom(roomId: number): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/chat/rooms/${roomId}/leave`,
            {},
            this.getHttpOptions()
        );
    }

    // Send a message in a chat room
    sendMessage(roomId: number, content: string): Observable<Message> {
        return this.http.post<Message>(
            `${this.apiUrl}/chat/rooms/${roomId}/messages`,
            { content },
            this.getHttpOptions()
        );
    }

    // Create a new chat room
    createRoom(name: number): Observable<ChatRoom> {
        return this.http.post<ChatRoom>(
            `${this.apiUrl}/chat/rooms`,
            { name },
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
    } */
}
