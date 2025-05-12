import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Message } from '../../../models/message.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-chat-main',
    templateUrl: './chat-main.component.html',
    styleUrls: ['./chat-main.component.scss'],
    imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
})
export class ChatMainComponent {
    // This component is responsible for the main chat interface
    // It will handle displaying messages, sending messages, and other chat-related functionalities
    @Input() messageForm!: FormGroup;
    @Input() currentUser: User = {
        id: 1,
        firstName: '',
        lastName: '',
        email: '',
    };
    @Input() messages: Message[] = [];

    constructor() {}

    ngOnInit(): void {
        console.log('[chat-main.component.ts] ngOnInit');
        console.table(this.messages);
    }

    sendMessage() {}
}
