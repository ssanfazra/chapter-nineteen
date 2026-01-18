import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Gift } from 'lucide-react';

interface CountdownProps {
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  // Development mode: Set countdown to 5 seconds from now for testing
  const [targetDate] = useState(() => {
    return new Date().getTime() + 5000; // 5 seconds
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <motion.div 
        key={value}
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white/90 backdrop-blur-md w-20 h-24 md:w-32 md:h-40 rounded-2xl shadow-xl border border-rose-pink/20 flex items-center justify-center mb-3 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-rose-pink/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="font-serif text-4xl md:text-6xl text-gray-800 font-bold tabular-nums">
          {value < 10 ? `0${value}` : value}
        </span>
      </motion.div>
      <span className="text-xs md:text-sm font-sans tracking-[0.2em] text-gray-500 uppercase">{label}</span>
    </div>
  );

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#FFF5F5] via-[#fff0f5] to-[#ffe4e1] flex flex-col items-center justify-center text-center p-6"
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-20 left-20 w-72 h-72 bg-rose-pink/10 rounded-full blur-[80px] animate-pulse-slow"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
         
         {/* Large "19" Typography Background - BOTTOM POSITIONED */}
         <div className="absolute inset-x-0 bottom-0 flex items-end justify-center -mb-32 md:-mb-60">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative"
           >
             {/* Main "19" with solid fill */}
             <div 
               className="text-[30rem] md:text-[55rem] font-black leading-none select-none"
               style={{
                 fontFamily: 'serif',
                 color: 'rgba(248, 161, 196, 0.22)',
                 letterSpacing: '-0.05em'
               }}
             >
               19
             </div>
             {/* Outline stroke for definition */}
             <div 
               className="absolute inset-0 text-[30rem] md:text-[55rem] font-black leading-none select-none"
               style={{
                 fontFamily: 'serif',
                 color: 'transparent',
                 WebkitTextStroke: '2px rgba(248, 161, 196, 0.3)',
                 textStroke: '2px rgba(248, 161, 196, 0.3)',
                 letterSpacing: '-0.05em'
               }}
             >
               19
             </div>
           </motion.div>
         </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/50 backdrop-blur-sm border border-rose-pink/10 rounded-full text-rose-pink mb-8 shadow-sm">
            <Clock size={16} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">The Big Day</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-gray-800 mb-6 leading-tight">
            Until Chapter 19 Begins...
          </h2>
          <p className="font-sans text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
            {isExpired 
              ? "The wait is finally over. It's your moment." 
              : "Counting down every second until your special day."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isExpired ? (
            <motion.div 
              key="timer"
              className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            >
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Mins" />
              <TimeBox value={timeLeft.seconds} label="Secs" />
            </motion.div>
          ) : (
             <motion.div
               key="action"
               initial={{ opacity: 0, scale: 0.8, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ type: "spring", bounce: 0.5 }}
               className="mb-16"
             >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="group bg-rose-pink text-white px-10 py-5 rounded-full font-serif text-xl shadow-2xl shadow-rose-pink/40 flex items-center gap-3 mx-auto transition-all"
                >
                  <Gift className="group-hover:rotate-12 transition-transform" />
                  <span>Open Your Gift</span>
                  <ArrowRight size={20} className="opacity-80" />
                </motion.button>
             </motion.div>
          )}
        </AnimatePresence>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="font-hand text-2xl md:text-3xl text-rose-pink/80"
        >
          {isExpired ? "Happy Birthday! 🎂" : '"Every second closer to you"'}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Countdown;