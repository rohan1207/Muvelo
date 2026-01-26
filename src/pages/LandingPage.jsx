import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingScreen from '../components/LandingScreen';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /home3 when loader is done
    const timer = setTimeout(() => {
      navigate('/home3');
    }, 4500); // match LandingScreen duration

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-black">
      <LandingScreen />
    </div>
  );
}

export default LandingPage;


