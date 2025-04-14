import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Message, User } from '../types';

interface InboxProps {
  currentUser: User;
}

const Inbox: React.FC<InboxProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/messages?receiver_id=${currentUser.id}&page=${currentPage}&limit=5`
        );
        const data = await response.json();
        setMessages(data.messages);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUser.id, currentPage]);

  const handleMessageClick = async (message: Message) => {
    if (!message.read) {
      try {
        await fetch(`http://localhost:3001/api/messages/${message._id}`, {
          method: 'GET'
        });
        setMessages(messages.map(m => 
          m._id === message._id ? { ...m, read: true } : m
        ));
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }
    navigate(`/message/${message._id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {currentUser.name}!
            </h1>
            <p className="mt-1 text-gray-600">Here are your messages</p>
          </div>

          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleMessageClick(message)}
                className={`p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                  !message.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {message.subject}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      From: {message.sender}
                    </p>
                    <p className="mt-2 text-gray-600">{message.content}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {message.read && <CheckIcon className="w-4 h-4 text-gray-400" />}
                    <span className="text-xs text-gray-500">
                      {format(new Date(message.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox; 