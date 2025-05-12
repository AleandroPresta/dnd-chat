import { User } from './user.model';

export interface Message {
    id?: number;
    content: string;
    user_id: number;
    created_at: Date;
}
