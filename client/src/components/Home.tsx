import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Message } from '../types';
import { EnvelopeIcon, InboxIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, messagesResponse] = await Promise.all([
          fetch('http://localhost:3001/api/users'),
          fetch('http://localhost:3001/api/messages?page=1&limit=10')
        ]);

        const usersData = await usersResponse.json();
        const messagesData = await messagesResponse.json();

        setUser(usersData[0]);
        setMessages(messagesData.messages);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  const unreadCount = messages.filter(message => !message.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-[1.02] transition-transform duration-300"
        >
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h1>
          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center p-4 space-x-4 rounded-lg bg-blue-50"
            >
              <InboxIcon className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {messages.length} messages in your inbox
                </p>
                <p className="text-sm text-gray-500">Total messages received</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center p-4 space-x-4 rounded-lg bg-green-50"
            >
              <EnvelopeIcon className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {unreadCount} unread messages
                </p>
                <p className="text-sm text-gray-500">Messages waiting for your attention</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="/inbox"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors duration-200 bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Inbox
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 