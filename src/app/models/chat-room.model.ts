import { User } from './user.model';
import { Message } from './message.model';

export interface ChatRoom {
    id: string;
    name: string;
    description?: string;
    members: User[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
