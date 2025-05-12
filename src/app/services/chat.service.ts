import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
    catchError,
    delay,
    retryWhen,
    switchMap,
    throwError,
    timer,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:DzvuDCJG/messages';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getMessages(): Observable<Message[]> {
        return this.http.get<Message[]>(this.API_URL).pipe(
            retryWhen((errors) =>
                errors.pipe(
                    switchMap((error) => {
                        if (
                            error?.error?.code ===
                            'ERROR_CODE_TOO_MANY_REQUESTS'
                        ) {
                            console.log('Waiting API limit');
                            return timer(20000); // wait 20 seconds
                        }
                        return throwError(() => error);
                    })
                )
            )
        );
    }

    sendMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(this.API_URL, message).pipe(
            retryWhen((errors) =>
                errors.pipe(
                    switchMap((error) => {
                        if (
                            error?.error?.code ===
                            'ERROR_CODE_TOO_MANY_REQUESTS'
                        ) {
                            console.log('Waiting API limit');
                            return timer(20000); // wait 20 seconds
                        }
                        return throwError(() => error);
                    })
                )
            )
        );
    }
}
