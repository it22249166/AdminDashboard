import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { SaveOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';

export default function SettingsPage() {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);
  
  // Notification settings state
  const [notifications, setNotifications] = useState(true);
  
  // Account settings (mock data)
  const [username, setUsername] = useState('malith_bandara');
  const [email, setEmail] = useState('malithb072@gmail.com');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} p-6`}>
      <div className="container mx-auto max-w-5xl">
        {/* Dark Mode Switch */}
        <Card title="Appearance" className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Dark Mode</h3>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className={`${
                darkMode ? 'bg-blue-500' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card title="Notifications" className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Email Notifications</h3>
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className={`${
                notifications ? 'bg-green-500' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            />
          </div>
        </Card>

        {/* Account Settings */}
        <Card title="Account Settings" className="mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            onClick={() => alert('Settings Saved!')}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all flex items-center"
          >
            <SaveOutlined className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}