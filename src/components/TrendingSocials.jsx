import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { getCloudinaryVideoUrl } from "../utils/cloudinary";

// Base data config – Cloudinary URLs will be generated (video2 skipped as it failed to upload)
const TRENDING_VIDEOS_BASE = [
  {
    id: 1,
    title: "Muvelo | Studio Collection",
    subtitle: "Captured in natural light",
    videoId: "video1",
  },
  {
    id: 2,
    title: "Muvelo | Evening Glow",
    subtitle: "Soft ambient scenes",
    videoId: "video2", // This failed to upload, will use local fallback
    useLocal: true,
  },
  {
    id: 3,
    title: "Muvelo | Crafted Details",
    subtitle: "A closer look at texture",
    videoId: "video3",
  },
  {
    id: 4,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video4",
  },
  {
    id: 5,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video5",
  },
  {
    id: 6,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video6",
  },
  {
    id: 7,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video7",
  },
  {
    id: 8,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video8", // Not in upload list, will use local fallback
    useLocal: true,
  },
  {
    id: 9,
    title: "Muvelo | In the Wild",
    subtitle: "Styled interiors",
    videoId: "video9",
  },
];

const TrendingSocials = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  // Generate Cloudinary URLs for videos (skip video2 and video8 - use local fallback)
  const TRENDING_VIDEOS = useMemo(() => {
    return TRENDING_VIDEOS_BASE.map(item => ({
      ...item,
      videoSrc: item.useLocal 
        ? `/${item.videoId}.mp4` // Local fallback for video2 and video8
        : getCloudinaryVideoUrl(item.videoId, {
            quality: 'auto:good',
            format: 'auto',
            width: 'auto',
          }),
    }));
  }, []);

  // Match LiveDemo color theme
  const bgClass = isDark
    ? "bg-gradient-to-b from-black via-[#050505] to-black"
    : "bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]";

  const headingColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const subColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";
  
  // Card theme styles - matching LiveDemo
  const cardBg = isDark ? "bg-[#1a1a1a]" : "bg-white";
  const cardBorder = isDark ? "border-white/10" : "border-gray-200/50";
  const cardShadow = isDark 
    ? "shadow-[0_18px_60px_rgba(0,0,0,0.55)]" 
    : "shadow-[0_18px_60px_rgba(0,0,0,0.1)]";
  const videoBg = isDark ? "bg-black" : "bg-gray-100";
  // Red theme badge matching LiveDemo
  const badgeBg = isDark ? "bg-red-600/20 border-red-600/30" : "bg-red-600/10 border-red-600/20";
  const badgeText = isDark ? "text-red-400" : "text-red-600";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const subtitleColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";

  return (
    <section
      className={`w-full ${bgClass} py-20 sm:py-24 px-4 sm:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Heading */}
        <div className="space-y-3 sm:space-y-4">
          <h2
            className={`font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold ${headingColor}`}
          >
            Trending on <span className="text-red-600">socials</span>
          </h2>
          <p
            className={`font-playfair text-2xl sm:text-3xl md:text-4xl font-normal ${headingColor}`}
          >
            right now
          </p>
          <p
            className={`text-sm sm:text-base font-light ${subColor} max-w-xl`}
          >
            A live glimpse into how Muvelo lights up real spaces across social
            feeds – updated with our most loved moments.
          </p>
        </div>

        {/* Horizontal scroll area – clean, no fades, hidden scrollbar */}
        <div className="relative">
          <div
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-2 sm:pb-3 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {TRENDING_VIDEOS.map((item) => (
              <motion.article
                key={item.id}
                className={`snap-start flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] rounded-3xl overflow-hidden ${cardBg} border ${cardBorder} ${cardShadow}`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <div className={`relative aspect-[9/16] ${videoBg}`}>
                  <video
                    src={item.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  {/* Branding tag */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${badgeBg} backdrop-blur-sm`}>
                    <span className={`text-[10px] tracking-[0.16em] uppercase ${badgeText} font-medium`}>
                      @muvelo.lamps
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="px-4 py-3 space-y-1.5">
                  <h3 className={`text-sm font-medium ${titleColor} line-clamp-2`}>
                    {item.title}
                  </h3>
                  <p className={`text-[11px] ${subtitleColor} line-clamp-2`}>
                    {item.subtitle}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSocials;


