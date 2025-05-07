import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { SaveOutlined } from '@ant-design/icons';
import { Card, Input, message } from 'antd';

export default function SettingsPage() {
  // States
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState('malith_bandara');
  const [email, setEmail] = useState('malithb072@gmail.com');

  // Load from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');

    setDarkMode(savedDarkMode);
    setNotifications(savedNotifications);
    if (savedUsername) setUsername(savedUsername);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Save handler
  const handleSave = () => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    message.success('Settings have been saved successfully!');
  };

  // Common switch style
  const switchBase = (enabled, color) =>
    `${enabled ? color : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 transition-colors`}>
      <div className="container mx-auto max-w-5xl space-y-6">

        {/* Appearance */}
        <Card title="Appearance" className={`${darkMode ? 'bg-gray-800 text-white' : ''}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Dark Mode</h3>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={switchBase(darkMode, 'bg-blue-600')}
            >
              <span
                className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notifications" className={`${darkMode ? 'bg-gray-800 text-white' : ''}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={switchBase(notifications, 'bg-green-500')}
            >
              <span
                className={`${notifications ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </Card>

        {/* Account */}
        <Card title="Account Settings" className={`${darkMode ? 'bg-gray-800 text-white' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition flex items-center"
          >
            <SaveOutlined className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}