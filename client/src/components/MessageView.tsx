import React from 'react';
import { Message } from '../types';

interface MessageViewProps {
  message: Message;
  onBack: () => void;
}

const MessageView: React.FC<MessageViewProps> = ({ message, onBack }) => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="text-white transition-colors duration-200 hover:text-blue-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="pr-3 text-xl font-bold text-white">{message.subject}</h1>
            </div>
          </div>
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                    {message.sender.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{message.sender}</h2>
                    <p className="text-sm text-gray-500">To: {message.receiver}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {(() => {
                    try {
                      const date = new Date(message.createdAt);
                      if (isNaN(date.getTime())) {
                        return 'Invalid date';
                      }
                      return new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(date);
                    } catch (error) {
                      console.error('Error formatting date:', error);
                      return 'Invalid date';
                    }
                  })()}
                </div>
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageView; 