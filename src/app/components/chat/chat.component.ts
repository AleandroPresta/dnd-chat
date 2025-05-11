import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { ChatRoom } from '../../models/chat-room.model';
import { Message } from '../../models/message.model';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatErrorComponent } from './chat-error/chat-error.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ChatMainComponent,
        ChatSidebarComponent,
    ],
})
export class ChatComponent implements OnInit {
    @Output() logout = new EventEmitter<void>();

    rooms: ChatRoom[] = [];
    currentRoom: ChatRoom | null = null;
    messages: Message[] = [];
    messageForm: FormGroup;
    roomForm: FormGroup;
    messagePolling?: Subscription;
    @Input() userId: number = 1; // TODO: Replace with 0 in production

    constructor(
        private fb: FormBuilder,
        private chatService: ChatService,
        public authService: AuthService
    ) {
        this.messageForm = this.fb.group({
            content: ['', Validators.required],
        });

        this.roomForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        });
    }

    ngOnInit(): void {
        this.loadRooms();

        // Subscribe to current room changes
        this.chatService.currentRoom$.subscribe((room) => {
            if (room && room !== this.currentRoom) {
                this.currentRoom = room;
                this.loadMessages(room.id);

                // Start polling for new messages
                this.startMessagePolling(room.id);
            } else if (!room) {
                this.currentRoom = null;
                this.stopMessagePolling();
            }
        });
    }

    ngOnDestroy(): void {
        this.stopMessagePolling();
    }

    loadRooms(): void {
        this.chatService.getChatRooms().subscribe({
            next: (rooms) => {
                this.rooms = rooms;
            },
            error: (error) => {
                console.error('Error loading rooms:', error);
            },
        });
    }

    joinRoom(event: any, userId: number): void {
        this.chatService.joinRoom(event, userId);
    }

    loadMessages(roomId: number): void {
        /* this.chatService.getMessages(roomId).subscribe({
            next: (messages) => {
                this.messages = messages;
                this.loading.messages = false;
                this.scrollToBottom();
            },
            error: (error) => {
                this.error = 'Failed to load messages';
                this.loading.messages = false;
                console.error('Error loading messages:', error);
            },
        }); */
        console.log('Loading messages for room:', roomId);
    }

    leaveRoom(): void {
        /*if (this.currentRoom) {
            this.chatService.leaveRoom(this.currentRoom.id).subscribe({
                next: () => {
                    this.chatService.clearCurrentRoom();
                    this.loadRooms(); // Reload rooms to get updated membership status
                },
                error: (error) => {
                    this.error = 'Failed to leave room';
                    console.error('Error leaving room:', error);
                },
            });
        } */
        console.log('Leaving room:', this.currentRoom?.id);
    }

    sendMessage(): void {
        /*if (this.messageForm.valid && this.currentRoom) {
            const content = this.messageForm.value.content;

            this.chatService
                .sendMessage(this.currentRoom.id, content)
                .subscribe({
                    next: (newMessage) => {
                        this.messages.push(newMessage);
                        this.messageForm.reset();
                        this.scrollToBottom();
                    },
                    error: (error) => {
                        this.error = 'Failed to send message';
                        console.error('Error sending message:', error);
                    },
                });
        } */
        console.log('Sending message:', this.messageForm.value.content);
    }

    createRoom(): void {
        /*if (this.roomForm.valid) {
            const { name, description } = this.roomForm.value;

            this.chatService.createRoom(name, description).subscribe({
                next: (newRoom) => {
                    this.rooms.push(newRoom);
                    this.showCreateRoomForm = false;
                    this.roomForm.reset();
                },
                error: (error) => {
                    this.error = 'Failed to create room';
                    console.error('Error creating room:', error);
                },
            });
        } */
        console.log('Creating room:', this.roomForm.value.name);
    }

    onLogout(): void {
        this.authService.logout();
        this.logout.emit();
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            const messageContainer =
                document.querySelector('.message-container');
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight;
            }
        }, 100);
    }

    private startMessagePolling(roomId: number): void {
        // Stop any existing polling
        this.stopMessagePolling();

        // Poll for new messages every 5 seconds
        this.messagePolling = interval(5000)
            .pipe(switchMap(() => this.chatService.getMessages(roomId)))
            .subscribe((messages) => {
                this.messages = messages;
                // Only scroll if we're already at the bottom
                const messageContainer =
                    document.querySelector('.message-container');
                if (messageContainer) {
                    const isScrolledToBottom =
                        messageContainer.scrollHeight -
                            messageContainer.clientHeight <=
                        messageContainer.scrollTop + 100;
                    if (isScrolledToBottom) {
                        this.scrollToBottom();
                    }
                }
            });
    }

    private stopMessagePolling(): void {
        if (this.messagePolling) {
            this.messagePolling.unsubscribe();
            this.messagePolling = undefined;
        }
    }
}
