import React, { useState } from 'react';
import { FileText, Filter, MessageCircle, BookOpen, Plus, Search, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, File, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '../../contexts/BuilderContext';

const TABS = [
  { id: 'pages', name: 'Pages', icon: FileText },
  { id: 'funnels', name: 'Funnels', icon: Filter },
  { id: 'popups', name: 'Popups', icon: MessageCircle },
  { id: 'blog', name: 'Blog', icon: BookOpen },
];

const pageGroups = [
  { name: 'All', count: 16, pages: [] },
  { name: 'Affiliates', count: 2, pages: ['Affiliate Login', 'Affiliate Signup'] },
  { name: 'Course', count: 1, pages: ['Course Player'] },
  { name: 'External pages', count: 2, pages: ['Home', 'About Us'] },
  { name: 'Policies', count: 3, pages: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
  { name: 'System pages', count: 8, pages: ['404 Not Found', 'Login', 'Signup'] },
];

const AddNewMenu = ({ isOpen, onClose }) => {
  const addOptions = [
    {
      icon: File,
      title: 'New Page',
      description: 'Create a new page for your website',
      action: () => console.log('New Page')
    },
    {
      icon: FileText,
      title: 'New Post',
      description: 'Create a new blog post or article',
      action: () => console.log('New Post')
    },
    {
      icon: MessageCircle,
      title: 'New Popup',
      description: 'Create a popup or modal window',
      action: () => console.log('New Popup')
    },
    {
      icon: Filter,
      title: 'New Funnel',
      description: 'Create a sales or conversion funnel',
      action: () => console.log('New Funnel')
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-3 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-800">Add New</h4>
        <p className="text-xs text-gray-500 mt-1">Create a new page for your website</p>
      </div>
      <div className="p-2">
        {addOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              option.action();
              onClose();
            }}
            className="w-full flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-shrink-0 mt-0.5">
              <option.icon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{option.title}</p>
              <p className="text-xs text-gray-500 mt-1">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const AccordionItem = ({ name, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{count}</span>
          {isOpen ? <ChevronDown className="h-3 w-3 text-gray-500" /> : <ChevronRight className="h-3 w-3 text-gray-500" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 mt-1 space-y-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuilderSidebar = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSidebarCollapsed, toggleSidebar } = useBuilder();

  const filteredGroups = pageGroups.map(group => ({
    ...group,
    pages: group.pages.filter(page =>
      page.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.pages.length > 0 ||
    searchQuery === ''
  );

  return (
    <motion.div
      animate={{ width: isSidebarCollapsed ? '80px' : '320px' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-sm"
    >
      <div className="border-b border-gray-200">
        <nav className={`flex p-1 space-x-1 ${isSidebarCollapsed ? 'flex-col space-y-1 space-x-0' : ''}`}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={isSidebarCollapsed ? tab.name : ''}
              className={`flex-1 flex items-center justify-center space-x-2 px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              } ${isSidebarCollapsed ? 'h-16' : ''}`}
            >
              <tab.icon className="h-4 w-4" />
              {!isSidebarCollapsed && <span>{tab.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  {activeTab === 'pages' && 'Pages'}
                  {activeTab === 'funnels' && 'Funnels'}
                  {activeTab === 'popups' && 'Popups'}
                  {activeTab === 'blog' && 'Blog Posts'}
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    title="Add New"
                  >
                    <Plus className="h-4 w-4 text-gray-500" />
                  </button>
                  <AddNewMenu isOpen={showAddMenu} onClose={() => setShowAddMenu(false)} />
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a page"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="px-4 pb-4">
              {activeTab === 'pages' && (
                <div className="space-y-1">
                  {filteredGroups.map(group => (
                    <AccordionItem
                      key={group.name}
                      name={group.name}
                      count={group.count}
                      defaultOpen={group.name === 'All' || searchQuery !== ''}
                    >
                      <div className="space-y-1">
                        {group.pages.length > 0 ? group.pages.map(page => (
                          <button
                            key={page}
                            className="w-full text-left p-2 text-sm text-gray-600 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <File className="h-3 w-3 text-gray-400" />
                              <span>{page}</span>
                            </div>
                          </button>
                        )) : (
                          <p className="p-2 text-sm text-gray-400 italic">
                            {searchQuery ? 'No matching pages found.' : 'No pages in this group.'}
                          </p>
                        )}
                      </div>
                    </AccordionItem>
                  ))}
                </div>
              )}

              {activeTab !== 'pages' && (
                <div className="text-center py-16 text-gray-500">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                      {activeTab === 'funnels' && <Filter className="h-6 w-6" />}
                      {activeTab === 'popups' && <MessageCircle className="h-6 w-6" />}
                      {activeTab === 'blog' && <BookOpen className="h-6 w-6" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">No {activeTab} yet</p>
                      <p className="text-xs text-gray-400 mt-1">Click the + button to create your first {activeTab.slice(0, -1)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-2 border-t border-gray-200 flex items-center justify-center mt-auto">
        <button
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="w-full flex items-center justify-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </button>
      </div>
    </motion.div>
  );
};

export default BuilderSidebar;
