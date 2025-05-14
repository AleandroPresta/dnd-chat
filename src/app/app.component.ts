import { Component, Input, OnInit } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgIf } from '@angular/common';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [SigninComponent, ChatComponent, NgIf],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    componentToShow: 'signin' | 'chat' = 'signin'; // signin is now default
    currentUser: User = {
        id: 1,
        first_name: 'Alice',
        last_name: 'Smith',
        email: 'alice@smith.com',
    };

    ngOnInit(): void {
        // You can add logic here if needed
    }

    onAuthenticated(): void {
        this.componentToShow = 'chat';
    }

    onLogout(): void {
        this.componentToShow = 'signin';
    }
}
