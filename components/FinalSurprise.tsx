import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

declare global {
  interface Window {
    confetti: any;
  }
}

const FinalSurprise: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    
    if (typeof window.confetti === 'function') {
        // Colors: Hot pink, Light pink, Deep pink, Raspberry, Pale Violet Red
        const pinkColors = ['#FF1493', '#FF69B4', '#FFC0CB', '#E30B5C', '#DB7093'];

        // Fire a central burst
        window.confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: pinkColors,
            disableForReducedMotion: true,
            zIndex: 1000,
        });

        // Fire side cannons for a longer effect
        const end = Date.now() + 1000;

        (function frame() {
            window.confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: pinkColors,
                zIndex: 1000,
            });
            window.confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: pinkColors,
                zIndex: 1000,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
  };

  return (
    <section className="flex flex-col items-center justify-center bg-rose-pink py-20 px-6 text-white relative overflow-hidden w-full h-full flex-grow">
      
      <div className="relative z-10 text-center">
        <h2 className="font-hand text-5xl md:text-6xl mb-8">One Last Thing...</h2>
        <p className="font-sans text-xl opacity-90 mb-12">This website will always be here for you.</p>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.button
              key="button"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReveal}
              className="bg-white text-rose-pink px-10 py-5 rounded-full font-bold text-xl shadow-2xl flex items-center gap-3 mx-auto cursor-pointer"
            >
              <Heart fill="#F8A1C4" />
              Click if you love me
            </motion.button>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white text-rose-pink p-10 rounded-3xl shadow-2xl max-w-md mx-auto"
            >
              <h3 className="font-cute text-4xl mb-4">I Love You More Than Pink! 💗</h3>
              <p className="text-gray-500">And that's a lot!</p>
              <div className="flex justify-center gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ delay: i * 0.1, repeat: Infinity, duration: 1.5 }}
                  >
                    <Heart fill="#F8A1C4" size={24} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
         <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default FinalSurprise;