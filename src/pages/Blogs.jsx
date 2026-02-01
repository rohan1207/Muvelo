import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import NavBar from '../components/NavBar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const BLOG_CATEGORIES = ['All', 'Lighting', 'Design', 'Lifestyle', 'Tips'];

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Art of Layered Light',
    excerpt: 'How to combine ambient, task, and accent lighting to transform any space into a sanctuary.',
    category: 'Lighting',
    date: 'Jan 28, 2026',
    readTime: '5 min',
    featured: true,
  },
  {
    id: '2',
    title: 'Minimal Lamps for Modern Living',
    excerpt: 'Less is more: why clean lines and thoughtful placement beat clutter every time.',
    category: 'Design',
    date: 'Jan 26, 2026',
    readTime: '4 min',
    featured: false,
  },
  {
    id: '3',
    title: 'Night Rituals: Wind Down with Warm Light',
    excerpt: 'Science-backed ways to use light for better sleep and calmer evenings.',
    category: 'Lifestyle',
    date: 'Jan 24, 2026',
    readTime: '6 min',
    featured: false,
  },
  {
    id: '4',
    title: 'Choosing the Right Bulb Temperature',
    excerpt: 'A quick guide to kelvin, warmth, and mood—so you never pick the wrong tone again.',
    category: 'Tips',
    date: 'Jan 22, 2026',
    readTime: '3 min',
    featured: false,
  },
  {
    id: '5',
    title: 'Statement Pieces That Don\'t Overwhelm',
    excerpt: 'Bold lamps that anchor a room without stealing the show.',
    category: 'Design',
    date: 'Jan 20, 2026',
    readTime: '5 min',
    featured: false,
  },
  {
    id: '6',
    title: 'Lighting Your Home Office',
    excerpt: 'Reduce eye strain and boost focus with the right setup.',
    category: 'Lighting',
    date: 'Jan 18, 2026',
    readTime: '4 min',
    featured: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Blogs() {
  const { theme, toggleTheme } = useTheme();
  const [category, setCategory] = useState('All');
  const isDark = theme === 'dark';

  const filteredPosts = useMemo(() => {
    if (category === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const pageBg = isDark
    ? 'bg-[#050505] text-white'
    : 'bg-[#FAF9F6] text-[#1a1a1a]';
  const cardBg = isDark
    ? 'bg-white/[0.04] border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.06]'
    : 'bg-white border-black/[0.06] hover:border-black/[0.12] hover:shadow-lg';
  const muted = isDark ? 'text-gray-400' : 'text-[#6B6B6B]';

  return (
    <div className={`min-h-screen flex flex-col ${pageBg}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Headline */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 sm:mb-16 md:mb-20"
          >
            <p
              className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase ${muted} mb-3`}
            >
              MUVELO Journal
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-2xl">
              Ideas & inspiration for how you live.
            </h1>
          </motion.header>

          {/* Category pills */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase
                  transition-all duration-200
                  ${
                    category === cat
                      ? isDark
                        ? 'bg-white text-black'
                        : 'bg-black text-white'
                      : isDark
                        ? 'bg-white/[0.06] text-gray-400 hover:bg-white/[0.1] hover:text-white border border-white/[0.08]'
                        : 'bg-black/[0.04] text-[#6B6B6B] hover:bg-black/[0.08] hover:text-[#1a1a1a] border border-black/[0.06]'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </motion.nav>

          {/* Featured hero card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`featured-${featuredPost?.id}`}
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8 sm:space-y-10"
            >
              {featuredPost && (
                <motion.article variants={item}>
                  <Link
                    to={`/blogs/${featuredPost.id}`}
                    className={`
                      block rounded-2xl sm:rounded-3xl border overflow-hidden
                      transition-all duration-300 ease-out
                      ${cardBg}
                    `}
                  >
                    <div className="aspect-[21/9] sm:aspect-[3/1] min-h-[180px] sm:min-h-[220px] relative">
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? 'bg-gradient-to-br from-red-950/40 via-neutral-900 to-black'
                            : 'bg-gradient-to-br from-red-100/60 via-neutral-100 to-[#FAF9F6]'
                        }`}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
                        <span
                          className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase ${muted} mb-2`}
                        >
                          {featuredPost.category} · {featuredPost.date}
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight max-w-2xl">
                          {featuredPost.title}
                        </h2>
                        <p
                          className={`mt-2 sm:mt-3 text-sm sm:text-base ${muted} max-w-xl line-clamp-2`}
                        >
                          {featuredPost.excerpt}
                        </p>
                        <span
                          className={`mt-4 text-xs ${muted}`}
                        >
                          {featuredPost.readTime} read
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Bento grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                variants={container}
              >
                {gridPosts.slice(0, 6).map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={item}
                    className={
                      index === 0 && gridPosts.length >= 3
                        ? 'sm:col-span-2 lg:col-span-2'
                        : ''
                    }
                  >
                    <Link
                      to={`/blogs/${post.id}`}
                      className={`
                        block h-full rounded-xl sm:rounded-2xl border p-5 sm:p-6
                        transition-all duration-300 ease-out
                        ${cardBg}
                      `}
                    >
                      <span
                        className={`text-[10px] tracking-[0.18em] uppercase ${muted}`}
                      >
                        {post.category}
                      </span>
                      <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold tracking-tight leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p
                        className={`mt-2 text-sm ${muted} line-clamp-2`}
                      >
                        {post.excerpt}
                      </p>
                      <div
                        className={`mt-4 pt-4 border-t flex items-center justify-between text-[11px] ${muted} ${
                          isDark ? 'border-white/[0.08]' : 'border-black/[0.06]'
                        }`}
                      >
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center ${muted} py-16`}
            >
              No posts in this category yet.
            </motion.p>
          )}
        </div>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

export default Blogs;
