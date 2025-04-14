import React, { useState } from 'react';
import { Message, User } from '../types';
import MessageCard from './MessageCard';
import MessageView from './MessageView';

interface InboxPageProps {
  messages: Message[];
  onMarkAsRead: (messageId: string) => void;
  onLogout: () => void;
  currentUser: User;
}

const InboxPage: React.FC<InboxPageProps> = ({ messages, onMarkAsRead, onLogout, currentUser }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMessageClick = (message: Message) => {
    if (!message.read) {
      onMarkAsRead(message._id);
    }
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  const handleMarkAsRead = (messageId: string) => {
    onMarkAsRead(messageId);
    setSelectedMessage(prev => prev ? { ...prev, read: true } : null);
  };

  if (selectedMessage) {
    return (
      <MessageView
        message={selectedMessage}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Inbox</h1>
                <p className="mt-1 text-blue-100">{messages.length} messages</p>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          <div className="p-4">
            {messages.length === 0 ? (
              <div className="py-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by sending a new message.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    onClick={() => handleMessageClick(message)}
                    className="transition-colors duration-200 cursor-pointer hover:bg-gray-50"
                  >
                    <MessageCard message={message} onMarkAsRead={onMarkAsRead} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage; 