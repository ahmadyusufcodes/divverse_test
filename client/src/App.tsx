import React, { useState, useEffect } from 'react';
import { User } from './types';
import UserSelection from './components/UserSelection';
import HomePage from './components/HomePage';
import InboxPage from './components/InboxPage';

interface Message {
  _id: string;
  subject: string;
  content: string;
  sender: string;
  receiver: string;
  read: boolean;
  createdAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState<'home' | 'inbox'>('home');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch users from the backend
    fetch('http://localhost:3001/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError('Invalid users data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log('Fetching messages for user:', selectedUser._id);
      // Fetch messages for the selected user with pagination
      fetch(`http://localhost:3001/api/messages?receiver_id=${selectedUser._id}`)
        .then(async (response) => {
          console.log('Response status:', response.status);
          const data = await response.text();
          console.log('Raw response:', data);
          
          if (!response.ok) {
            try {
              const errorData = JSON.parse(data);
              throw new Error(errorData.error || 'Failed to fetch messages');
            } catch (e) {
              throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
          }
          
          try {
            const parsedData = JSON.parse(data);
            console.log('Parsed messages data:', parsedData?.messages);
            if (parsedData.messages && Array.isArray(parsedData.messages)) {
              console.log('First message:', parsedData.messages[0]);
              setMessages(parsedData.messages);
            } else {
              console.error('Invalid messages data format:', parsedData);
              setMessages([]);
              setError('Invalid messages data format');
            }
          } catch (e) {
            console.error('Failed to parse response:', e);
            throw new Error('Invalid response format from server');
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          setError(`Failed to load messages: ${error.message}`);
          setMessages([]);
        });
    }
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    console.log('User selected:', user);
    setSelectedUser(user);
    setCurrentPage('home');
    setError(null);
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }

      // Update the messages state
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (!selectedUser) {
    return <UserSelection users={users} onSelectUser={handleUserSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">MailBox</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`${
                    currentPage === 'home'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('inbox')}
                  className={`${
                    currentPage === 'inbox'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Inbox
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{selectedUser.name}</div>
                    <div className="text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="px-4 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="p-4 border-l-4 border-red-400 bg-red-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'home' ? (
        <HomePage 
          user={selectedUser} 
          messages={messages} 
          onViewInbox={() => setCurrentPage('inbox')} 
        />
      ) : (
        <InboxPage 
          messages={messages} 
          onMarkAsRead={markMessageAsRead} 
          onLogout={() => setSelectedUser(null)} 
          currentUser={selectedUser}
        />
      )}
    </div>
  );
}

export default App;
