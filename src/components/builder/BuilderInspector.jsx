import React, { useState } from 'react';
import { Settings, Zap, Layout, Wand2, Droplet, ChevronDown, ChevronUp, Image, Type, MousePointer, Paintbrush } from 'lucide-react';
import { useBuilder } from '../../contexts/BuilderContext';

const TABS = [
  { id: 'screen', name: 'Screen', icon: Settings },
  { id: 'actions', name: 'Actions', icon: Zap },
  { id: 'layout', name: 'Layout', icon: Layout },
  { id: 'effects', name: 'Effects', icon: Wand2 },
];

const Toggle = ({ label, enabled, setEnabled, description }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div>
        <span className="text-sm text-gray-700 font-medium">{label}</span>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>
);

const ColorInput = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700 font-medium">{label}</span>
    <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2 cursor-pointer hover:border-gray-400 transition-colors">
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="w-4 h-4 rounded border border-gray-300 cursor-pointer"
      />
      <span className="text-xs text-gray-600">{value}</span>
    </div>
  </div>
);

const SliderInput = ({ label, value, onChange, min = 0, max = 100, unit = '%' }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 font-medium">{label}</span>
      <span className="text-sm text-gray-600">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      style={{
        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
      }}
    />
  </div>
);

const SelectInput = ({ label, value, options, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700 font-medium">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const NumberInput = ({ label, value, onChange, unit, min, max }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700 font-medium">{label}</span>
    <div className="flex items-center space-x-1">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {unit && <span className="text-xs text-gray-500">{unit}</span>}
    </div>
  </div>
);

const BuilderInspector = () => {
  const [activeTab, setActiveTab] = useState('screen');
  const { selectedElement, setSelectedElement } = useBuilder();

  // State for different property types
  const [overlay, setOverlay] = useState(false);
  const [overlayColor, setOverlayColor] = useState('#101c1e');
  const [opacity, setOpacity] = useState(50);
  const [screenCaption, setScreenCaption] = useState(false);
  const [captionColor, setCaptionColor] = useState('#28313a');
  const [captionPosition, setCaptionPosition] = useState('bottom');
  const [popup, setPopup] = useState(false);
  const [entranceAnimation, setEntranceAnimation] = useState(false);
  const [scrollingEffects, setScrollingEffects] = useState(false);
  const [animationType, setAnimationType] = useState('fadeIn');
  const [duration, setDuration] = useState(1000);
  const [delay, setDelay] = useState(0);
  const [scrollEffectType, setScrollEffectType] = useState('parallax');
  const [scrollDevices, setScrollDevices] = useState('all');
  const [scrollPreview, setScrollPreview] = useState(false);

  const getElementSpecificProperties = () => {
    if (!selectedElement) return null;

    const elementType = selectedElement.type?.toLowerCase();

    const handleAttributeChange = (attributeName, value) => {
      // Update element attributes
      if (selectedElement.element) {
        selectedElement.element.setAttribute(attributeName, value);
      }
      // Update the selectedElement state
      setSelectedElement(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeName]: value
        }
      }));
    };

    const handleContentChange = (value) => {
      // Update element content in the iframe
      if (selectedElement.element) {
        selectedElement.element.textContent = value;
      }
      // Update the selectedElement state
      setSelectedElement(prev => ({
        ...prev,
        content: value
      }));
    };

    switch (elementType) {
      case 'img':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Image Properties</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Alternative text</span>
                  <input
                    type="text"
                    value={selectedElement.attributes?.alt || ''}
                    onChange={(e) => handleAttributeChange('alt', e.target.value)}
                    placeholder="Describe the image..."
                    className="w-40 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'p':
      case 'span':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Text Properties</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Content</span>
                  <textarea
                    value={selectedElement.content || ''}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Enter text content..."
                    className="w-40 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Element Properties</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Properties for <span className="font-medium">{elementType}</span> elements
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Properties</h3>
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
            <ChevronUp className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {selectedElement && (
        <div className="p-3 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-700">
              {selectedElement.type} element selected
            </span>
          </div>
          {selectedElement.attributes?.class && (
            <div className="text-xs text-blue-600 mt-1">
              Class: {selectedElement.attributes.class}
            </div>
          )}
        </div>
      )}

      <div className="border-b border-gray-200">
        <nav className="flex p-1 space-x-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-3 w-3" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {selectedElement && getElementSpecificProperties()}

          {activeTab === 'screen' && (
            <>
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Overlay</h4>
                <Toggle
                  label="Apply overlay"
                  enabled={overlay}
                  setEnabled={setOverlay}
                  description="Add a color overlay to the element"
                />
                {overlay && (
                  <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                    <ColorInput
                      label="Overlay color"
                      value={overlayColor}
                      onChange={(e) => setOverlayColor(e.target.value)}
                    />
                    <SliderInput label="Opacity" value={opacity} onChange={setOpacity} />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Screen Caption</h4>
                <Toggle
                  label="Add screen caption"
                  enabled={screenCaption}
                  setEnabled={setScreenCaption}
                  description="Display a caption overlay"
                />
                {screenCaption && (
                  <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                    <ColorInput
                      label="Background color"
                      value={captionColor}
                      onChange={(e) => setCaptionColor(e.target.value)}
                    />
                    <SelectInput
                      label="Position"
                      value={captionPosition}
                      options={[
                        { value: 'top', label: 'Top' },
                        { value: 'bottom', label: 'Bottom' },
                        { value: 'center', label: 'Center' }
                      ]}
                      onChange={setCaptionPosition}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Popup</h4>
                <Toggle
                  label="Open in pop-up window"
                  enabled={popup}
                  setEnabled={setPopup}
                  description="Open content in a modal popup"
                />
              </div>
            </>
          )}

          {activeTab === 'effects' && (
            <>
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Entrance Animation</h4>
                <Toggle
                  label="Apply animation"
                  enabled={entranceAnimation}
                  setEnabled={setEntranceAnimation}
                  description="Animate element when it enters the viewport"
                />
                {entranceAnimation && (
                  <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                    <SelectInput
                      label="Type"
                      value={animationType}
                      options={[
                        { value: 'fadeIn', label: 'Fade In' },
                        { value: 'slideUp', label: 'Slide Up' },
                        { value: 'slideDown', label: 'Slide Down' },
                        { value: 'slideLeft', label: 'Slide Left' },
                        { value: 'slideRight', label: 'Slide Right' },
                        { value: 'zoomIn', label: 'Zoom In' },
                        { value: 'zoomOut', label: 'Zoom Out' }
                      ]}
                      onChange={setAnimationType}
                    />
                    <NumberInput label="Duration" value={duration} onChange={setDuration} unit="ms" min={100} max={5000} />
                    <NumberInput label="Start after (ms)" value={delay} onChange={setDelay} unit="ms" min={0} max={5000} />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Scrolling Effects</h4>
                <Toggle
                  label="Apply animation"
                  enabled={scrollingEffects}
                  setEnabled={setScrollingEffects}
                  description="Animate element while scrolling"
                />
                {scrollingEffects && (
                  <div className="space-y-3 pl-4 border-l-2 border-blue-100">
                    <SelectInput
                      label="Type"
                      value={scrollEffectType}
                      options={[
                        { value: 'parallax', label: 'Parallax' },
                        { value: 'fadeScroll', label: 'Fade on Scroll' },
                        { value: 'scale', label: 'Scale on Scroll' }
                      ]}
                      onChange={setScrollEffectType}
                    />
                    <SelectInput
                      label="Show on devices"
                      value={scrollDevices}
                      options={[
                        { value: 'all', label: 'All devices' },
                        { value: 'desktop', label: 'Desktop only' },
                        { value: 'mobile', label: 'Mobile only' }
                      ]}
                      onChange={setScrollDevices}
                    />
                    <Toggle label="Enable Preview" enabled={scrollPreview} setEnabled={setScrollPreview} />
                  </div>
                )}
              </div>
            </>
          )}

          {(activeTab === 'actions' || activeTab === 'layout') && (
            <div className="text-center py-16 text-gray-500">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                  {activeTab === 'actions' ? <Zap className="h-6 w-6" /> : <Layout className="h-6 w-6" />}
                </div>
                <p className="text-sm">Properties for {activeTab} will appear here.</p>
                <p className="text-xs text-gray-400">Select an element to see available options.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderInspector;
