import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';

@Component({
    selector: 'app-chat-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-header.component.html',
    styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
    @Output() logoutEvent = new EventEmitter<void>();

    constructor(private router: Router) {}

    logout(): void {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                this.router.navigate(['/signin']);
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    }
}
