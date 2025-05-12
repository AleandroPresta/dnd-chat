import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageComponent } from './message/message.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [CommonModule, MessageFormComponent, MessageComponent],
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
        this.loadMessages();
        // this.startMessagePolling(this.userId);
    }

    loadMessages() {
        this.chatService.getMessages().subscribe((messages) => {
            this.messages = messages;
            // this.scrollToBottom();
        });
    }

    onSendMessage(message: Message): void {
        console.log(`[chat.component.ts] onSendMessage:`);
        console.table(message);
        this.messages.push(message);
    }

    onLogout(): void {
        this.authService.logout();
        this.logout.emit();
    }

    trackByMessageId(index: number, message: Message) {
        return message.id;
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
