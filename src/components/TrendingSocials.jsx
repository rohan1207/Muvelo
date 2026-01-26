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
  // Red theme badge matching LiveDemo
  const badgeBg = isDark ? "bg-red-600/20 border-red-600/30" : "bg-red-600/10 border-red-600/20";
  const badgeText = isDark ? "text-red-400" : "text-red-600";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const subtitleColor = isDark ? "text-gray-300" : "text-[#6B6B6B]";

  return (
    <section
      className={`w-full ${bgClass} py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        {/* Heading */}
        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${headingColor} leading-tight`}
          >
            Trending on <span className="text-red-600">socials</span>
          </h2>
          
          <p
            className={`text-xs sm:text-sm md:text-base ${subColor} max-w-xl leading-relaxed`}
          >
            A live glimpse into how Muvelo lights up real spaces across social
            feeds – updated with our most loved moments.
          </p>
        </div>

        {/* Horizontal scroll area – clean, no fades, hidden scrollbar */}
        <div className="relative">
          <div
            className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-2 sm:pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {TRENDING_VIDEOS.map((item) => (
              <motion.article
                key={item.id}
                className={`snap-start flex-shrink-0 w-[160px] sm:w-[180px] md:w-[210px] lg:w-[230px] rounded-md overflow-hidden ${cardBg} border ${cardBorder} group`}
                
               
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-transparent">
                  <div className="w-full h-full overflow-hidden">
                    <video
                      src={item.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.15] group-hover:-translate-y-[10%]"
                      style={{ transformOrigin: 'center top' }}
                    />
                  </div>

                  {/* Branding tag */}
                  <div className={`absolute top-1.5 sm:top-2 left-1.5 sm:left-2 px-2 sm:px-2.5 py-0.5 rounded-full ${badgeBg} backdrop-blur-sm z-10`}>
                    <span className={`text-[8px] sm:text-[9px] tracking-[0.16em] uppercase ${badgeText} font-medium`}>
                      @muvelo.lamps
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 space-y-0.5 sm:space-y-1">
                  <h3 className={`text-xs sm:text-sm md:text-base font-semibold ${titleColor} line-clamp-2`}>
                    {item.title}
                  </h3>
                  <p className={`text-[10px] sm:text-xs md:text-sm ${subtitleColor} line-clamp-2 leading-relaxed`}>
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


