import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Command } from '../../../models/command.model';

@Component({
    selector: 'app-command-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            *ngIf="isVisible"
            class="absolute bottom-full left-0 z-20 w-full pb-2"
        >
            <div
                class="border-base-300 flex max-h-64 flex-col overflow-hidden rounded-xl border bg-white shadow-xl"
            >
                <div
                    class="text-base-content/70 bg-base-300 border-base-300 border-b px-4 py-2 text-sm font-semibold"
                >
                    Available Commands
                </div>
                <div class="overflow-y-auto py-1">
                    <div
                        *ngFor="let command of filteredCommands; let i = index"
                        class="flex cursor-pointer select-none flex-col gap-0.5 px-4 py-2 transition-colors"
                        [ngClass]="{
                            'bg-primary/20 text-primary': selectedIndex === i,
                            'hover:bg-base-300': selectedIndex !== i,
                        }"
                        (click)="selectCommand(command)"
                    >
                        <span class="text-base-content font-medium">{{
                            command.name
                        }}</span>
                        <span class="text-base-content/60 text-xs">{{
                            command.description
                        }}</span>
                    </div>
                    <div
                        *ngIf="filteredCommands.length === 0"
                        class="text-base-content/50 px-4 py-3 text-center text-sm italic"
                    >
                        No commands match your search
                    </div>
                </div>
            </div>
        </div>
    `,
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
