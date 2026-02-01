import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

const SystemAddToCart = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [added, setAdded] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('bullet');

  const systems = [
    {
      id: 'bullet',
      name: 'Bullet System',
      description: 'Compact, button-operated, fully portable',
      price: 4999,
      image: '/bullet.jpg', // Add your system image path
      collections: ['Vaari', 'Ekkam', 'Ekkam Max']
    },
    {
      id: 'coremount',
      name: 'CoreMount System',
      description: 'Larger, touch-operated, scalable',
      price: 7999,
      image: '/core.jpg', // Add your system image path
      collections: ['Orran', 'Treya', 'Pico', 'Statti', 'Valenza', 'Bravena', 'Stallora']
    }
  ];

  const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    // TODO: Integrate with actual cart system
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentSystem = systems.find(s => s.id === selectedSystem);

  return (
    <div className={`sticky top-24 z-10 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} rounded-2xl border-2 ${
      isDark ? 'border-red-500/30 shadow-xl shadow-red-500/10' : 'border-red-200 shadow-xl'
    } overflow-hidden`}>
      {/* Header */}
      <div className={`p-5 border-b ${isDark ? 'border-white/10 bg-red-500/10' : 'border-gray-200 bg-red-50'}`}>
        <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
          Add System to Cart
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          System not included. Purchase separately.
        </p>
      </div>

      {/* System Selector */}
      <div className="p-5 space-y-5">
        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Select System:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {systems.map((system) => (
              <button
                key={system.id}
                onClick={() => setSelectedSystem(system.id)}
                className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left group ${
                  selectedSystem === system.id
                    ? isDark
                      ? 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20'
                      : 'border-red-600 bg-red-50 shadow-lg'
                    : isDark
                    ? 'border-white/10 hover:border-white/20 hover:shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* System Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.target.style.display = 'none';
                    }}
                  />
                  {!system.image && (
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDark ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        isDark ? 'text-white/20' : 'text-gray-300'
                      }`}>
                        {system.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* System Info */}
                <div className="p-3">
                  <div className={`font-semibold text-sm mb-1 ${
                    isDark ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>
                    {system.name}
                  </div>
                  <div className={`text-xs font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formatPrice(system.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Info */}
        {currentSystem && (
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <p className={`text-sm mb-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentSystem.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentSystem.collections.slice(0, 3).map((collection) => (
                <span
                  key={collection}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    isDark
                      ? 'bg-white/10 text-gray-300 border border-white/10'
                      : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                  }`}
                >
                  {collection}
                </span>
              ))}
              {currentSystem.collections.length > 3 && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  isDark ? 'bg-white/10 text-gray-300 border border-white/10' : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                }`}>
                  +{currentSystem.collections.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={added}
          className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
            added
              ? 'bg-green-600 shadow-green-600/30'
              : 'bg-red-600 hover:bg-red-700 shadow-red-600/30 hover:shadow-red-600/40'
          } disabled:cursor-not-allowed`}
          whileHover={!added ? { scale: 1.02 } : {}}
          whileTap={!added ? { scale: 0.98 } : {}}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add {currentSystem?.name} to Cart</span>
            </>
          )}
        </motion.button>

        {/* Price Display */}
        {currentSystem && (
          <div className="text-center pt-2">
            <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {formatPrice(currentSystem.price)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemAddToCart;

