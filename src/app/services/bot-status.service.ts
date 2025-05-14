import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interface for the Window object that includes our custom __env__ property
interface WindowWithEnv extends Window {
    __env__?: {
        HUGGINGFACE_API_KEY?: string;
        enableDebug?: boolean;
    };
}

@Injectable({
    providedIn: 'root',
})
export class BotStatusService {
    private isOnlineSubject = new BehaviorSubject<boolean>(false);
    public isOnline$ = this.isOnlineSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkBotStatus();
    }

    private checkBotStatus(): void {
        // Check if we can access the HUGGINGFACE_API_KEY from window.__env__
        const windowWithEnv = window as WindowWithEnv;
        const apiKey = windowWithEnv.__env__?.HUGGINGFACE_API_KEY;

        if (apiKey && apiKey.trim() !== '') {
            console.log('HUGGINGFACE_API_KEY is loaded successfully');
            this.isOnlineSubject.next(true);
        } else {
            console.log(
                'HUGGINGFACE_API_KEY is not available or empty, checking fallback...'
            );

            // Fallback: Make a simple status check request to verify if we can access the bot API
            this.http.get('/assets/bot-status.json').subscribe({
                next: (response) => {
                    console.log('Bot status check succeeded', response);

                    // If we can access the endpoint but no API key, we'll still consider the bot online
                    // but this is just for development environments
                    this.isOnlineSubject.next(true);
                },
                error: (err) => {
                    console.error(
                        'Bot status check failed, bot is offline',
                        err
                    );
                    this.isOnlineSubject.next(false);
                },
            });
        }
    }

    public getBotStatus(): boolean {
        return this.isOnlineSubject.value;
    }
}
