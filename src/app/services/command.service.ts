import { Injectable } from '@angular/core';
import { Command } from '../models/command.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class CommandService {
    private commands: Command[] = [
        {
            id: 'roll',
            name: '/roll',
            description: 'Roll a dice (e.g., /roll d20)',
            action: (params?: string) => this.rollDice(params),
        },
        {
            id: 'character',
            name: '/character',
            description: 'Show character sheet',
            action: () => this.showCharacter(),
        },
        {
            id: 'help',
            name: '/help',
            description: 'Show available commands',
            action: () => this.showHelp(),
        },
        {
            id: 'whisper',
            name: '/whisper',
            description:
                'Send a private message (e.g., /whisper @username message)',
            action: (params?: string) => this.whisperMessage(params),
        },
        {
            id: 'clear',
            name: '/clear',
            description: 'Clear current chat',
            action: () => this.clearChat(),
        },
    ];

    private showCommandsSubject = new BehaviorSubject<boolean>(false);
    showCommands$ = this.showCommandsSubject.asObservable();
    private systemUserName: string = 'DND Bot';
    private systemUserId: string = 'system-bot-id';

    constructor(
        private chatService: ChatService,
        private authService: AuthService
    ) {
        // Initialize system user
    }

    getCommands(): Command[] {
        return this.commands;
    }

    showCommandMenu(show: boolean): void {
        this.showCommandsSubject.next(show);
    }

    filterCommands(query: string): Command[] {
        if (!query || query === '/') {
            return this.commands;
        }

        const lowerCaseQuery = query.toLowerCase().substring(1); // Remove the '/' character
        return this.commands.filter(
            (command) =>
                command.name
                    .toLowerCase()
                    .substring(1)
                    .includes(lowerCaseQuery) ||
                command.description.toLowerCase().includes(lowerCaseQuery)
        );
    }

    executeCommand(commandId: string, params?: string): void {
        const command = this.commands.find((cmd) => cmd.id === commandId);
        if (command && command.action) {
            command.action(params);
        }
        // Command execution will be implemented in a future update
        console.log(`Executing command: ${commandId} with params: ${params}`);
    }

    // Command action implementations
    private rollDice(params?: string): void {
        if (!params) {
            console.log('Rolling default d20 dice...');
            const result = Math.floor(Math.random() * 20) + 1;
            this.sendSystemMessage(`🎲 Rolled d20: ${result}`);
            return;
        }

        // Handle different dice types (d4, d6, d8, d10, d12, d20, etc.)
        const diceMatch = params.match(/d(\d+)/i);
        if (diceMatch && diceMatch[1]) {
            const sides = parseInt(diceMatch[1], 10);
            const result = Math.floor(Math.random() * sides) + 1;
            this.sendSystemMessage(`🎲 Rolled ${params}: ${result}`);
        } else {
            this.sendSystemMessage(
                'Invalid dice format. Use /roll d20, d12, d10, d8, d6, or d4.'
            );
        }
    }

    private showCharacter(): void {
        this.sendSystemMessage('Character sheet feature coming soon!');
        // In a real implementation, you would navigate to a character sheet page
        // or open a modal with character information
    }

    private showHelp(): void {
        let helpText = 'Available Commands:\n';
        this.commands.forEach((cmd) => {
            helpText += `\n${cmd.name} - ${cmd.description}`;
        });
        this.sendSystemMessage(helpText);
    }

    private whisperMessage(params?: string): void {
        if (!params) {
            this.sendSystemMessage('Usage: /whisper @username your message');
            return;
        }

        // Simple implementation - in a real app, you'd implement proper private messaging
        const match = params.match(/@(\w+)\s+(.*)/);
        if (match && match[1] && match[2]) {
            const username = match[1];
            const message = match[2];
            this.sendSystemMessage(
                `Private message to ${username}: ${message}`
            );
        } else {
            this.sendSystemMessage(
                'Invalid format. Use: /whisper @username your message'
            );
        }
    }

    private clearChat(): void {
        this.sendSystemMessage('Chat cleared feature coming soon!');
        // In a real implementation, you would implement proper chat clearing functionality
    }

    // Helper method to send a system message to the chat
    private sendSystemMessage(content: string): void {
        this.chatService
            .sendMessage(content, this.systemUserId, this.systemUserName)
            .catch((error) => {
                console.error('Error sending system message:', error);
            });
    }
}
