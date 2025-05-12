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

    ngOnInit(): void {
        if (!this.message) {
            console.error('[message.component.ts] message is undefined');
            return;
        }
        // Fetch user data based on user_id
        console.log(
            '[message.component.ts] fetching user data with id:',
            this.message.user_id
        );
        this.authService.getUserById(this.message.user_id).subscribe((user) => {
            console.log(user.first_name, user.last_name);
            this.userFirstName = user.first_name;
            this.userLastName = user.last_name;
        });
    }
}
