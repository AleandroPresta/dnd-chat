import { Component, Input } from "@angular/core";
import { ChatRoom } from '../../../models/chat-room.model';

@Component({
    selector: "app-chat-sidebar",
    templateUrl: "./chat-sidebar.component.html",
    styleUrls: ["./chat-sidebar.component.scss"],
})
export class ChatSidebarComponent {
    // This component is responsible for the sidebar of the chat application
    // It will handle displaying the list of chat rooms, user information, and other sidebar-related functionalities

    @Input() rooms: ChatRoom[] = [];

    constructor() {}
}