import { Component, Input } from '@angular/core';
import { Message } from '../../../models/message.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [CommonModule, DatePipe],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
})
export class MessageComponent {
    @Input() message?: Message;
}
