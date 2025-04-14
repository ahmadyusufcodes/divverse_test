import { Key } from 'react';

export interface User {
  _id: Key | null | undefined;
  id: number;
  email: string;
  name: string;
}

export interface Message {
  _id: string;
  subject: string;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
  read: boolean;
} 