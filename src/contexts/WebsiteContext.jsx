import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const WebsiteContext = createContext();

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

const initialSites = [
    {
      id: '1',
      name: 'My Course Site',
      url: 'mycourse.example.com',
      status: 'published',
      lastEdited: '2025-01-15',
      template: 'Modern Minimal',
      templatePath: '/templates/modern-minimal/',
      templateId: 'modern-minimal'
    },
    {
      id: '2',
      name: 'Creative Workshop',
      url: 'workshop.example.com',
      status: 'draft',
      lastEdited: '2025-01-14',
      template: 'Creative Pro',
      templatePath: '/templates/creative-pro/',
      templateId: 'creative-pro'
    }
];

// Migration function to add templatePath to existing sites
const migrateSites = (sites) => {
  return sites.map(site => {
    if (!site.templatePath) {
      // Map old template names to new template IDs
      if (site.template === 'Modern Course' || site.template === 'Modern Minimal') {
        return {
          ...site,
          template: 'Modern Minimal',
          templatePath: '/templates/modern-minimal/',
          templateId: 'modern-minimal'
        };
      } else if (site.template === 'Creative Studio' || site.template === 'Creative Pro') {
        return {
          ...site,
          template: 'Creative Pro',
          templatePath: '/templates/creative-pro/',
          templateId: 'creative-pro'
        };
      } else {
        // Default to modern-minimal for unknown templates
        return {
          ...site,
          template: 'Modern Minimal',
          templatePath: '/templates/modern-minimal/',
          templateId: 'modern-minimal'
        };
      }
    }
    return site;
  });
};

export const WebsiteProvider = ({ children }) => {
  const [sites, setSites] = useState(() => {
    try {
      const savedSites = localStorage.getItem('courseBuilderSites');
      if (savedSites) {
        const parsedSites = JSON.parse(savedSites);
        return migrateSites(parsedSites);
      }
    } catch (error) {
      console.error('Error reading sites from localStorage:', error);
    }
    return initialSites;
  });

  useEffect(() => {
    try {
      localStorage.setItem('courseBuilderSites', JSON.stringify(sites));
    } catch (error) {
      console.error('Error saving sites to localStorage:', error);
    }
  }, [sites]);

  const addSite = (siteName, template) => {
    const newSite = {
      id: uuidv4(),
      name: siteName,
      url: `${siteName.toLowerCase().replace(/\s+/g, '-')}.example.com`,
      status: 'draft',
      lastEdited: new Date().toISOString().split('T')[0],
      template: template.name,
      templatePath: template.path,
      templateId: template.id,
    };
    setSites(prevSites => [newSite, ...prevSites]);
    return newSite;
  };

  const deleteSite = (id) => {
    setSites(prevSites => prevSites.filter(site => site.id !== id));
  };

  const value = {
    sites,
    addSite,
    deleteSite,
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};
