import { Sun, Moon } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Particle = ({ delay, duration }) => (
  <motion.span
    className="absolute h-1 w-1 rounded-full bg-yellow-300"
    initial={{ scale: 0, opacity: 1 }}
    animate={{
      scale: [0, 3, 0],
      opacity: [1, 1, 0],
      y: [0, -40],
      x: [0, (Math.random() - 0.5) * 60],
    }}
    transition={{
      duration,
      delay,
      ease: "easeOut",
    }}
  />
);

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [particles, setParticles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef(null);

  const isDark = theme === 'dark';

  const generateParticles = () => {
    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.1,
      duration: 0.6 + i * 0.1,
    }));
    setParticles(newParticles);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  const handleToggle = () => {
    generateParticles();
    toggleTheme();
  };

  return (
    <div className="relative inline-block">
      <button
        ref={toggleRef}
        onClick={handleToggle}
        className="relative flex h-16 w-26 items-center rounded-full bg-gray-200 p-1 transition-colors dark:bg-gray-800"
        aria-label="Toggle theme"
      >
        <motion.div
          className="absolute h-14 w-14 rounded-full bg-white shadow-md"
          layout
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          style={{
            x: isDark ? 40 : 0,
          }}
        >
          {isAnimating &&
            particles.map((particle) => (
              <Particle
                key={particle.id}
                delay={particle.delay}
                duration={particle.duration}
              />
            ))}
        </motion.div>

        <Sun className={`h-6 w-6 ${isDark ? 'opacity-50' : 'text-yellow-500'}`} />
        <Moon className={`ml-auto h-6 w-6 ${isDark ? 'text-blue-400' : 'opacity-50'}`} />
      </button>
    </div>
  );
}