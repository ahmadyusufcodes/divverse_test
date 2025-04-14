import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface WelcomeScreenProps {
  onUserSelect: (user: User) => void;
  users: User[];
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onUserSelect, users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="p-8 bg-white shadow-lg rounded-xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
            Welcome to DivVerse
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Please select your account to continue
          </p>

          <div className="space-y-4">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="flex items-center w-full p-4 transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {selectedUser?.id === user.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-blue-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;