import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import CreateSiteModal from '../modals/CreateSiteModal';
import { useWebsite } from '../../contexts/WebsiteContext';

const siteTemplates = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Education',
    thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop',
    path: '/templates/modern-minimal/',
    description: 'Clean, minimal design with focus on typography and simplicity'
  },
  {
    id: 'creative-pro',
    name: 'Creative Pro',
    category: 'Creative',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop',
    path: '/templates/creative-pro/',
    description: 'Vibrant, creative design for agencies and creative professionals'
  },
  {
    id: 'academic-pro',
    name: 'Academic Pro',
    category: 'Academic',
    thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop',
    path: '/templates/academic-pro/',
    description: 'Professional, academic design for educational institutions'
  },
  {
    id: 'elearning-1',
    name: 'eLearning Pro',
    category: 'Education',
    thumbnail: '/elearning-1.0.0/img/about.jpg',
    path: '/elearning-1.0.0/',
    description: 'Professional eLearning template with modern design'
  },
  {
    id: 'elearning-2',
    name: 'eLearning Classic',
    category: 'Education',
    thumbnail: '/elearning-html-template/img/cat-1.jpg',
    path: '/elearning-html-template/',
    description: 'Classic eLearning template with clean layout'
  },
  {
    id: 'courses',
    name: 'Courses Platform',
    category: 'Education',
    thumbnail: '/courses-master/assets/img/hero/h1_hero.png',
    path: '/courses-master/',
    description: 'Complete courses platform template'
  }
];

const Websites = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsitesList />} />
      <Route path="/design" element={<WebsiteDesign />} />
      <Route path="/themes" element={<div>Theme Explorer</div>} />
      <Route path="/blog" element={<div>Blog Management</div>} />
      <Route path="/popups" element={<div>Popups</div>} />
      <Route path="/funnels" element={<div>Funnels</div>} />
      <Route path="/navigation" element={<div>Navigation</div>} />
      <Route path="/settings" element={<div>Website Settings</div>} />
    </Routes>
  );
};

const WebsitesList = () => {
  const { sites, addSite, deleteSite: deleteSiteFromContext } = useWebsite();
  const navigate = useNavigate();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset state after closing animation
    setTimeout(() => {
      setSiteName('');
      setSelectedTemplate(null);
    }, 300);
  };

  const handleCreateSite = () => {
    return new Promise((resolve) => {
      if (!selectedTemplate || !siteName.trim()) {
        toast.error('Please select a template and enter a site name.');
        resolve();
        return;
      }
      
      const toastId = toast.loading('Creating your site...');
      setTimeout(() => {
        const newSite = addSite(siteName, selectedTemplate);
        toast.success('Site created successfully!', { id: toastId });
        closeModal();
        navigate(`/builder/${newSite.id}`);
        resolve();
      }, 1500);
    });
  };

  const deleteSite = (id) => {
    deleteSiteFromContext(id);
    toast.success('Site deleted successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Websites</h1>
          <p className="text-muted-foreground mt-1">Manage your course websites</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Site</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-subtle border border-border overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Globe className="h-12 w-12 text-muted-foreground/50" />
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{site.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    site.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {site.status}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{site.url}</p>
              <p className="text-xs text-muted-foreground mb-4">
                Last edited: {site.lastEdited}
              </p>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/builder/${site.id}`)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors font-medium"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                
                <button className="flex items-center space-x-1.5 px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md hover:bg-muted transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={() => deleteSite(site.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <CreateSiteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        templates={siteTemplates}
        siteName={siteName}
        setSiteName={setSiteName}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onCreate={handleCreateSite}
      />
    </div>
  );
};

const WebsiteDesign = () => {
  const navigate = useNavigate();
  const { addSite } = useWebsite();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset state after closing animation
    setTimeout(() => {
      setSiteName('');
      setSelectedTemplate(null);
    }, 300);
  };

  const handleCreateSite = () => {
    return new Promise((resolve) => {
      if (!selectedTemplate || !siteName.trim()) {
        toast.error('Please select a template and enter a site name.');
        resolve();
        return;
      }
      
      const toastId = toast.loading('Creating your site flavor...');
      setTimeout(() => {
        const newSite = addSite(siteName, selectedTemplate);
        toast.success('Site flavor created successfully!', { id: toastId });
        closeModal();
        navigate(`/builder/${newSite.id}`);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Design</h1>
          <p className="text-muted-foreground mt-1">Create and customize your site flavors</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Create Site Flavor</span>
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-subtle border border-border p-16 text-center">
        <div className="flex justify-center items-center mx-auto w-20 h-20 bg-primary/10 rounded-full mb-6">
          <Globe className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Manage Your Site Designs</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          "Site Flavors" are your saved designs and templates. Create a new flavor to start building a new look for your websites.
        </p>
      </div>

      <CreateSiteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        templates={siteTemplates}
        siteName={siteName}
        setSiteName={setSiteName}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onCreate={handleCreateSite}
        title="Create site flavor"
      />
    </div>
  );
};

export default Websites;
