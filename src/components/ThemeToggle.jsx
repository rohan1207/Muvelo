import { motion } from 'framer-motion';

function ThemeToggle({ theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';
  
  const buttonBg = isDark
    ? 'bg-black/60 border-white/20 hover:bg-black/80'
    : 'bg-white/60 border-black/20 hover:bg-white/80';
  const iconStroke = isDark ? '#ffffff' : '#000000';

  return (
    <motion.button
      type="button"
      onClick={onToggleTheme}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        border backdrop-blur-md
        flex items-center justify-center
        transition-all duration-300
        shadow-lg hover:shadow-xl
        ${buttonBg}
      `}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </motion.button>
  );
}

export default ThemeToggle;

