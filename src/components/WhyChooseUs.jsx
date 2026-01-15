import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Lightbulb, Award, Battery, Leaf, MapPin, Grid } from "lucide-react";

const features = [
  {
    Icon: Lightbulb,
    title: "PREMIUM CRAFTSMANSHIP",
    description: "Each lamp is meticulously designed with attention to detail and elegant aesthetics.",
  },
  {
    Icon: Battery,
    title: "24+ HOURS BATTERY LIFE",
    description: "Charge for 3-4 hours and enjoy uninterrupted lighting for a full day.",
  },
  {
    Icon: Leaf,
    title: "SUSTAINABLE MATERIALS",
    description: "Crafted using industrially compostable BioPlastic materials.",
  },
  {
    Icon: Grid,
    title: "MODULAR DESIGN",
    description: "Swap and change designs to match your style and space.",
  },
  {
    Icon: MapPin,
    title: "MADE IN INDIA",
    description: "Proudly designed and crafted in small batches, right here in India.",
  },
  {
    Icon: Award,
    title: "TIMELESS ELEGANCE",
    description: "Blending classic design with modern functionality for lasting beauty.",
  },
];

const WhyChooseUs = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yRange = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const y = useSpring(yRange, { stiffness: 50, damping: 30, restDelta: 0.001 });
  const scale = useSpring(scaleRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });
  const rotate = useSpring(rotateRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  const bgClass = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]';
  
  // Match LiveDemo color theme
  const headingColor = isDark ? 'text-red-400' : 'text-red-600';
  const titleColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const subTextColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const cardBg = isDark ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white/80 backdrop-blur-sm border border-gray-200/50';
  const cardHover = isDark ? 'hover:bg-[#1a1a1a]/80' : 'hover:bg-white/90';
  const iconBg = isDark ? 'bg-red-600/20' : 'bg-red-600/10';
  const iconColor = isDark ? 'text-red-400' : 'text-red-600';

  return (
    <div
      ref={containerRef}
      className={`relative ${bgClass} py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden`}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-sm font-bold ${headingColor} tracking-widest uppercase`}
          >
            WHY CHOOSE US?
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`mt-2 text-3xl sm:text-4xl font-bold ${titleColor} tracking-tight lg:text-4xl`}
          >
            ILLUMINATE WITH <span className="text-red-600">CONFIDENCE</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-start ${cardBg} ${cardHover} p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all duration-500`}
            >
              <div className={`flex-shrink-0 ${iconBg} p-3 rounded-full`}>
                <feature.Icon size={32} className={iconColor} />
              </div>
              <div className="ml-4">
                <h4 className={`text-base sm:text-lg font-light ${textColor} tracking-wide`}>
                  {feature.title}
                </h4>
                <p className={`mt-1 text-sm sm:text-base ${subTextColor} font-light leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Tomato Image */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-auto sm:top-[-15%] sm:right-[-10%] sm:translate-x-0 sm:translate-y-0 w-52 sm:w-60 h-52 sm:h-60 z-0 pointer-events-none opacity-40 sm:opacity-100"
          style={{ y, scale, rotate }}
        >
          <img
            src="/wcu.png"
            alt="Fresh Tomato"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;