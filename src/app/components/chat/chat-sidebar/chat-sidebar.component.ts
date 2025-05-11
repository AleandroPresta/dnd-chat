import { Component, Input } from '@angular/core';
import { ChatRoom } from '../../../models/chat-room.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChatService } from '../../../services/chat.service';

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
    @Input() roomForm!: FormGroup; // TODO use the correct type
    @Input() userId: number = 0;
    @Input() userFirstName: string = '';
    @Input() userLastName: string = '';

    showCreateRoomModal = false;

    constructor(private chatService: ChatService) {}

    joinRoom(roomId: number, userId: number) {
        this.chatService.joinRoom(roomId, userId);
    }

    onLogout() {
        console.log('Logging out');
        // Add logic to handle user logout
    }

    toggleCreateRoom() {
        this.showCreateRoomModal = !this.showCreateRoomModal;
    }

    createRoom() {
        console.log('Creating a new room');
        // Add logic to handle creating a new room
        this.showCreateRoomModal = false;
    }
}
