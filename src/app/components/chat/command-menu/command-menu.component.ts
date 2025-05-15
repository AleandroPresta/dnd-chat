import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Command } from '../../../models/command.model';

@Component({
    selector: 'app-command-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="isVisible" class="command-menu-container">
            <div class="command-menu">
                <div class="command-header">Available Commands</div>
                <div class="commands-list">
                    <div
                        *ngFor="let command of filteredCommands; let i = index"
                        class="command-item"
                        [class.active]="selectedIndex === i"
                        (click)="selectCommand(command)"
                    >
                        <div class="command-name">{{ command.name }}</div>
                        <div class="command-description">
                            {{ command.description }}
                        </div>
                    </div>
                    <div
                        *ngIf="filteredCommands.length === 0"
                        class="no-commands"
                    >
                        No commands match your search
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .command-menu-container {
                position: absolute;
                bottom: 100%;
                left: 0;
                width: 100%;
                padding-bottom: 8px;
            }

            .command-menu {
                background-color: #2a303c;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                max-height: 250px;
                display: flex;
                flex-direction: column;
            }

            .command-header {
                padding: 10px 16px;
                font-weight: 600;
                color: #a6adba;
                background-color: #242933;
                border-bottom: 1px solid #333c4d;
            }

            .commands-list {
                overflow-y: auto;
                padding: 4px 0;
            }

            .command-item {
                padding: 8px 16px;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .command-item:hover,
            .command-item.active {
                background-color: #374151;
            }

            .command-name {
                font-weight: 500;
                color: #e2e8f0;
                margin-bottom: 2px;
            }

            .command-description {
                font-size: 0.85rem;
                color: #94a3b8;
            }

            .no-commands {
                padding: 12px 16px;
                color: #94a3b8;
                text-align: center;
                font-style: italic;
            }
        `,
    ],
})
export class CommandMenuComponent implements OnInit {
    @Input() isVisible: boolean = false;
    @Input() commands: Command[] = [];
    @Input() filterText: string = '';
    @Output() commandSelected = new EventEmitter<Command>();

    filteredCommands: Command[] = [];
    selectedIndex = 0;

    ngOnInit(): void {
        this.updateFilteredCommands();
    }

    ngOnChanges(): void {
        this.updateFilteredCommands();
        this.selectedIndex = 0;
    }

    updateFilteredCommands(): void {
        if (!this.filterText || this.filterText === '/') {
            this.filteredCommands = this.commands;
        } else {
            const query = this.filterText.toLowerCase().substring(1);
            this.filteredCommands = this.commands.filter(
                (command) =>
                    command.name.toLowerCase().substring(1).includes(query) ||
                    command.description.toLowerCase().includes(query)
            );
        }
    }

    selectCommand(command: Command): void {
        this.commandSelected.emit(command);
    }

    selectNextCommand(): void {
        if (this.filteredCommands.length === 0) return;
        this.selectedIndex =
            (this.selectedIndex + 1) % this.filteredCommands.length;
    }

    selectPreviousCommand(): void {
        if (this.filteredCommands.length === 0) return;
        this.selectedIndex =
            this.selectedIndex <= 0
                ? this.filteredCommands.length - 1
                : this.selectedIndex - 1;
    }

    getSelectedCommand(): Command | null {
        if (this.filteredCommands.length === 0) return null;
        return this.filteredCommands[this.selectedIndex];
    }
}
