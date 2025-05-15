import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Message } from '../../../models/message.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommandService } from '../../../services/command.service';
import { Command } from '../../../models/command.model';
import { CommandMenuComponent } from '../command-menu/command-menu.component';
import {
    Subscription,
    debounceTime,
    distinctUntilChanged,
    fromEvent,
} from 'rxjs';

@Component({
    selector: 'app-message-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, CommandMenuComponent],
    templateUrl: './message-form.component.html',
    styleUrl: './message-form.component.scss',
})
export class MessageFormComponent implements OnInit {
    @Output() messageSent = new EventEmitter<string>();
    @ViewChild('messageInput') messageInput!: ElementRef;

    messageForm = new FormGroup({
        content: new FormControl(''),
    });

    showCommandMenu = false;
    commands: Command[] = [];
    inputSubscription!: Subscription;

    constructor(private commandService: CommandService) {
        this.commands = this.commandService.getCommands();
    }

    ngOnInit() {
        // Monitor changes to show command menu when "/" is typed
        this.messageForm
            .get('content')
            ?.valueChanges.pipe(debounceTime(100), distinctUntilChanged())
            .subscribe((value) => {
                if (value && typeof value === 'string') {
                    // Show command menu if the input starts with "/"
                    this.showCommandMenu = value.startsWith('/');
                } else {
                    this.showCommandMenu = false;
                }
            });
    }

    ngAfterViewInit() {
        // Handle keyboard navigation in the command menu
        this.inputSubscription = fromEvent<KeyboardEvent>(
            this.messageInput.nativeElement,
            'keydown'
        ).subscribe((event) => {
            if (!this.showCommandMenu) return;

            // Handle keyboard navigation
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();

                const commandMenu = document.querySelector(
                    'app-command-menu'
                ) as any;
                if (commandMenu) {
                    if (event.key === 'ArrowDown') {
                        commandMenu.selectNextCommand();
                    } else {
                        commandMenu.selectPreviousCommand();
                    }
                }
            } else if (event.key === 'Tab' || event.key === 'Enter') {
                // Complete the selected command
                if (this.showCommandMenu) {
                    event.preventDefault();
                    const commandMenu = document.querySelector(
                        'app-command-menu'
                    ) as any;
                    if (commandMenu) {
                        const selectedCommand =
                            commandMenu.getSelectedCommand();
                        if (selectedCommand) {
                            this.onCommandSelected(selectedCommand);
                        }
                    }
                }
            } else if (event.key === 'Escape') {
                this.showCommandMenu = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.inputSubscription) {
            this.inputSubscription.unsubscribe();
        }
    }

    sendMessage() {
        const content = this.messageForm.value.content;
        if (!content) {
            return;
        }

        // Check if the message is a command
        if (content.startsWith('/')) {
            const parts = content.split(' ');
            const commandText = parts[0].substring(1); // Remove the '/'
            const command = this.commands.find((cmd) => cmd.id === commandText);

            if (command) {
                const params = parts.slice(1).join(' ');
                this.commandService.executeCommand(command.id, params);
                this.messageForm.reset();
                return;
            }
        }

        this.messageSent.emit(content);
        this.messageForm.reset();
    }

    onCommandSelected(command: Command) {
        this.messageForm.patchValue({ content: command.name + ' ' });
        this.showCommandMenu = false;
        // Focus on the input field and place cursor at the end
        setTimeout(() => {
            this.messageInput.nativeElement.focus();
            const length = this.messageInput.nativeElement.value.length;
            this.messageInput.nativeElement.setSelectionRange(length, length);
        });
    }
}
