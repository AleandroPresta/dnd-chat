import { Component, Input } from "@angular/core";
import { ChatRoom } from '../../../models/chat-room.model';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-chat-sidebar",
    templateUrl: "./chat-sidebar.component.html",
    styleUrls: ["./chat-sidebar.component.scss"],
    imports: [
        ReactiveFormsModule
    ],
})
export class ChatSidebarComponent {
    // This component is responsible for the sidebar of the chat application
    // It will handle displaying the list of chat rooms, user information, and other sidebar-related functionalities

    @Input() rooms: ChatRoom[] = [];
    @Input() currentRoom: ChatRoom | null = null;
    @Input() loading: { rooms: boolean; messages: boolean; joinRoom: boolean } = {
        rooms: false,
        messages: false,
        joinRoom: false,
    };
    @Input() error: string | null = null;
    @Input() showCreateRoomForm: boolean = false;
    @Input() roomForm!: FormGroup; // TODO use the correct type
    @Input() authService: any; // TODO use the correct type

    joinRoom(roomId: string) {}

    onLogout() {}

    toggleCreateRoomForm() {}
    createRoom() {} 

    constructor() {}
}