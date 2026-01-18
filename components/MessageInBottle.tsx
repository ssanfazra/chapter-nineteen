import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

declare global {
  interface Window {
    confetti: any;
  }
}

const MessageInBottle: React.FC = () => {
  const [phase, setPhase] = useState<'floating' | 'opening' | 'revealed'>('floating');
  const [messageVisible, setMessageVisible] = useState(false);

  const handleBottleClick = () => {
    setPhase('opening');
    
    // Trigger confetti
    if (typeof window.confetti === 'function') {
      const pinkColors = ['#FF1493', '#FF69B4', '#FFC0CB', '#E30B5C', '#DB7093', '#DDA0DD'];
      
      setTimeout(() => {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: pinkColors,
          disableForReducedMotion: true,
          zIndex: 1000,
        });
      }, 800);
    }

    // Reveal message after cork pop animation
    setTimeout(() => {
      setPhase('revealed');
      setMessageVisible(true);
    }, 1500);
  };

  return (
    <section className="relative w-full min-h-screen flex-grow overflow-hidden bg-gradient-to-b from-[#E8A5B8] via-[#D87A9A] to-[#C85A82]">
      
      {/* Animated Ocean Waves - REDESIGNED FOR FULL WIDTH */}
      <div className="absolute inset-x-0 bottom-0 overflow-visible pointer-events-none">
        {/* Wave Layer 1 - Deep Teal */}
        <motion.div
          animate={{
            x: ['-5%', '8%', '-3%', '5%', '-5%'],
            y: [0, -10, 5, -5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 w-[110%] -left-[5%] h-[500px]"
          style={{
            background: 'transparent'
          }}
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path
              fill="#D85A82"
              fillOpacity="0.6"
              d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </motion.div>

        {/* Wave Layer 2 - Medium Teal */}
        <motion.div
          animate={{
            x: ['5%', '-8%', '3%', '-5%', '5%'],
            y: [0, 8, -3, 5, 0]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 w-[110%] -left-[5%] h-[450px]"
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path
              fill="#E87A9E"
              fillOpacity="0.5"
              d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </motion.div>

        {/* Wave Layer 3 - Light Teal */}
        <motion.div
          animate={{
            x: ['-3%', '5%', '-2%', '3%', '-3%'],
            y: [0, -5, 3, -3, 0]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 w-[110%] -left-[5%] h-[400px]"
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path
              fill="#F5A5BE"
              fillOpacity="0.5"
              d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,144C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </motion.div>

        {/* Wave Layer 4 - White Foam */}
        <motion.div
          animate={{
            x: ['2%', '-2%', '2%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 w-[110%] -left-[5%] h-[350px]"
        >
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path
              fill="#FFFFFF"
              fillOpacity="0.6"
              d="M0,256L60,240C120,224,240,192,360,181.3C480,171,600,181,720,197.3C840,213,960,235,1080,234.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Sun Rays Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.3) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Floating Particles/Bubbles - INCREASED */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: '100vh', 
              x: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{ 
              y: '-20vh',
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute"
          >
            <div 
              className="rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Stars/Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ 
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="text-white/50" size={Math.random() > 0.5 ? 20 : 14} />
          </motion.div>
        ))}
      </div>

      {/* Underwater Light Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.15, 0],
              scaleY: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute top-0 h-full"
            style={{
              left: `${20 + i * 30}%`,
              width: '100px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 70%)',
              transform: 'skewX(-10deg)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-20">
        
        <AnimatePresence mode="wait">
          
          {/* PHASE 1: Floating Bottle */}
          {phase === 'floating' && (
            <motion.div
              key="floating"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -30, -10, -25, 0],
                  x: [0, 10, -5, 8, 0],
                  rotate: [-3, 4, -2, 3, -3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Bottle SVG */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBottleClick}
                  className="cursor-pointer mb-8"
                >
                  <svg
                    width="180"
                    height="270"
                    viewBox="0 0 120 180"
                    className="drop-shadow-2xl mx-auto"
                  >
                    {/* Bottle body */}
                    <path
                      d="M40 60 L40 150 Q40 165 50 165 L70 165 Q80 165 80 150 L80 60 Z"
                      fill="#E8F5F0"
                      fillOpacity="0.4"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    {/* Bottle neck */}
                    <rect
                      x="50"
                      y="30"
                      width="20"
                      height="30"
                      fill="#E8F5F0"
                      fillOpacity="0.4"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="2"
                    />
                    {/* Cork */}
                    <rect
                      x="48"
                      y="22"
                      width="24"
                      height="12"
                      fill="#D4A574"
                      stroke="#B8935F"
                      strokeWidth="1.5"
                      rx="2"
                    />
                    {/* Message inside (paper scroll) */}
                    <rect
                      x="50"
                      y="80"
                      width="20"
                      height="60"
                      fill="#FFF9E6"
                      opacity="0.8"
                      rx="2"
                    />
                    {/* Message lines */}
                    <line x1="54" y1="90" x2="66" y2="90" stroke="#D4A574" strokeWidth="1" opacity="0.6" />
                    <line x1="54" y1="100" x2="66" y2="100" stroke="#D4A574" strokeWidth="1" opacity="0.6" />
                    <line x1="54" y1="110" x2="66" y2="110" stroke="#D4A574" strokeWidth="1" opacity="0.6" />
                    <line x1="54" y1="120" x2="66" y2="120" stroke="#D4A574" strokeWidth="1" opacity="0.6" />
                    
                    {/* Shine effect */}
                    <ellipse
                      cx="55"
                      cy="90"
                      rx="8"
                      ry="25"
                      fill="white"
                      opacity="0.3"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white text-xl font-hand"
              >
                A message awaits you...
              </motion.p>
              
              <p className="text-white/70 text-sm mt-4 font-sans">
                Click the bottle to reveal
              </p>
            </motion.div>
          )}

          {/* PHASE 2: Opening Animation */}
          {phase === 'opening' && (
            <motion.div
              key="opening"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Cork popping animation */}
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                animate={{ 
                  y: -100, 
                  rotate: 360,
                  opacity: 0
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="w-6 h-4 bg-[#D4A574] rounded-sm mx-auto" />
              </motion.div>

              {/* Sparkles burst */}
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 8) * 60,
                      y: Math.sin((i * Math.PI * 2) / 8) * 60,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Sparkles className="text-yellow-300" size={20} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PHASE 3: Message Revealed */}
          {phase === 'revealed' && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl w-full"
            >
              {/* Letter Container - Minimalist Style */}
              <div className="bg-cream border-2 border-soft-pink rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
                
                {/* Simple top accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-rose-pink/20"></div>

                {/* Message Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="relative z-10"
                >
                  <div className="flex justify-center mb-6">
                    <Heart className="text-rose-pink" size={40} fill="#F8A1C4" />
                  </div>

                  <p className="font-serif text-lg md:text-2xl text-gray-700 leading-relaxed italic text-center mb-8">
                    "My Dearest,"
                  </p>

                  <div className="font-serif text-lg md:text-xl text-gray-600 leading-loose tracking-wide text-justify space-y-6">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className=""
                    >
                      Happy birthday. Today marks a new beginning—not just another number, but a celebration of your journey: how you've grown, learned, and kept smiling through it all. Making you the remarkable woman you are.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className=""
                    >
                      Thank you for sharing your stories, laughter, and even the comfortable silences in every call we have. You're a reminder that true connection doesn't always need physical closeness—sometimes it's enough to have a genuine voice and time spent together.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className=""
                    >
                      May this year bring you more happiness, more moments that make you proud of yourself, and more reasons to keep smiling. You deserve all the good things coming your way.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="font-hand text-3xl text-right text-rose-pink mt-4"
                    >
                      - With Sincere Appreciation
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.7 }}
                      className="text-center text-gray-600 text-lg mt-6"
                    >
                      Juukyuu-sai no otanjoubi, omedetou. 🌟
                    </motion.p>
                  </div>

                  {/* Decorative hearts */}
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="flex justify-center gap-3 mt-8"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          delay: 1.8 + i * 0.1,
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      >
                        <Heart 
                          className="text-rose-pink" 
                          size={20} 
                          fill={i === 2 ? "#F8A1C4" : "none"}
                        />
                      </motion.div>
                    ))}
                  </motion.div> */}

                  {/* Keep Forever Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="text-center mt-8"
                  >
                    <p className="text-sm text-gray-500 italic">
                      Itsumo shiawase de ite hoshii. Kimi wa hontou ni suteki na hito da yo. ✨
                    </p>
                  </motion.div>

                  {/* Large heart watermark */}
                  <Heart className="absolute bottom-4 right-4 text-rose-pink/30 -rotate-12" size={120} fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default MessageInBottle;
