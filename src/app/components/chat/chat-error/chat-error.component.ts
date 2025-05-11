import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-error',
  templateUrl: './chat-error.component.html',
  styleUrls: ['./chat-error.component.scss'],
  imports: [NgIf],
})
export class ChatErrorComponent {
  // This component is responsible for displaying error messages in the chat interface
  // It will handle displaying error messages and other error-related functionalities

  @Input() error: string | null = null;

  constructor() {}
}
