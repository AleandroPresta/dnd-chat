import { User } from './user.model';
import { Message } from './message.model';

export interface ChatRoom {
    id: number;
    name: string;
    members: User[];
    messages: Message[];
}
