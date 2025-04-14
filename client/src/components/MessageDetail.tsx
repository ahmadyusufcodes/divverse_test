import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Message } from '../types';

const MessageDetail: React.FC = () => {
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/messages/${id}`);
        const data = await response.json();
        setMessage(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message:', error);
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

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

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Message not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-white rounded-lg shadow-lg"
        >
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to inbox
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {message.subject}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  From: {message.sender}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(message.createdAt), 'MMM d, yyyy')}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessageDetail; 