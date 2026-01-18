import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Sparkles, Star, Gift, Music, Smile, Cookie } from 'lucide-react';

declare global {
  interface Window {
    confetti: any;
    webkitAudioContext: typeof AudioContext;
  }
}

interface HeroProps {
  onStart: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const floatingIconVariants: Variants = {
  float: (i: number) => ({
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 3 + (i % 3),
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.5,
    },
  }),
};

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [showCornerMessage, setShowCornerMessage] = useState(false);

  const playWhimsicalSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const playNote = (freq: number, time: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      // Play a happy major arpeggio
      playNote(523.25, now, 0.3);       // C5
      playNote(659.25, now + 0.1, 0.3); // E5
      playNote(783.99, now + 0.2, 0.3); // G5
      playNote(1046.50, now + 0.3, 0.6); // C6
      
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setShowSecret(true);
      setClickCount(0);
      playWhimsicalSound();
      
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 180,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FFA500', '#FF4500'],
          shapes: ['star'],
          zIndex: 9999
        });
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-cream via-[#fff0f5] to-soft-pink/30 p-6 overflow-hidden">
      
      {/* Corner Easter Egg */}
      <div className="absolute top-6 left-6 z-20">
        <motion.div
           whileHover={{ scale: 1.2, rotate: 10 }}
           whileTap={{ scale: 0.9 }}
           onClick={() => {
             setShowCornerMessage(true);
             setTimeout(() => setShowCornerMessage(false), 3000);
           }}
           className="cursor-pointer opacity-30 hover:opacity-80 transition-opacity"
        >
          <Heart size={16} className="text-rose-pink" fill="currentColor" />
        </motion.div>
        <AnimatePresence>
          {showCornerMessage && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-8 w-48 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-pink-100"
            >
              <p className="text-xs font-serif text-gray-600 italic">"Yes, I really mean all of this."</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowSecret(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm border-4 border-accent-gold relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 to-amber-500"></div>
              <div className="mb-4 flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Cookie size={64} className="text-amber-500" strokeWidth={2} />
                </motion.div>
              </div>
              <h3 className="font-cute text-3xl text-rose-pink mb-2">Secret Found!</h3>
              <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                You clicked the gift 5 times! You're curious, aren't you? <br/>
                Here is a virtual cookie for being awesome! 🍪✨
              </p>
              <button 
                onClick={() => setShowSecret(false)}
                className="bg-rose-pink text-white px-8 py-3 rounded-full font-bold hover:bg-deep-rose transition shadow-lg hover:shadow-xl active:scale-95 transform"
              >
                Yum, thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Floating Particles (Subtle) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * 100 - 50 + "%", 
            y: Math.random() * 100 + "%",
            scale: 0.5 
          }}
          animate={{ 
            y: [null, Math.random() * -100 + "%"],
            rotate: Math.random() * 360,
          }}
          transition={{ 
            duration: Math.random() * 25 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
           {i % 2 === 0 ? <Heart size={15 + Math.random() * 20} className="text-rose-pink" /> : <Star size={10 + Math.random() * 15} className="text-accent-gold" />}
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-4xl relative w-full"
      >
        
        {/* Illustration / Emoji Cluster Area */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-64 h-64 mx-auto mb-6 flex items-center justify-center"
        >
           {/* Central Glow */}
           <div className="absolute inset-0 bg-rose-pink/10 rounded-full blur-3xl scale-75 animate-pulse-slow"></div>

           {/* Central Icon */}
           <motion.div
             onClick={handleSecretClick}
             whileTap={{ scale: 0.9 }}
             animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10 bg-white p-6 rounded-full shadow-xl border-4 border-soft-pink/50 cursor-pointer select-none active:border-rose-pink transition-colors"
           >
              <Gift size={64} className="text-rose-pink" strokeWidth={1.5} />
           </motion.div>

           {/* Floating Orbiting Icons */}
           <motion.div custom={1} variants={floatingIconVariants} animate="float" className="absolute top-0 right-10 text-accent-gold pointer-events-none">
              <Star size={32} fill="#E8CBA8" />
           </motion.div>
           <motion.div custom={2} variants={floatingIconVariants} animate="float" className="absolute bottom-4 left-4 text-rose-pink pointer-events-none">
              <Heart size={40} fill="#F8A1C4" />
           </motion.div>
           <motion.div custom={3} variants={floatingIconVariants} animate="float" className="absolute top-10 left-0 text-blush-pink pointer-events-none">
              <Sparkles size={28} />
           </motion.div>
           <motion.div custom={4} variants={floatingIconVariants} animate="float" className="absolute bottom-10 right-0 text-deep-rose pointer-events-none">
              <Music size={24} />
           </motion.div>
           <motion.div custom={5} variants={floatingIconVariants} animate="float" className="absolute -top-4 left-1/2 text-rose-pink pointer-events-none">
              <Smile size={32} />
           </motion.div>
        </motion.div>

        {/* Typography */}
        <motion.div variants={itemVariants} className="mb-8">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
              Happy Birthday, <br/>
              <motion.span 
                className="font-hand text-6xl md:text-8xl text-rose-pink block mt-2 drop-shadow-sm"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                My Favorite Person
              </motion.span>
            </h1>
            <div className="flex justify-center gap-2 mt-4 text-2xl">
               <span>🎂</span><span>💖</span><span>🌸</span><span>✨</span>
            </div>
        </motion.div>
        
        <motion.p variants={itemVariants} className="font-sans text-gray-500 text-lg md:text-xl mb-12 tracking-wide max-w-lg mx-auto">
          This little website is made just for you. <br/> A small surprise made with so much love.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-rose-pink text-white px-10 py-4 rounded-full font-medium text-lg shadow-lg shadow-rose-pink/30 hover:shadow-rose-pink/50 transition-all flex items-center gap-3 mx-auto group"
            >
              <Heart size={20} fill="white" className="group-hover:animate-pulse" />
              Open Your Surprise
            </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 cursor-pointer text-rose-pink/40 hover:text-rose-pink transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={onStart}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;