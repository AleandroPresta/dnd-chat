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
export class ChatComponent {
    @Output() logout = new EventEmitter<void>();

    messages: Message[] = [];
    // messagePolling: Subscription | undefined;
    messageForm: FormGroup;
    @Input() currentUser: User = {
        id: 0,
        first_name: '',
        last_name: '',
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
}
