import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../../../models/message.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-message-form',
    imports: [ReactiveFormsModule],
    templateUrl: './message-form.component.html',
    styleUrl: './message-form.component.scss',
})
export class MessageFormComponent {
    @Output() messageSent = new EventEmitter<Message>();

    message = new FormControl('');

    sendMessage() {
        if (!this.message.value) {
            return;
        }
        const content = this.message.value.trim();
        if (content.trim()) {
            const message: Message = {
                id: Date.now(),
                content,
                senderId: 1, // TODO Replace with actual sender ID
                createdAt: new Date(),
            };
            this.messageSent.emit(message);
        }
    }
}
