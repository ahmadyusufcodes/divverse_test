import React from 'react';
import { User } from '../types';

interface UserSelectionProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ users, onSelectUser }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome to MailBox</h1>
            <p className="text-blue-100 mt-2">Please select your account to continue</p>
          </div>
          <div className="p-6 space-y-4">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => onSelectUser(user)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 flex items-center space-x-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection; 