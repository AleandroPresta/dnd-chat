export interface Command {
    id: string;
    name: string;
    description: string;
    action?: (params?: string) => void;
}
