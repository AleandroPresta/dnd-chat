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
    @Input() currentUserId?: string;

    /**
     * Checks if a date is today
     * @param date The date to check
     * @returns True if the date is today, false otherwise
     */
    isToday(date: Date | undefined | null): boolean {
        if (!date) return false;

        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }
}
