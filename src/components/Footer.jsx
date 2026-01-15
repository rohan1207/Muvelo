import { Link } from 'react-router-dom';

function Footer({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const footerBg = isDark
    ? 'bg-black/60 border-white/10'
    : 'bg-white/60 border-black/10';
  const footerTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const footerLinkHover = isDark ? 'hover:text-white' : 'hover:text-gray-900';
  const footerHeadingColor = isDark ? 'text-white' : 'text-gray-900';
  const dividerColor = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <footer
      className={`
        ${footerBg} ${footerTextColor}
        border-t backdrop-blur-xl backdrop-saturate-150
        mt-auto
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="MUVELO"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className={`text-sm ${footerTextColor} max-w-xs`}>
              Illuminate your everyday moments with lighting that adapts to your life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className={`text-sm uppercase tracking-[0.15em] mb-4 ${footerHeadingColor} font-semibold`}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Products
              </Link>
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Collections
              </Link>
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact & Info */}
          <div className="flex flex-col">
            <h3 className={`text-sm uppercase tracking-[0.15em] mb-4 ${footerHeadingColor} font-semibold`}>
              Connect
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Contact
              </Link>
              <Link
                to="/"
                className={`text-sm ${footerTextColor} ${footerLinkHover} transition-colors duration-200`}
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${dividerColor} my-8`} />

        {/* Bottom Section - Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs sm:text-sm ${footerTextColor} text-center sm:text-left`}>
            © {new Date().getFullYear()} MUVELO. All rights reserved.
          </p>
          
          {/* Stelora Media Credit - Prominently Displayed */}
          <div className="flex items-center gap-2">
            <p className={`text-xs sm:text-sm ${footerTextColor}`}>
              Designed and developed by
            </p>
            <a
              href="https://steloramedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xs sm:text-sm font-semibold
                ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}
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

