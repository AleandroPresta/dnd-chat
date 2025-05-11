import { User } from './user.model';

export interface Message {
  id: string;
  content: string;
  sender: User;
  roomId: string;
  timestamp: Date;
}
