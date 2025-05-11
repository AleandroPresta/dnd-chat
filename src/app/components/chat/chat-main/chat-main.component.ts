import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatRoom } from '../../../models/chat-room.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
  imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
})
export class ChatMainComponent {
  // This component is responsible for the main chat interface
  // It will handle displaying messages, sending messages, and other chat-related functionalities

  @Input() currentRoom!: ChatRoom | null;
  @Input() messages!: any[];
  @Input() loading!: any; // TODO use the correct type
  @Input() authService!: any;
  @Input() messageForm!: FormGroup;

  constructor() {}

  sendMessage() {}

  leaveRoom() {}
}
