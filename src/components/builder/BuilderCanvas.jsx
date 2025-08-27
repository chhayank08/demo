import React, { useState, useEffect, useRef } from 'react';
import { useBuilder } from '../../contexts/BuilderContext';
import { useWebsite } from '../../contexts/WebsiteContext';

const BuilderCanvas = () => {
  const { pageData, setSelectedElement, selectedElement, siteId, updateElement } = useBuilder();
  const { sites } = useWebsite();
  const [loading, setLoading] = useState(true);
  const [templateContent, setTemplateContent] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [editableElements, setEditableElements] = useState([]);
  const iframeRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle iframe load and setup interaction
  const handleIframeLoad = () => {
    setIframeLoaded(true);

    if (iframeRef.current) {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          // Add editor styles to iframe
          const style = iframeDoc.createElement('style');
          style.textContent = `
            .builder-hover {
              outline: 2px dashed #6b7280 !important;
              outline-offset: 2px !important;
              cursor: pointer !important;
            }
            .builder-selected {
              outline: 2px solid #3b82f6 !important;
              outline-offset: 2px !important;
              position: relative !important;
            }
            .builder-selected::before {
              content: attr(data-element-type);
              position: absolute;
              top: -24px;
              left: 0;
              background: #3b82f6;
              color: white;
              padding: 2px 8px;
              font-size: 12px;
              border-radius: 4px;
              z-index: 1000;
              white-space: nowrap;
            }
            .builder-editable {
              min-height: 20px;
            }
            .builder-editable:empty::before {
              content: 'Click to edit...';
              color: #9ca3af;
              font-style: italic;
            }
          `;
          iframeDoc.head.appendChild(style);

          // Add click handlers to all elements
          const addInteractivity = (element) => {
            // Skip non-interactive elements
            if (['script', 'style', 'meta', 'link', 'title'].includes(element.tagName.toLowerCase())) {
              return;
            }

            element.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();

              // Remove previous selections
              iframeDoc.querySelectorAll('.builder-selected').forEach(el => {
                el.classList.remove('builder-selected');
                el.removeAttribute('data-element-type');
              });

              // Select current element
              element.classList.add('builder-selected');
              element.setAttribute('data-element-type', element.tagName.toLowerCase());

              // Set selected element in context
              const elementData = {
                id: `iframe-${element.tagName.toLowerCase()}-${Date.now()}`,
                type: element.tagName.toLowerCase(),
                content: element.textContent?.trim() || '',
                element: element, // Store reference for editing
                attributes: {},
                styles: {}
              };

              // Extract attributes
              for (const attr of element.attributes) {
                elementData.attributes[attr.name] = attr.value;
              }

              setSelectedElement(elementData);
            });

            // Add hover effects
            element.addEventListener('mouseenter', (e) => {
              if (!element.classList.contains('builder-selected')) {
                element.classList.add('builder-hover');
              }
            });

            element.addEventListener('mouseleave', (e) => {
              element.classList.remove('builder-hover');
            });

            // Make text elements editable
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button'].includes(element.tagName.toLowerCase())) {
              element.addEventListener('dblclick', (e) => {
                e.preventDefault();
                e.stopPropagation();
                enableInlineEditing(element);
              });
            }
          };

          // Apply to all elements
          const allElements = iframeDoc.body.querySelectorAll('*');
          allElements.forEach(addInteractivity);

          console.log('Interactive editor initialized with', allElements.length, 'elements');
        }
      } catch (error) {
        console.error('Error setting up iframe interaction:', error);
      }
    }
  };

  // Enable inline editing for text elements
  const enableInlineEditing = (element) => {
    const originalContent = element.textContent;
    element.setAttribute('contenteditable', 'true');
    element.classList.add('builder-editable');
    element.focus();

    const finishEditing = () => {
      element.setAttribute('contenteditable', 'false');
      element.classList.remove('builder-editable');
      element.blur();

      // Update selected element content
      if (selectedElement && selectedElement.element === element) {
        setSelectedElement(prev => ({
          ...prev,
          content: element.textContent?.trim() || ''
        }));
      }
    };

    element.addEventListener('blur', finishEditing, { once: true });
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        finishEditing();
      }
      if (e.key === 'Escape') {
        element.textContent = originalContent;
        finishEditing();
      }
    }, { once: true });
  };

  // Effect to load template content
  useEffect(() => {
    console.log('BuilderCanvas loading template:', { siteId, sites });
    if (!siteId) return;

    const loadTemplate = async () => {
      setLoading(true);
      setTemplateContent(null);
      setIframeLoaded(false);
      setSelectedElement(null);

      const site = sites.find(s => s.id === siteId);
      console.log('Found site:', site);

      if (site && site.templatePath) {
        console.log('Loading template from:', `${site.templatePath}index.html`);
        try {
          const response = await fetch(`${site.templatePath}index.html`);
          console.log('Template fetch response:', response.status, response.ok);

          if (response.ok) {
            const content = await response.text();
            console.log('Template content loaded, length:', content.length);

            // Process content to fix relative paths
            const processedContent = content
              .replace(/src="(?!https?:\/\/)/g, `src="${site.templatePath}`)
              .replace(/href="(?!https?:\/\/)/g, `href="${site.templatePath}`)
              .replace(/url\("(?!https?:\/\/)/g, `url("${site.templatePath}`)
              .replace(/url\('(?!https?:\/\/)/g, `url('${site.templatePath}`);

            setTemplateContent(processedContent);
          } else {
            console.error('Failed to fetch template:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error loading template:', error);
        }
      } else {
        console.log('Cannot load template:', {
          site: !!site,
          templatePath: site?.templatePath
        });
      }
      setLoading(false);
    };

    loadTemplate();
  }, [siteId, sites]);

  const handleSelectElement = (e) => {
    e.stopPropagation(); // Prevent background click from firing
    setSelectedElement({
      id: 'hero-section-1',
      type: 'Hero Section',
      settings: {
        overlay: true,
        opacity: 50,
        caption: false,
        popup: false,
      }
    });
  };

  const handleCanvasClick = () => {
    setSelectedElement(null);

    // Clear selection in iframe
    if (iframeRef.current && iframeLoaded) {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          iframeDoc.querySelectorAll('.builder-selected').forEach(el => {
            el.classList.remove('builder-selected');
            el.removeAttribute('data-element-type');
          });
        }
      } catch (error) {
        console.error('Error clearing iframe selection:', error);
      }
    }
  };

  return (
    <div className="flex-1 bg-secondary-100 overflow-auto p-8" onClick={handleCanvasClick}>
      <div
        className={`max-w-full mx-auto bg-white shadow-lg transition-all duration-300 ${selectedElement ? 'ring-2 ring-primary-500 ring-offset-4 ring-offset-secondary-100' : ''}`}
        style={{ aspectRatio: '16 / 9' }}
      >
        <div className="w-full h-full relative" ref={canvasRef}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          )}

          {templateContent ? (
            <>
              <iframe
                ref={iframeRef}
                srcDoc={templateContent}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts"
                title="Interactive Website Editor"
                onLoad={handleIframeLoad}
              />

              {/* Selected element indicator */}
              {selectedElement && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium z-20">
                  Selected: {selectedElement.type}
                  {selectedElement.attributes.class && ` .${selectedElement.attributes.class.split(' ')[0]}`}
                </div>
              )}

              {/* Editor instructions */}
              {!selectedElement && iframeLoaded && (
                <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-3 py-2 rounded-md text-sm z-20">
                  Click elements to select • Double-click text to edit
                </div>
              )}
            </>
          ) : !loading && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No template content available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;
