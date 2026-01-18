import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Gift } from 'lucide-react';

interface IntroExperienceProps {
  onComplete: () => void;
}

const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Step 0: Initial Greeting -> Auto advance
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Step 2: Sequence of messages
  useEffect(() => {
    if (step === 2) {
      const timer1 = setTimeout(() => setMessageIndex(1), 2500);
      const timer2 = setTimeout(() => setMessageIndex(2), 5000);
      const timer3 = setTimeout(() => setStep(3), 8000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [step]);

  const handleStep1Click = () => {
    setStep(2);
  };

  const messages = [
    "Today is special 🎂",
    "Because you exist 💖",
    "And you mean so much to me..."
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-rose-pink flex flex-col items-center justify-center text-white p-6 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-white rounded-full blur-[100px] opacity-20" 
         />
         <motion.div 
           animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
           transition={{ duration: 5, repeat: Infinity, delay: 2 }}
           className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] bg-accent-gold rounded-full blur-[120px] opacity-20" 
         />
         
         {/* Floating Sparkles */}
         {step >= 2 && [...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], y: -100, x: Math.random() * 50 - 25 }}
              transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-yellow-200"
              style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
            >
              <Sparkles size={10 + Math.random() * 10} />
            </motion.div>
         ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* Step 0: "Hey..." */}
        {step === 0 && (
          <motion.h1
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="font-hand text-6xl md:text-8xl font-bold tracking-wide"
          >
            Hey… 💗
          </motion.h1>
        )}

        {/* Step 1: "I made something for you" */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-4xl mb-12 leading-relaxed"
            >
              I made something for you.
            </motion.p>
            
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStep1Click}
              className="bg-white text-rose-pink px-8 py-4 rounded-full font-sans font-medium text-lg shadow-xl flex items-center gap-3 mx-auto"
            >
              <Mail size={20} />
              Tap gently
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Emotional Sequence */}
        {step === 2 && (
          <motion.div
            key="step2"
            className="text-center max-w-2xl px-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-hand text-5xl md:text-7xl leading-tight"
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
              className="mt-12 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
               <Heart className="animate-pulse text-pink-200" fill="currentColor" size={32} />
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Final Reveal Button */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
             <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="mb-8 inline-block"
             >
                <Gift size={64} className="text-white" strokeWidth={1} />
             </motion.div>

             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-white text-rose-pink px-10 py-5 rounded-full font-bold text-xl shadow-2xl flex items-center gap-3 mx-auto"
            >
              Open Your Birthday Surprise 🎁
            </motion.button>
          </motion.div>
        )}
        
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroExperience;