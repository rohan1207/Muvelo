import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Product data - 8 products total (2 rows x 4 columns)
// Each product has off and on image variants
const PRODUCTS = [
  {
    id: 1,
    name: "Muvelo Classic",
    price: "₹12,999",
    imageOff: "/product1-off.png",
    imageOn: "/product1.webp",
  },
  {
    id: 2,
    name: "Muvelo Modern",
    price: "₹15,499",
    imageOff: "/product2-off.png",
    imageOn: "/product2.webp",
  },
  {
    id: 3,
    name: "Muvelo Elegant",
    price: "₹18,999",
    imageOff: "/product3-off.png",
    imageOn: "/product3.webp",
  },
  {
    id: 4,
    name: "Muvelo Premium",
    price: "₹22,499",
    imageOff: "/product4-off.png",
    imageOn: "/product4.webp",
  },
  {
    id: 5,
    name: "Muvelo Studio",
    price: "₹14,999",
    imageOff: "/product5-off.png",
    imageOn: "/product5.webp",
  },
  {
    id: 6,
    name: "Muvelo Luxe",
    price: "₹19,999",
    imageOff: "/product6-off.png",
    imageOn: "/product6.webp",
  },
  {
    id: 7,
    name: "Muvelo Artisan",
    price: "₹16,499",
    imageOff: "/product7-off.png",
    imageOn: "/product7.webp",
  },
  {
    id: 8,
    name: "Muvelo Signature",
    price: "₹24,999",
    imageOff: "/product8-off.png",
    imageOn: "/product8.webp",
  },
];

const ProductShowcase = ({ theme = "dark" }) => {
  const [isOn, setIsOn] = useState(false);
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-b from-black via-[#050505] to-black"
    : "bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]";

  // Match LiveDemo color theme
  const headingColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const textColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const priceColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";

  return (
    <section
      className={`w-full ${bgClass} py-20 sm:py-24 px-4 sm:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Centered Heading */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${headingColor}`}
            style={{ letterSpacing: "0.02em" }}
          >
            Illuminate Your <span className="text-red-600">Space</span>
          </h2>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Toggle Switch */}
          <button
            onClick={() => setIsOn(!isOn)}
            className="relative focus:outline-none focus:ring-0"
          >
            {/* Subtle red glow effect - matching LiveDemo theme */}
            <motion.div
              className="absolute inset-0 rounded-full bg-red-600/20 blur-lg"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "80px",
                height: "80px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Toggle Switch Container - Black with white border */}
            <div className="relative w-16 h-9 rounded-full bg-black border-2 border-white transition-all duration-300">
              {/* Toggle Circle - White */}
              <motion.div
                className="absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-lg"
                animate={{
                  x: isOn ? 28 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </div>
          </button>

          {/* Text below toggle */}
          <p
            className={`text-sm font-light tracking-[0.15em] uppercase ${headingColor} opacity-80`}
          >
            Turn on your happiness
          </p>
        </motion.div>

        {/* Product Grid - 2 rows x 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-white/5">
                {/* Base image (off) - gradually fades out when turning on */}
                <motion.img
                  src={product.imageOff}
                  alt={`${product.name} - Off`}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    opacity: isOn ? 0 : 1,
                  }}
                  transition={{ 
                    opacity: {
                      duration: 2,
                      ease: [0.16, 1, 0.3, 1], // Very smooth, gradual easing - makes transition clearly visible
                    }
                  }}
                />

                {/* Overlay image (on) - gradually fades in when turning on */}
                <motion.img
                  src={product.imageOn}
                  alt={`${product.name} - On`}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    opacity: isOn ? 1 : 0,
                  }}
                  transition={{ 
                    opacity: {
                      duration: 2,
                      ease: [0.16, 1, 0.3, 1], // Very smooth, gradual easing - makes transition clearly visible
                    }
                  }}
                />

                {/* Subtle red glow effect when on - matching LiveDemo theme */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent pointer-events-none"
                  animate={{
                    opacity: isOn ? 1 : 0,
                  }}
                  transition={{ 
                    opacity: {
                      duration: 2,
                      ease: [0.16, 1, 0.3, 1], // Very smooth, gradual easing
                    }
                  }}
                />

                {/* Hover effect - slight scale */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>

              {/* Product Info - Name and Price only */}
              <div className="space-y-1 text-center">
                <h3
                  className={`text-sm sm:text-base font-light ${textColor} tracking-wide`}
                >
                  {product.name}
                </h3>
                <p className={`text-xs sm:text-sm ${priceColor} font-light`}>
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

