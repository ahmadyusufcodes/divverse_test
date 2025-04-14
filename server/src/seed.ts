import { config } from 'dotenv';
import { connectDB, UserModel, MessageModel } from './database';
import { User, Message } from './types';
import { Types } from 'mongoose';

config({ path: '.env' });

const user1Id = new Types.ObjectId();
const user2Id = new Types.ObjectId();
const user3Id = new Types.ObjectId();
const user4Id = new Types.ObjectId();
const user5Id = new Types.ObjectId();
const user6Id = new Types.ObjectId();

const sampleUsers: User[] = [
  {
    _id: user1Id,
    email: 'alex@divverse.com',
    name: 'Alex Rivera'
  },
  {
    _id: user2Id,
    email: 'maya@divverse.com',
    name: 'Maya Chen'
  },
  {
    _id: user3Id,
    email: 'david@divverse.com',
    name: 'David Kim'
  },
  {
    _id: user4Id,
    email: 'sophie@divverse.com',
    name: 'Sophie Laurent'
  },
  {
    _id: user5Id,
    email: 'james@divverse.com',
    name: 'James Wilson'
  },
  {
    _id: user6Id,
    email: 'lina@divverse.com',
    name: 'Lina Patel'
  }
];

// Create sample messages with proper ObjectIds
const sampleMessages: Message[] = [
  {
    _id: new Types.ObjectId(),
    subject: 'Q2 Project Kickoff',
    content: 'Hey team, let\'s meet tomorrow at 2 PM to discuss the Q2 project roadmap. I\'ve attached the initial specs.',
    read: false,
    sender: 'Alex Rivera',
    sender_id: user1Id,
    receiver_id: user2Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'Design System Updates',
    content: 'I\'ve updated the design system with new components. Please review the changes before the next sprint.',
    read: true,
    sender: 'Maya Chen',
    sender_id: user2Id,
    receiver_id: user1Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'API Documentation',
    content: 'The new API endpoints are documented. Let me know if you need any clarification on the authentication flow.',
    read: false,
    sender: 'David Kim',
    sender_id: user3Id,
    receiver_id: user4Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'Performance Metrics',
    content: 'Here are the latest performance metrics. We\'ve seen a 15% improvement in load times after the last optimization.',
    read: false,
    sender: 'Sophie Laurent',
    sender_id: user4Id,
    receiver_id: user3Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'Security Audit Results',
    content: 'The security audit is complete. We need to address 3 critical issues before the next release.',
    read: true,
    sender: 'James Wilson',
    sender_id: user5Id,
    receiver_id: user6Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'User Feedback Summary',
    content: 'Collected feedback from beta users. Most requested features are dark mode and keyboard shortcuts.',
    read: false,
    sender: 'Lina Patel',
    sender_id: user6Id,
    receiver_id: user5Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'Database Migration',
    content: 'The migration to the new database cluster is scheduled for this weekend. Please review the maintenance window.',
    read: true,
    sender: 'Alex Rivera',
    sender_id: user1Id,
    receiver_id: user3Id,
    date: new Date().toISOString()
  },
  {
    _id: new Types.ObjectId(),
    subject: 'Team Offsite Planning',
    content: 'Let\'s discuss potential dates for the team offsite. I\'m thinking early June would work best.',
    read: false,
    sender: 'Maya Chen',
    sender_id: user2Id,
    receiver_id: user4Id,
    date: new Date().toISOString()
  }
];

// Seed the database
const seedDatabase = async () => {
  try {
    await UserModel.deleteMany({});
    await MessageModel.deleteMany({});

    await UserModel.insertMany(sampleUsers);
    await MessageModel.insertMany(sampleMessages);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

if (require.main === module) {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MongoDB connection string is required');
    process.exit(1);
  }

  connectDB(mongoUri).then(() => {
    seedDatabase().then(() => {
      process.exit(0);
    });
  });
}

export { sampleUsers as users, sampleMessages as messages }; 