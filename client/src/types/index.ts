export interface Message {
  _id: string;
  subject: string;
  content: string;
  read: boolean;
  sender: string;
  sender_id: string;
  receiver_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
} 