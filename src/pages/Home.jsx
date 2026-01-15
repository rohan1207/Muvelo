import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';
import SecondSection from '../components/SecondSection';
import TrendingSocials from '../components/TrendingSocials';
import BestSellers from '../components/BestSellers'
import ProductShowcase from '../components/ProductShowcase'
import Banner from '../components/Banner'
import LiveDemo from '../components/LiveDemo'
import WhyChooseUs from '../components/WhyChooseUs'
import Ribbon from '../components/Ribbon'
import OwnerMessage from '../components/OwnerMessage'

function Home() {
  const lenisRef = useRef(null);
  const [theme, setTheme] = useState('dark');

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initialize Lenis smooth scroll with premium settings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easing curve
      smooth: true,
      smoothTouch: false, // Better performance on mobile
      touchMultiplier: 2,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Smooth RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />
      <Hero theme={theme} />
      <SecondSection theme={theme === 'dark' ? 'dark' : 'light'} />
      <BestSellers theme={theme === 'dark' ? 'dark' : 'light'} />
      <ProductShowcase theme={theme === 'dark' ? 'dark' : 'light'} />
      <Banner theme={theme === 'dark' ? 'dark' : 'light'} />
      
      <TrendingSocials theme={theme === 'dark' ? 'dark' : 'light'} />
      <LiveDemo theme={theme === 'dark' ? 'dark' : 'light'} />
      <WhyChooseUs theme={theme === 'dark' ? 'dark' : 'light'} />
      <Ribbon theme={theme === 'dark' ? 'dark' : 'light'} />
      <OwnerMessage theme={theme === 'dark' ? 'dark' : 'light'} />
      <Footer theme={theme} />
    </div>
  );
}

export default Home;
