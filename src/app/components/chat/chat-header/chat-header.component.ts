import {
    Component,
    EventEmitter,
    Output,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { BotStatusService } from '../../../services/bot-status.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-header.component.html',
    styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent implements OnInit, OnDestroy {
    @Output() logoutEvent = new EventEmitter<void>();
    botOnline: boolean = false;
    private statusSubscription: Subscription | null = null;

    constructor(
        private router: Router,
        private botStatusService: BotStatusService
    ) {}

    ngOnInit(): void {
        // Subscribe to bot status changes
        this.statusSubscription = this.botStatusService.isOnline$.subscribe(
            (status) => {
                this.botOnline = status;
            }
        );
    }

    ngOnDestroy(): void {
        // Clean up subscriptions
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
    }

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
