import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import productsData from '../data/products.json';

const searchInProduct = (product, query) => {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(q) ||
    product.collection.toLowerCase().includes(q) ||
    product.shortDescription.toLowerCase().includes(q) ||
    (product.tags || []).some((t) => t.toLowerCase().includes(q))
  );
};

function Products() {
  const [theme, setTheme] = useState('light');
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('all');
  const [flag, setFlag] = useState('all'); // all | bestseller | new | limited
  const [sort, setSort] = useState('featured'); // featured | price-asc | price-desc

  const isDark = theme === 'dark';

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const collections = useMemo(
    () => ['all', ...Array.from(new Set(productsData.map((p) => p.collection)))],
    []
  );

  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // search
    list = list.filter((p) => searchInProduct(p, query));

    // collection filter
    if (collection !== 'all') {
      list = list.filter((p) => p.collection === collection);
    }

    // flag filter
    if (flag === 'bestseller') {
      list = list.filter((p) => p.flags?.isBestseller);
    } else if (flag === 'new') {
      list = list.filter((p) => p.flags?.isNew);
    } else if (flag === 'limited') {
      list = list.filter((p) => p.flags?.isLimited);
    }

    // sort
    if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'featured') {
      list.sort((a, b) => (b.flags?.isBestseller ? 1 : 0) - (a.flags?.isBestseller ? 1 : 0));
    }

    return list;
  }, [collection, flag, query, sort]);

  const formatPrice = (v) => `₹${v.toLocaleString('en-IN')}`;

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white' : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]'}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-28"
      >
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {/* Hero / heading */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 max-w-3xl">
              <p className={`text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                Muvelo collection
              </p>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                Lighting in <span className="text-red-600">Motion</span>
              </h1>
              <p className={`max-w-xl text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                A calm, visual shelf of every Muvelo lamp. Fluid filters, soft motion and
                distraction‑free browsing so users can explore without friction.
              </p>
            </div>

            {/* Row: search + smart controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-6">
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Search by name, use, collection or mood…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`w-full rounded-full px-4 sm:px-5 py-2.5 sm:py-3 pl-10 sm:pl-11 text-xs sm:text-sm md:text-base outline-none transition-colors
                    ${isDark
                      ? 'bg-white/6 border border-white/12 text-white placeholder:text-gray-500 focus:border-white/40 focus:bg-white/10'
                      : 'bg-white border border-black/10 text-[#1a1a1a] placeholder:text-gray-500 focus:border-black/40 focus:bg-white'
                    }`}
                />
                <span className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ⌕
                </span>
              </div>

              {/* Sort as segmented control */}
              <div className={`inline-flex items-center gap-0.5 sm:gap-1 rounded-full px-0.5 sm:px-1 py-0.5 sm:py-1 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.18em]
                ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}
              `}>
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'price-asc', label: 'Low → High' },
                  { id: 'price-desc', label: 'High → Low' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSort(opt.id)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-colors touch-manipulation ${
                      sort === opt.id
                        ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                        : isDark ? 'text-gray-300 hover:bg-white/10 active:bg-white/15' : 'text-gray-700 hover:bg-black/5 active:bg-black/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 md:gap-4 md:items-center md:justify-between">
              {/* Collections – horizontally scrollable pill row */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
                {collections.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setCollection(col)}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors touch-manipulation
                      ${
                        collection === col
                          ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                          : isDark ? 'bg-white/4 text-gray-300 hover:bg-white/10 active:bg-white/15' : 'bg-black/5 text-gray-700 hover:bg-black/10 active:bg-black/15'
                      }`}
                  >
                    {col === 'all' ? 'All collections' : col}
                  </button>
                ))}
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'bestseller', label: 'Bestsellers' },
                  { id: 'new', label: 'New' },
                  { id: 'limited', label: 'Limited' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlag(f.id)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.18em] uppercase transition-colors touch-manipulation
                      ${
                        flag === f.id
                          ? 'bg-red-500 text-white'
                          : isDark ? 'bg-white/4 text-gray-300 hover:bg-white/10 active:bg-white/15' : 'bg-black/5 text-gray-700 hover:bg-black/10 active:bg-black/15'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-7 pt-3 sm:pt-4"
          >
            {filteredProducts.map((product, index) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="group">
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex flex-col gap-2 sm:gap-2.5 md:gap-3"
                >
                  {/* Image - clean, no overlays */}
                  <div className={`relative aspect-[4/5] rounded-lg overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.25)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                    ${isDark ? 'bg-gradient-to-b from-white/4 via-white/0 to-white/5' : 'bg-gradient-to-b from-black/5 via-black/0 to-black/10'}
                  `}>
                    <motion.img
                      src={product.images.on}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Minimal badge - only if needed, subtle */}
                    {product.badge && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] tracking-[0.16em] uppercase backdrop-blur-md
                          ${isDark ? 'bg-black/70 text-gray-100' : 'bg-white/80 text-black'}
                        `}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Minimal rating - only on hover */}
                    <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] text-amber-300 backdrop-blur-md
                      ${isDark ? 'bg-black/70' : 'bg-white/85 text-amber-500'}
                    `}>
                      <span>★ {product.rating?.average?.toFixed(1) ?? '4.8'}</span>
                    </div>
                  </div>

                  {/* Below image – all text content */}
                  <div className="flex flex-col gap-2 sm:gap-2.5">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-xs sm:text-sm md:text-base font-semibold tracking-wide mb-0.5 sm:mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                          {product.name}
                        </h2>
                        <p className={`text-[10px] sm:text-xs md:text-sm line-clamp-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                          {product.shortDescription}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 sm:gap-1 flex-shrink-0">
                        <span className={`text-xs sm:text-sm md:text-base font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                          {formatPrice(product.price)}
                        </span>
                        <span className={`text-[10px] sm:text-xs uppercase tracking-[0.18em] ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                          {product.collection}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {(product.primaryUse || []).slice(0, 2).map((use) => (
                        <span
                          key={use}
                          className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${isDark ? 'bg-white/5 text-gray-200/90' : 'bg-black/5 text-gray-800'}`}
                        >
                          {use}
                        </span>
                      ))}
                      {product.flags?.isBestseller && (
                        <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/15 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                          Bestseller
                        </span>
                      )}
                      {product.flags?.isNew && (
                        <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          New
                        </span>
                      )}
                      {product.flags?.isLimited && (
                        <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-amber-500/15 ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
                          Limited
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>
        </section>
      </motion.main>

      <Footer theme="dark" />
    </div>
  );
}

export default Products;


