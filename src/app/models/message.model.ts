import { User } from './user.model';

export interface Message {
    id: number;
    content: string;
    sender: User;
    roomId: number;
    timestamp: Date;
}
