import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { Reason } from '../types';

const reasonsList: Reason[] = [
  { id: 1, text: "Your contagious smile" },
  { id: 2, text: "Your Voice" },
  { id: 3, text: "How you listen to me" },
  { id: 4, text: "The way you laugh" },
  { id: 5, text: "Just being you" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20, y: 10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  },
};

const Reasons: React.FC = () => {
  const [activeReasons, setActiveReasons] = useState<number[]>([]);

  const toggleReason = (id: number) => {
    if (!activeReasons.includes(id)) {
      setActiveReasons([...activeReasons, id]);
    }
  };

  const progress = (activeReasons.length / reasonsList.length) * 100;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl text-gray-800 mb-2">Reasons Why I Love You</h2>
          <p className="text-gray-500 mb-10">Click to reveal 💕</p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasonsList.map((reason) => {
            const isActive = activeReasons.includes(reason.id);
            return (
              <motion.div
                key={reason.id}
                variants={cardVariants}
                onClick={() => toggleReason(reason.id)}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 flex items-center justify-between
                  ${isActive 
                    ? 'bg-rose-pink/10 border-rose-pink' 
                    : 'bg-white border-gray-100 hover:border-rose-pink/30'
                  }
                `}
              >
                <span className={`font-medium text-lg ${isActive ? 'text-rose-pink' : 'text-gray-600'}`}>
                  {reason.text}
                </span>
                
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isActive ? 'bg-rose-pink text-white' : 'bg-gray-100 text-gray-300'}
                `}>
                  {isActive ? <Heart size={16} fill="white" /> : <Heart size={16} />}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 bg-gray-100 rounded-full h-6 w-full overflow-hidden relative">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blush-pink to-rose-pink"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
            Love Level: {Math.round(progress)}% 💖
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reasons;