import React from 'react';
import { useParams } from 'react-router-dom';
import BuilderToolbar from '../components/builder/BuilderToolbar';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import BuilderCanvas from '../components/builder/BuilderCanvas';
import BuilderInspector from '../components/builder/BuilderInspector';
import { BuilderProvider, useBuilder } from '../contexts/BuilderContext';

const SiteBuilder = () => {
  const { siteId } = useParams();

  return (
    <BuilderProvider siteId={siteId}>
      <BuilderLayout />
    </BuilderProvider>
  );
};

const BuilderLayout = () => {
  const { selectedElement } = useBuilder();

  return (
    <div className="h-screen flex flex-col bg-secondary-100 text-secondary-800 font-sans">
      <BuilderToolbar />
      <div className="flex-1 flex overflow-hidden">
        <BuilderSidebar />
        <BuilderCanvas />
        {selectedElement && <BuilderInspector />}
      </div>
    </div>
  );
};

export default SiteBuilder;
