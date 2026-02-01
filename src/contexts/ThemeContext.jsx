import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to 'dark' (black/night theme)
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to 'dark' if not found
    const savedTheme = localStorage.getItem('muvelo-theme');
    return savedTheme || 'dark';
  });

  // Save to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('muvelo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}



