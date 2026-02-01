import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Home3 from './pages/Home3';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import LampshadesOnly from './pages/LampshadesOnly';
import NewLampshades from './pages/NewLampshades';
import Blogs from './pages/Blogs';
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
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home2" element={<Home3 />} />
          <Route path="/home3" element={<Home3 />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/lampshades" element={<LampshadesOnly />} />
          <Route path="/newlampshadespage" element={<NewLampshades />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


