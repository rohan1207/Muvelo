import { motion } from 'framer-motion';

function MobileMessage() {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/logo.png"
            alt="MUVELO"
            className="h-16 w-auto object-contain"
          />
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8 leading-relaxed"
        >
          Team Stelora is working hard on it. The mobile experience will be available soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
        >
          <p className="text-white text-base mb-2 font-semibold">
            📱 Please visit on desktop
          </p>
          <p className="text-gray-300 text-sm">
            For the best experience, please access MUVELO on a desktop or tablet screen.
          </p>
        </motion.div>

        {/* Stelora Media Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-sm text-gray-400"
        >
          <p>
            Designed and developed by{' '}
            <a
              href="https://steloramedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 underline underline-offset-2 transition-colors"
            >
              Stelora Media
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MobileMessage;

