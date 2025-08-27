import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Save,
  Sparkles,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Undo,
  Redo,
  Play,
  Code,
  Globe,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBuilder } from '../../contexts/BuilderContext';

const BuilderToolbar = () => {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [showPreviewMenu, setShowPreviewMenu] = useState(false);
  const { selectedElement } = useBuilder();

  const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between text-sm z-10 shadow-sm">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <Link
          to="/dashboard/websites"
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {['Page', 'Edit', 'Design', 'Site', 'Add', 'Help'].map(item => (
            <button key={item} className="px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">{item}</button>
          ))}
        </nav>

        <button className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
          <Sparkles className="h-4 w-4" />
          <span>AI Assistant</span>
          <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">Upgrade</span>
        </button>

        {selectedElement && (
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium">{selectedElement.type} selected</span>
          </div>
        )}
      </div>

      {/* Middle section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 p-1 bg-gray-100 rounded-md">
          <button
            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        <button className="hidden md:flex items-center space-x-1 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <span>edu / Home</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-1 p-1 bg-gray-100 rounded-md">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={`p-1.5 rounded transition-all ${
                activeDevice === device.id
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-500 hover:bg-white hover:text-gray-700'
              }`}
              title={device.label}
            >
              <device.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={() => setShowPreviewMenu(!showPreviewMenu)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden md:inline">Preview</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </button>

          {showPreviewMenu && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>Preview Mode</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <Play className="h-4 w-4 text-gray-500" />
                <span>Live Preview</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <Globe className="h-4 w-4 text-gray-500" />
                <span>Open in New Tab</span>
              </button>
              <hr className="my-2 border-gray-100" />
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                <Code className="h-4 w-4 text-gray-500" />
                <span>View Source Code</span>
              </button>
            </div>
          )}
        </div>

        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
          Save
        </button>

        <button
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
