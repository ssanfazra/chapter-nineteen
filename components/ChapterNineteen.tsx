import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ChapterNineteenProps {
  onComplete: () => void;
}

const ChapterNineteen: React.FC<ChapterNineteenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text' | 'roll' | 'reveal'>('text');
  const [textIndex, setTextIndex] = useState(0);

  // 🔑 refs for precise measurement
  const itemRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const slotRef = useRef<HTMLDivElement>(null);


  const poeticLines = [
    'Before nineteen, there were...',
    'lessons that hurt,',
    'smiles that stayed,',
    'and moments that shaped you.'
  ];

  /* ===============================
     Phase 1 — Poetic text sequence
  =============================== */
  useEffect(() => {
    if (phase === 'text') {
      if (textIndex < poeticLines.length) {
        const timer = setTimeout(() => {
          setTextIndex((prev) => prev + 1);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('roll'), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, textIndex]);

  // Calculate slot offset dynamically
  useEffect(() => {
  if (itemRef.current && slotRef.current) {
    const itemHeight = itemRef.current.offsetHeight;
    const slotHeight = slotRef.current.offsetHeight;
    const targetIndex = 2; // 17,18,19

    const OPTICAL_OFFSET = 8; // mulai dari 6–10

    const y =
    -(targetIndex * itemHeight) +
    slotHeight / 2 -
    itemHeight / 2 -
    OPTICAL_OFFSET;

    setOffsetY(y);
  }
}, [phase]);


  return (
    <div className="fixed inset-0 z-[90] bg-[#FDF6F0] flex flex-col items-center justify-center overflow-hidden text-gray-800">

      {/* Background atmosphere */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-rose-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">

        {/* ===============================
            PHASE 1 — TEXT
        =============================== */}
        {phase === 'text' && (
          <div className="text-center px-6">
            <AnimatePresence mode="wait">
              {textIndex < poeticLines.length && (
                <motion.h2
                  key={textIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-3xl md:text-5xl italic text-gray-700"
                >
                  “{poeticLines[textIndex]}”
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ===============================
            PHASE 2 — SLOT ROLL
        =============================== */}
        {phase === 'roll' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() =>
              setTimeout(() => setPhase('reveal'), 4500)
            }
            className="relative flex flex-col items-center"
          >
            <div className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6">
              Your Age
            </div>

            {/* Slot window */}
            <div ref={slotRef} className="relative h-32 md:h-48 w-40 md:w-60 overflow-hidden border-y-2 border-accent-gold/50 bg-white/50 backdrop-blur-sm flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FDF6F0] via-transparent to-[#FDF6F0] z-10 pointer-events-none" />

              {/* Rolling numbers */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: offsetY }}
                transition={{
                  type: 'tween',
                  duration: 3,
                  ease: 'easeOut',
                  delay: 0.4,
                }}
              >

                <div
                  ref={itemRef}
                  className="h-32 md:h-48 flex items-center justify-center font-serif text-6xl md:text-8xl text-gray-400"
                >
                  17
                </div>

                <div className="h-32 md:h-48 flex items-center justify-center font-serif text-6xl md:text-8xl text-gray-400">
                  18
                </div>

                <div className="h-32 md:h-48 flex items-center justify-center font-serif text-6xl md:text-8xl text-rose-pink scale-110">
                  19
                </div>
              </motion.div>
            </div>

            <div className="mt-4 text-sm italic text-gray-500">
              A new chapter begins...
            </div>
          </motion.div>
        )}

        {/* ===============================
            PHASE 3 — REVEAL
        =============================== */}
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-6 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <Sparkles size={40} className="text-accent-gold" />
            </motion.div>

            <h1 className="font-serif text-5xl md:text-7xl mb-4">
              Chapter Nineteen
            </h1>

            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              A new beginning unfolds. <br />
              Where you are more <b>yourself</b> than ever before.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-rose-pink text-white px-10 py-4 rounded-full text-lg shadow-xl shadow-rose-pink/30 flex items-center gap-3 mx-auto"
            >
              Begin This Chapter <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ChapterNineteen;
