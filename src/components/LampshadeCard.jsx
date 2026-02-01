import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const LampshadeCard = ({ lampshade, onSelect, isSelected, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState(false);

  const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

  const getSystemBadgeColor = (system) => {
    if (system === 'bullet') {
      return isDark 
        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
        : 'bg-blue-100 text-blue-700 border-blue-300';
    } else {
      return isDark 
        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
        : 'bg-purple-100 text-purple-700 border-purple-300';
    }
  };

  const getSystemName = (system) => {
    return system === 'bullet' ? 'Bullet System' : 'CoreMount System';
  };

  return (
    <motion.div
      className={`relative group cursor-pointer ${
        isDark ? 'bg-[#1a1a1a]' : 'bg-white'
      } rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-xl ${
        isSelected 
          ? isDark ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-red-600 shadow-lg'
          : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(lampshade)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Lampshade Only Label */}
      <div className={`absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
        isDark ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        Lampshade Only
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.img
          src={lampshade.images.primary}
          alt={lampshade.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-red-500/10 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-red-500" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 space-y-3 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
        {/* Name */}
        <h3 className="font-semibold text-sm sm:text-base leading-tight">
          {lampshade.name}
        </h3>

        {/* System Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-medium border shadow-sm ${getSystemBadgeColor(lampshade.system)}`}>
            {getSystemName(lampshade.system)}
          </span>
        </div>

        {/* Compatible Collections */}
        <div className="space-y-1">
          <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Fits with:
          </p>
          <div className="flex flex-wrap gap-1">
            {lampshade.compatibleCollections.slice(0, 3).map((collection) => (
              <span
                key={collection}
                className={`px-2.5 py-1 rounded-full text-[9px] font-medium ${
                  isDark 
                    ? 'bg-white/10 text-gray-300 border border-white/10' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {collection}
              </span>
            ))}
            {lampshade.compatibleCollections.length > 3 && (
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium ${
                isDark ? 'bg-white/10 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                +{lampshade.compatibleCollections.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {formatPrice(lampshade.price)}
          </span>
          {lampshade.mrp && lampshade.mrp > lampshade.price && (
            <span className={`text-sm line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {formatPrice(lampshade.mrp)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LampshadeCard;

