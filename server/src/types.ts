import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  email: string;
  name: string;
}

export interface Message {
  _id: Types.ObjectId;
  subject: string;
  content: string;
  read: boolean;
  sender: string;
  sender_id: Types.ObjectId;
  receiver_id: Types.ObjectId;
  date: string;
} 