import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../../../models/message.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-message-form',
    imports: [ReactiveFormsModule],
    templateUrl: './message-form.component.html',
    styleUrl: './message-form.component.scss',
})
export class MessageFormComponent {
    @Output() messageSent = new EventEmitter<Message>();

    messageForm = new FormGroup({
        content: new FormControl(''),
    });

    sendMessage() {
        const content = this.messageForm.value.content;
        if (!content) {
            return;
        }
        console.log(content);
        // Optionally emit the message
        // this.messageSent.emit({ content } as Message);
        this.messageForm.reset();
    }
}
