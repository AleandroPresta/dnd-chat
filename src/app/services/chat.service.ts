import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

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
        return this.http.get<Message[]>(this.API_URL);
    }
}
