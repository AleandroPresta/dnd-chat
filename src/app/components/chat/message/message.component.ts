import { Component, Input } from '@angular/core';
import { Message } from '../../../models/message.model';
import { AuthService } from '../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-message',
    imports: [DatePipe],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
})
export class MessageComponent {
    @Input() message?: Message;
    userFirstName: string = '';
    userLastName: string = '';

    constructor(private authService: AuthService) {}
}
