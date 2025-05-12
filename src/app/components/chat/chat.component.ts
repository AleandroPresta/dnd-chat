import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [CommonModule, ChatMainComponent],
})
export class ChatComponent implements OnInit {
    @Output() logout = new EventEmitter<void>();

    messages: Message[] = [];
    // messagePolling: Subscription | undefined;
    messageForm: FormGroup;
    @Input() currentUser: User = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
    };

    constructor(
        private fb: FormBuilder,
        private chatService: ChatService,
        public authService: AuthService
    ) {
        this.messageForm = this.fb.group({
            content: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        console.log('[chat.component.ts] ngOnInit');
        this.messages = this.loadMessages();
        // this.startMessagePolling(this.userId);
    }

    ngOnDestroy(): void {
        // this.stopMessagePolling();
    }

    loadMessages(): Message[] {
        const messages = this.chatService.getMessages();
        console.table(`[chat.component.ts] loadMessages:`);
        console.table(messages);
        return messages;
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

    onLogout(): void {
        this.authService.logout();
        this.logout.emit();
    }

    /* private scrollToBottom(): void {
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
            .pipe(switchMap(() => this.chatService.getMessages()))
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
    } */

    /*private stopMessagePolling(): void {
        if (this.messagePolling) {
            this.messagePolling.unsubscribe();
            this.messagePolling = undefined;
        }
    }*/
}
