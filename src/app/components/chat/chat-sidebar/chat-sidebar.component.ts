import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatRoom } from '../../../models/chat-room.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-chat-sidebar',
    templateUrl: './chat-sidebar.component.html',
    styleUrls: ['./chat-sidebar.component.scss'],
    imports: [ReactiveFormsModule, NgIf, NgFor],
})
export class ChatSidebarComponent {
    // This component is responsible for the sidebar of the chat application
    // It will handle displaying the list of chat rooms, user information, and other sidebar-related functionalities

    @Input() rooms: ChatRoom[] = [];
    @Input() currentRoom: ChatRoom | null = null;
    @Input() loading: { rooms: boolean; messages: boolean; joinRoom: boolean } =
        {
            rooms: false,
            messages: false,
            joinRoom: false,
        };
    @Input() showCreateRoomForm: boolean = false;
    @Input() roomForm!: FormGroup; // TODO use the correct type
    @Input() authService: any; // TODO use the correct type

    joinRoom(roomId: string) {
        console.log(`Joining room with ID: ${roomId}`);
        // Add logic to handle joining a room
    }

    onLogout() {
        console.log('Logging out');
        // Add logic to handle user logout
    }

    toggleCreateRoomForm() {
        this.showCreateRoomForm = !this.showCreateRoomForm;
        console.log(`Toggled create room form: ${this.showCreateRoomForm}`);
        // Add logic to handle toggling the create room form
    }

    createRoom() {
        console.log('Creating a new room');
        // Add logic to handle creating a new room
    }

    constructor() {}
}
