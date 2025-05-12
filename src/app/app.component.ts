import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AuthComponent, ChatComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    componentToShow: 'auth' | 'chat' = 'chat'; // auth in production
    @Input() userId: number = 1; // TODO: Replace with 0 in production
    @Input() userFirstName: string = 'Alice'; // TODO: Replace with '' in production
    @Input() userLastName: string = 'Smith'; // TODO: Replace with '' in production

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        // Check if user is already logged in
        if (this.authService.isLoggedIn) {
            this.componentToShow = 'chat';
        }
    }

    onAuthenticated(): void {
        this.componentToShow = 'chat';
    }

    onLogout(): void {
        this.componentToShow = 'auth';
    }
}
