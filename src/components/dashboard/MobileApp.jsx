import React, { useState } from 'react';
import { Smartphone, Download, Settings, Play, Apple, Zap, Users, Star } from 'lucide-react';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const appStats = [
    { name: 'Downloads', value: '12,345', icon: Download, change: '+15%', changeType: 'positive' },
    { name: 'Active Users', value: '8,901', icon: Users, change: '+8%', changeType: 'positive' },
    { name: 'App Rating', value: '4.8', icon: Star, change: '+0.2', changeType: 'positive' },
    { name: 'Daily Sessions', value: '23,456', icon: Zap, change: '+12%', changeType: 'positive' }
  ];

  const features = [
    {
      title: 'Offline Course Access',
      description: 'Students can download courses and learn offline',
      status: 'active',
      icon: Download
    },
    {
      title: 'Push Notifications',
      description: 'Send updates and reminders to students',
      status: 'active',
      icon: Zap
    },
    {
      title: 'Progress Tracking',
      description: 'Track learning progress across devices',
      status: 'active',
      icon: Play
    },
    {
      title: 'Social Learning',
      description: 'Discussion forums and peer interaction',
      status: 'coming-soon',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mobile App</h2>
          <p className="text-gray-600">Manage your mobile learning platform</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Settings className="h-4 w-4" />
          <span>App Settings</span>
        </button>
      </div>

      {/* App Preview */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Course Builder Mobile</h3>
            <p className="text-primary-100 mb-6">Your courses, anywhere, anytime. The perfect companion for mobile learning.</p>
            
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-black rounded-lg hover:bg-gray-800 transition-colors">
                <Apple className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="flex items-center space-x-2 px-6 py-3 bg-black rounded-lg hover:bg-gray-800 transition-colors">
                <Play className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="bg-primary-600 h-20 flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-20 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: Smartphone },
            { id: 'features', name: 'Features', icon: Zap },
            { id: 'analytics', name: 'Analytics', icon: Star },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        feature.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {feature.status === 'active' ? 'Active' : 'Coming Soon'}
                    </span>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">App Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Crash-free Rate</span>
                <span className="font-semibold text-green-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Session Duration</span>
                <span className="font-semibold">12m 34s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Retention (Day 7)</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">App Load Time</span>
                <span className="font-semibold">1.2s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reviews</h3>
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    "Great app for learning on the go. The offline feature is amazing!"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">- Sarah M.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics & Settings tabs */}
      {(activeTab === 'analytics' || activeTab === 'settings') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === 'analytics' ? 'Mobile Analytics' : 'App Settings'}
          </h3>
          <p className="text-gray-500 mb-4">
            {activeTab === 'analytics' 
              ? 'Detailed mobile app analytics and user behavior insights coming soon.'
              : 'Advanced app configuration and customization options coming soon.'
            }
          </p>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            {activeTab === 'analytics' ? 'Enable Analytics' : 'Configure App'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileApp;
