import mongoose from 'mongoose';
import { User, Message } from './types';

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true }
}, { timestamps: true });

const messageSchema = new mongoose.Schema<Message>({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  sender: { type: String, required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }
}, { timestamps: true });

export const UserModel = mongoose.model<User>('User', userSchema);
export const MessageModel = mongoose.model<Message>('Message', messageSchema);

export const connectDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 