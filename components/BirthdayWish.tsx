import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Declare canvas-confetti types
declare global {
  interface Window {
    confetti: any;
  }
}

const BirthdayWish: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [candlesBlown, setCandlesBlown] = useState(false);

  useEffect(() => {
    if (isInView && window.confetti) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        window.confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FADADD', '#F4B6C2', '#F8A1C4']
        });
        window.confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FADADD', '#F4B6C2', '#F8A1C4']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-soft-pink/30 to-white text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 relative"
        >
            <div className="text-[100px] md:text-[150px] leading-none select-none relative inline-block">
                🎂
                {/* Simulated Candle Flame Animation */}
                {!candlesBlown && (
                    <motion.div 
                        className="absolute top-[10%] left-[45%] md:top-[15%] md:left-[48%] w-4 h-8 bg-yellow-400 rounded-full blur-[2px] opacity-80"
                        animate={{ 
                            scale: [1, 1.2, 1], 
                            opacity: [0.8, 1, 0.8],
                            rotate: [-5, 5, -5] 
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                )}
            </div>
            
            {!candlesBlown && (
                <button 
                    onClick={() => setCandlesBlown(true)}
                    className="mt-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm text-gray-500 shadow-sm hover:bg-white transition"
                >
                    Tap to blow the candle 🕯️
                </button>
            )}
            
             {candlesBlown && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-rose-pink font-bold"
                >
                    Yay! Make a wish! ✨
                </motion.div>
            )}

        </motion.div>

        <motion.blockquote 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-2xl md:text-4xl text-gray-800 italic mb-8 leading-normal"
        >
          “May this year bring you happiness, love, and everything you deserve.”
        </motion.blockquote>
      </div>
    </section>
  );
};

export default BirthdayWish;