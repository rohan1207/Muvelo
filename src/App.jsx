import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Home3 from './pages/Home3';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MobileMessage from './components/MobileMessage';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Show mobile message for screens smaller than 768px (tablet and below)
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Show mobile message on small screens
  // if (isMobile) {
  //   return <MobileMessage />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home3 />} />
        <Route path="/home3" element={<Home3 />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;


