import React, { useState } from 'react';
import { X, Video, Film, Code, Shield, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const videoPlatforms = [
  { id: 'vimeo', name: 'Vimeo', icon: Film },
  { id: 'vdocipher', name: 'VdoCipher', icon: Shield },
  { id: 'gumlet', name: 'Gumlet', icon: Video },
  { id: 'iframe', name: 'Iframe Embed', icon: Code },
  { id: 'script', name: 'Script Embed', icon: Code },
];

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPlatform, setVideoPlatform] = useState('vimeo');
  const [videoSource, setVideoSource] = useState('');
  const [drm, setDrm] = useState(false);
  const [watermark, setWatermark] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !videoSource) {
      return;
    }
    setIsCreating(true);
    
    setTimeout(() => {
      onAddCourse({
        title,
        description,
        videoPlatform,
        videoSource,
        drm,
        watermark
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setVideoPlatform('vimeo');
      setVideoSource('');
      setDrm(false);
      setWatermark(false);
      setIsCreating(false);
    }, 1000);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                disabled={isCreating}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                <div>
                  <label htmlFor="course-title" className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    id="course-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Introduction to React"
                  />
                </div>
                <div>
                  <label htmlFor="course-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    id="course-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="A brief summary of the course content"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Video Content</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {videoPlatforms.map(platform => (
                      <button
                        type="button"
                        key={platform.id}
                        onClick={() => setVideoPlatform(platform.id)}
                        className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
                          videoPlatform === platform.id ? 'bg-primary-50 border-primary-500' : 'bg-gray-50 border-transparent hover:border-gray-300'
                        }`}
                      >
                        <platform.icon className="h-6 w-6 text-gray-600" />
                        <span className="text-xs font-medium text-center">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="video-source" className="block text-sm font-medium text-gray-700 mb-2">
                    {videoPlatform === 'script' ? 'Embed Script' : 'Video URL or ID'}
                  </label>
                  {videoPlatform === 'script' ? (
                    <textarea
                      id="video-source"
                      value={videoSource}
                      onChange={(e) => setVideoSource(e.target.value)}
                      rows="4"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      placeholder="Paste your script here..."
                    />
                  ) : (
                    <input
                      type="text"
                      id="video-source"
                      value={videoSource}
                      onChange={(e) => setVideoSource(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., https://vimeo.com/123456789 or video_id"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="drm" checked={drm} onChange={(e) => setDrm(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                    <label htmlFor="drm" className="flex items-center text-sm font-medium text-gray-700">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" /> Enable DRM
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="watermark" checked={watermark} onChange={(e) => setWatermark(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                    <label htmlFor="watermark" className="flex items-center text-sm font-medium text-gray-700">
                      <Droplets className="h-4 w-4 mr-2 text-gray-500" /> Add Watermark
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isCreating}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !title.trim() || !videoSource.trim()}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isCreating && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{isCreating ? 'Creating...' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCourseModal;
