import {
    Component,
    EventEmitter,
    OnInit,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { ChatService } from '../../services/chat.service';

import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';
import { MessageComponent } from './message/message.component';
import { Subscription } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { ChatHeaderComponent } from './chat-header/chat-header.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MessageComponent,
        ChatHeaderComponent,
    ],
})
export class ChatComponent implements OnInit, OnDestroy {
    @Output() logout = new EventEmitter<void>();

    messages: Message[] = [];
    messageForm: FormGroup;
    currentUserId: string = '';
    private messageSubscription: Subscription | null = null;

    constructor(
        private fb: FormBuilder,
        private chatService: ChatService,
        private authService: AuthService
    ) {
        this.messageForm = this.fb.group({
            content: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // Subscribe to messages
        this.chatService.subscribeToMessages();
        this.messageSubscription = this.chatService.messages$.subscribe(
            (messages) => {
                this.messages = messages;
            }
        );

        // Get current user ID from Firebase Auth
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            this.currentUserId = user.uid;
        }
    }

    ngOnDestroy(): void {
        // Clean up subscriptions when component is destroyed
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        this.chatService.unsubscribeFromMessages();
    }

    // Helper function to convert string UID to a number
    private hashStringToNumber(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Send a new message
     */
    sendMessage(): void {
        if (this.messageForm.valid) {
            const content = this.messageForm.value.content;
            this.authService
                .getUserNameById(this.currentUserId)
                .then((userName: string) => {
                    this.chatService
                        .sendMessage(content, this.currentUserId, userName)
                        .then(() => {
                            this.messageForm.reset();
                        })
                        .catch((error) => {
                            console.error('Error sending message:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error fetching user name:', error);
                });
        }
    }
}
