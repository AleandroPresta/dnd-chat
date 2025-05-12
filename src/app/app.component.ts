import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgIf } from '@angular/common';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AuthComponent, ChatComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    componentToShow: 'auth' | 'chat' = 'auth'; // auth in production
    currentUser: User = {
        id: 1,
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@smith.com',
    };

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
