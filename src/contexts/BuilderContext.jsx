import React, { createContext, useContext, useState } from 'react';

const BuilderContext = createContext();

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};

export const BuilderProvider = ({ children, siteId }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pageData, setPageData] = useState({
    id: 'page-1',
    name: 'Home',
    elements: []
  });
  const [draggedElement, setDraggedElement] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const addElement = (element, dropZoneId) => {
    const newElement = {
      ...element,
      id: `element-${Date.now()}`,
      position: { x: 0, y: 0 }
    };
    
    setPageData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
  };

  const updateElement = (elementId, updates) => {
    setPageData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  };

  const deleteElement = (elementId) => {
    setPageData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  };

  const value = {
    siteId,
    selectedElement,
    setSelectedElement,
    isSidebarCollapsed,
    toggleSidebar,
    pageData,
    setPageData,
    draggedElement,
    setDraggedElement,
    addElement,
    updateElement,
    deleteElement
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
};
