import { User } from './user.model';

export interface Message {
    id?: number;
    content: string;
    user_id: string;
    created_at: Date;
}
