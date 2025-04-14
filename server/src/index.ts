import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB, UserModel, MessageModel } from './database';
import { Message } from './types';
import { users, messages } from './seed';

// Load environment variables
config({ path: '.env' });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get paginated messages
app.get('/api/messages', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;
  const receiver_id = req.query.receiver_id as string;

  try {
    console.log('receiver_id', {receiver_id});
    // Get total count of messages
    const totalItems = await MessageModel.countDocuments({ receiver_id });
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated messages with sender details
    const messages = await MessageModel.find({ receiver_id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender_id', 'name email')
      .lean();

    res.json({
      messages,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.get('/api/messages/:id', async (req, res) => {
  try {
    const message = await MessageModel.findById(req.params.id)
      .populate('sender_id', 'name email')
      .lean();
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await MessageModel.findByIdAndUpdate(req.params.id, { read: true });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', async (req, res) => {
  const { email, name } = req.body;
  
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = await UserModel.create({ email, name });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { email, name } = req.body;
  
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email, name },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id).lean();
    
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await MessageModel.deleteMany({
      $or: [
        { sender_id: req.params.id },
        { receiver_id: req.params.id }
      ]
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await MessageModel.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    ).lean();

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
});

const startServer = async () => {
  const mongoUri = process.env.MONGODB_URI;
  console.log('MongoDB URI:', mongoUri ? 'Present' : 'Missing');
  
  if (!mongoUri) {
    console.error('MongoDB connection string is required');
    process.exit(1);
  }

  await connectDB(mongoUri);
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer(); 