import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  // Generate a consistent set of random hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`,
    delay: `${Math.random() * 5}s`,
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-pink/20"
          style={{
            left: heart.left,
            fontSize: `${heart.scale * 2}rem`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 0.8, 0],
            rotate: [0, 45, -45, 0]
          }}
          transition={{
            duration: parseFloat(heart.animationDuration),
            repeat: Infinity,
            delay: parseFloat(heart.delay),
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;