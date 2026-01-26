import { Link } from 'react-router-dom';
import { getCloudinaryImageUrl } from '../utils/cloudinary';

function Footer({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  // Match LiveDemo color theme
  const footerBg = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black border-white/10'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-black/10';
  const footerTextColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const footerLinkHover = isDark ? 'hover:text-white' : 'hover:text-[#1a1a1a]';
  const footerHeadingColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const dividerColor = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <footer
      className={`
        ${footerBg} ${footerTextColor}
        border-t backdrop-blur-xl backdrop-saturate-150
        mt-auto
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <img
                src={getCloudinaryImageUrl('logo', {
                  quality: 'auto:good',
                  format: 'auto',
                  width: 'auto',
                  crop: 'scale',
                })}
                alt="MUVELO"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className={`text-xs sm:text-sm md:text-base ${footerTextColor} max-w-xs leading-relaxed`}>
              Illuminate your everyday moments with lighting that adapts to your life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className={`text-xs sm:text-sm md:text-base uppercase tracking-[0.18em] mb-3 sm:mb-4 ${footerHeadingColor} font-semibold`}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link
                to="/home3"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Products
              </Link>
              <Link
                to="/home3#collections"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Collections
              </Link>
              <Link
                to="/home3#about"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact & Info */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1">
            <h3 className={`text-xs sm:text-sm md:text-base uppercase tracking-[0.18em] mb-3 sm:mb-4 ${footerHeadingColor} font-semibold`}>
              Connect
            </h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link
                to="/home3#contact"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Contact
              </Link>
              <Link
                to="/home3#blogs"
                className={`text-xs sm:text-sm md:text-base ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${dividerColor} my-6 sm:my-8`} />

        {/* Bottom Section - Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className={`text-xs sm:text-sm md:text-base ${footerTextColor} text-center sm:text-left`}>
            © {new Date().getFullYear()} MUVELO. All rights reserved.
          </p>
          
          {/* Stelora Media Credit - Prominently Displayed */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <p className={`text-xs sm:text-sm md:text-base ${footerTextColor} text-center sm:text-left`}>
              Designed and developed by
            </p>
            <a
              href="https://steloramedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xs sm:text-sm md:text-base font-semibold
                ${isDark ? 'text-white hover:text-gray-300' : 'text-[#1a1a1a] hover:text-gray-600'}
                transition-colors duration-200
                underline underline-offset-2
              `}
            >
              Stelora Media
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

