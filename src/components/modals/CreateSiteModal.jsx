import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateSiteModal = ({
  isOpen,
  onClose,
  templates,
  title = "Create a New Site",
  siteName,
  setSiteName,
  selectedTemplate,
  setSelectedTemplate,
  onCreate
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = async () => {
    setIsCreating(true);
    await onCreate();
    // Parent component will close the modal on success.
    setIsCreating(false);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                disabled={isCreating}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-[60vh]">
              {/* Left Column: Template Selection */}
              <div className="md:col-span-1 border-r border-gray-200 bg-gray-50/50 p-6 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  1. Choose a template
                </h3>
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 -mr-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-3 rounded-lg border-2 flex items-center space-x-4 transition-all duration-200 ${
                        selectedTemplate?.id === template.id
                          ? 'bg-white border-primary-500 shadow-sm'
                          : 'border-transparent hover:bg-white hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{template.name}</p>
                        <p className="text-xs text-gray-500">{template.category}</p>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Configuration & Preview */}
              <div className="md:col-span-2 p-8 flex flex-col">
                {selectedTemplate ? (
                  <>
                    <div className="flex-1 mb-8">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Template Preview
                      </h3>
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                        <iframe
                          src={`${selectedTemplate.path}index.html`}
                          className="w-full h-full border-0 scale-50 origin-top-left"
                          style={{ width: '200%', height: '200%' }}
                          title={`Preview of ${selectedTemplate.name}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        2. Name your site
                      </h3>
                      <input
                        id="siteName"
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="e.g. My Awesome Course"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                    <ImageIcon className="h-16 w-16 mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold">Select a Template</h3>
                    <p className="max-w-xs mx-auto text-sm">
                      Choose a starting point from the list on the left to see a preview.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
              <button
                onClick={onClose}
                disabled={isCreating}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateClick}
                disabled={isCreating || !selectedTemplate || !siteName.trim()}
                className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isCreating && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>Create Site</span>
                {!isCreating && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateSiteModal;
