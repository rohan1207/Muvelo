import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SystemSelector = ({ lampshade, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);

  if (!lampshade) return null;

  // Determine which systems this lampshade is compatible with
  const compatibleSystems = lampshade.compatibleSystems || [];
  const systemData = {
    bullet: {
      name: 'Bullet System',
      collections: ['Vaari', 'Ekkam', 'Ekkam Max'],
      description: 'Compact, button-operated, fully portable',
      image: lampshade.images.onBullet || lampshade.images.primary,
      color: isDark ? 'blue' : 'blue'
    },
    coremount: {
      name: 'CoreMount System',
      collections: ['Orran', 'Treya', 'Pico', 'Statti', 'Valenza', 'Bravena', 'Stallora'],
      description: 'Larger, touch-operated, scalable',
      image: lampshade.images.onCoreMount || lampshade.images.primary,
      color: isDark ? 'purple' : 'purple'
    }
  };

  const activeSystems = compatibleSystems.map(sys => systemData[sys]).filter(Boolean);

  if (activeSystems.length === 0) return null;

  const currentSystem = activeSystems[activeSystemIndex];

  const nextSystem = () => {
    setActiveSystemIndex((prev) => (prev + 1) % activeSystems.length);
  };

  const prevSystem = () => {
    setActiveSystemIndex((prev) => (prev - 1 + activeSystems.length) % activeSystems.length);
  };

  return (
    <div className={`w-full ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} rounded-xl border ${
      isDark ? 'border-white/10' : 'border-gray-200'
    } overflow-hidden`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            Fits with: {currentSystem.name}
          </h3>
          {activeSystems.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSystem}
                className={`p-1 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                aria-label="Previous system"
              >
                <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {activeSystemIndex + 1} / {activeSystems.length}
              </span>
              <button
                onClick={nextSystem}
                className={`p-1 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                aria-label="Next system"
              >
                <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          )}
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {currentSystem.description}
        </p>
      </div>

      {/* Visual Preview */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystemIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={currentSystem.image}
              alt={`${lampshade.name} on ${currentSystem.name}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe indicators for mobile */}
        {activeSystems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {activeSystems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSystemIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSystemIndex
                    ? isDark ? 'bg-white' : 'bg-gray-900'
                    : isDark ? 'bg-white/30' : 'bg-gray-400'
                }`}
                aria-label={`View ${systemData[compatibleSystems[index]]?.name}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Compatible Collections */}
      <div className={`p-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <p className={`text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Compatible Collections:
        </p>
        <div className="flex flex-wrap gap-2">
          {currentSystem.collections.map((collection) => (
            <span
              key={collection}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                isDark
                  ? 'bg-white/10 text-gray-300'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {collection}
            </span>
          ))}
        </div>
      </div>

      {/* Attach Info */}
      <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {lampshade.attachInfo}
        </p>
      </div>
    </div>
  );
};

export default SystemSelector;



