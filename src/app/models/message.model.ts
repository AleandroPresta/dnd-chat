import { User } from './user.model';

export interface Message {
    id: number;
    content: string;
    senderId: number;
    timestamp: Date;
}
