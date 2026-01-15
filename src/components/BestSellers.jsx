import React from "react";
import { motion } from "framer-motion";

// Placeholder data – replace imageSrc, price, etc. with real product data
const BESTSELLERS = [
  {
    id: 1,
    badge: "NEW LAUNCH",
    name: "Muvelo HÖT BLOX",
    description: "Smart oil-filled heater with soft ambient glow.",
    price: "₹13,999",
    mrp: "₹19,999",
    rating: "4.8",
    reviews: "112",
    imageSrc: "/product1.webp",
  },
  {
    id: 2,
    badge: "TRENDING",
    name: "Muvelo HÖT BAR",
    description: "Slim profile heater designed for modern homes.",
    price: "₹9,499",
    mrp: "₹14,999",
    rating: "4.9",
    reviews: "98",
    imageSrc: "/product2.webp",
  },
  {
    id: 3,
    badge: "ICONIC",
    name: "Muvelo BRISK",
    description: "Compact radiant heater with sculpted form.",
    price: "₹7,999",
    mrp: "₹11,499",
    rating: "4.7",
    reviews: "76",
    imageSrc: "/product3.webp",
  },
  {
    id: 4,
    badge: "MOST LOVED",
    name: "Muvelo REN PRO",
    description: "All‑rounder cleaning companion for warm spaces.",
    price: "₹12,499",
    mrp: "₹17,999",
    rating: "4.9",
    reviews: "134",
    imageSrc: "/product4.webp",
  },
  {
    id: 5,
    badge: "NEW LAUNCH",
    name: "Muvelo HÖT BLOX",
    description: "Smart oil-filled heater with soft ambient glow.",
    price: "₹13,999",
    mrp: "₹19,999",
    rating: "4.8",
    reviews: "112",
    imageSrc: "/product5.webp",
  },
  {
    id: 6,
    badge: "TRENDING",
    name: "Muvelo HÖT BAR",
    description: "Slim profile heater designed for modern homes.",
    price: "₹9,499",
    mrp: "₹14,999",
    rating: "4.9",
    reviews: "98",
    imageSrc: "/product6.webp",
  },
  {
    id: 7,
    badge: "ICONIC",
    name: "Muvelo BRISK",
    description: "Compact radiant heater with sculpted form.",
    price: "₹7,999",
    mrp: "₹11,499",
    rating: "4.7",
    reviews: "76",
    imageSrc: "/product7.webp",
  },
  {
    id: 8,
    badge: "MOST LOVED",
    name: "Muvelo REN PRO",
    description: "All‑rounder cleaning companion for warm spaces.",
    price: "₹12,499",
    mrp: "₹17,999",
    rating: "4.9",
    reviews: "134",
    imageSrc: "/product8.webp",
  },
];

const BestSellers = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-b from-black via-[#050505] to-black"
    : "bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]";

  // Match LiveDemo color theme
  const headingColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const subColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";
  
  // Card theme styles - matching LiveDemo
  const cardBg = isDark ? "bg-[#1a1a1a]" : "bg-white";
  const cardBorder = isDark ? "border-white/10" : "border-gray-200/50";
  const cardShadow = isDark 
    ? "shadow-[0_18px_60px_rgba(0,0,0,0.6)]" 
    : "shadow-[0_18px_60px_rgba(0,0,0,0.1)]";
  // Red theme badge matching LiveDemo
  const badgeBg = isDark ? "bg-red-600/20 border-red-600/30" : "bg-red-600/10 border-red-600/20";
  const badgeText = isDark ? "text-red-400" : "text-red-600";
  const imageBg = isDark 
    ? "bg-gradient-to-b from-white/10 via-white/0 to-white/5" 
    : "bg-gradient-to-b from-gray-50 via-white to-gray-50";
  const glowColor = isDark ? "from-red-600/10" : "from-red-600/10";
  const productNameColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const productDescColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";
  const ratingTextColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";
  const ratingBgColor = isDark ? "text-gray-400" : "text-[#6B6B6B]";
  const brandTextColor = isDark ? "text-gray-400" : "text-[#6B6B6B]";
  const mrpColor = isDark ? "text-gray-400" : "text-[#6B6B6B]";
  const priceColor = isDark ? "text-white" : "text-[#1a1a1a]";
  // Red button matching LiveDemo
  const buttonBg = "bg-red-600 hover:bg-red-700";

  return (
    <section
      className={`w-full ${bgClass} py-20 sm:py-24 px-4 sm:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Heading */}
        <div className="space-y-3 sm:space-y-4">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold ${headingColor}`}
          >
            Bestsellers this <span className="text-red-600">season</span>
          </h2>
          <p className={`text-sm sm:text-base font-light ${subColor} max-w-xl`}>
            Curated pieces that our community keeps coming back to – warm
            silhouettes, timeless finishes, and effortless everyday luxury.
          </p>
        </div>

        {/* Horizontal scroll area – clean, no edge fades, hidden scrollbar */}
        <div className="relative">
          <div
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {BESTSELLERS.map((item) => (
              <motion.article
                key={item.id}
                className={`snap-start flex-shrink-0 w-[230px] sm:w-[260px] md:w-[280px] rounded-3xl overflow-hidden ${cardBg} border ${cardBorder} ${cardShadow} relative group`}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1 rounded-full ${badgeBg} text-[10px] tracking-[0.16em] uppercase ${badgeText} backdrop-blur-sm`}>
                    {item.badge}
                  </span>
                </div>

                {/* Product image */}
                <div className={`relative ${imageBg} pt-10 pb-6 px-4`}>
                  <div className="relative aspect-[4/5] flex items-center justify-center">
                    {/* Glow behind product */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-t ${glowColor} via-transparent to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className={`max-h-full object-contain ${isDark ? 'drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)]' : 'drop-shadow-[0_18px_40px_rgba(0,0,0,0.15)]'} transition-transform duration-500 group-hover:scale-[1.03]`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Meta / details */}
                <div className="px-4 pb-4 space-y-2">
                  {/* Rating + reviews */}
                  <div className={`flex items-center justify-between text-[11px] ${ratingTextColor} mb-1`}>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 px-2 py-0.5 text-[10px] font-medium">
                        ★ {item.rating}
                      </span>
                      <span className={`text-[10px] ${ratingBgColor}`}>
                        ({item.reviews})
                      </span>
                    </div>
                    <span className={`uppercase tracking-[0.16em] text-[9px] ${brandTextColor}`}>
                      MUVELO
                    </span>
                  </div>

                  <h3 className={`text-sm sm:text-[15px] font-medium ${productNameColor} line-clamp-2`}>
                    {item.name}
                  </h3>
                  <p className={`text-[11px] ${productDescColor} line-clamp-2`}>
                    {item.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between pt-3">
                    <div className="space-y-0.5">
                      <p className={`text-xs ${mrpColor} line-through`}>
                        {item.mrp}
                      </p>
                      <p className={`text-sm font-semibold ${priceColor}`}>
                        {item.price}
                      </p>
                    </div>

                    <motion.div
                      className="relative inline-block w-fit overflow-hidden rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.button
                        className={`relative z-10 inline-block ${buttonBg} text-white text-[11px] font-semibold tracking-[0.16em] uppercase px-4 py-2 rounded-full shadow-lg transition-colors duration-300 overflow-hidden`}
                      >
                        <span className="relative z-30">Add to cart</span>
                        
                        {/* Shiny glass shine effect - moves from left to right */}
                        <motion.div
                          className="absolute inset-0 z-20 rounded-full"
                          initial={{ x: '-100%', skewX: '-20deg' }}
                          whileHover={{ x: '200%' }}
                          transition={{ 
                            duration: 0.9,
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
                            width: '50%',
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;


