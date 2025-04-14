import React from 'react';
import { Message } from '../types';

interface MessageCardProps {
  message: Message;
  onMarkAsRead: (messageId: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onMarkAsRead }) => {
  return (
    <div className={`p-4 rounded-lg border ${
      !message.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{message.subject}</h3>
            {!message.read && (
              <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <span className="truncate">From: {message.sender}</span>
            <span className="mx-1">•</span>
            <span>
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
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{message.content}</p>
        </div>
        {!message.read && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(message._id);
            }}
            className="px-2 py-1 ml-4 text-xs font-medium text-blue-600 transition-colors bg-blue-100 rounded hover:bg-blue-200"
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageCard; 