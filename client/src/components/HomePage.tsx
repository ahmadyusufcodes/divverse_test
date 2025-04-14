import React from 'react';
import { User, Message } from '../types';

interface HomePageProps {
  user: User;
  messages: Message[];
  onViewInbox: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, messages, onViewInbox }) => {
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((msg) => !msg.read).length;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="mt-2 text-blue-100">Here's your mailbox summary</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Total Messages</h2>
                    <p className="text-3xl font-bold text-blue-600">{totalMessages}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Unread Messages</h2>
                    <p className="text-3xl font-bold text-indigo-600">{unreadMessages}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={onViewInbox}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                View Inbox
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 