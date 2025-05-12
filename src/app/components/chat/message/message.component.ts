import { Component, Input } from '@angular/core';
import { Message } from '../../../models/message.model';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-message',
    imports: [],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
})
export class MessageComponent {
    @Input() message?: Message;
    userFirstName: string = '';
    userLastName: string = '';

    constructor(private authService: AuthService) {
        if (!this.message) {
            console.error('[message.component.ts] message is undefined');
            return;
        }
        // Fetch user data based on senderId
        console.log(
            '[message.component.ts] fetching user data with id:',
            this.message.senderId
        );
        this.authService
            .getUserById(this.message.senderId)
            .subscribe((user) => {
                this.userFirstName = user.firstName;
                this.userLastName = user.lastName;
            });
    }
}
