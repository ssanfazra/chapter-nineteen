import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Moon, Heart, Mic, Sparkles, Star } from 'lucide-react';
import { Memory } from '../types';

const memories: Memory[] = [
  { 
    id: 1, 
    Icon: MessageCircle, 
    title: "Our First Chat", 
    caption: "The moment everything started.", 
    rotation: -3,
    color: "bg-blue-50",
    date: "Day 1"
  },
  { 
    id: 2, 
    Icon: Moon, 
    title: "Late Night Talks", 
    caption: "Talking until we forgot the time.", 
    rotation: 2,
    color: "bg-indigo-50",
    date: "2:00 AM"
  },
  { 
    id: 3, 
    Icon: Heart, 
    title: "You Made Me Smile", 
    caption: "You didn't even try. You just did.", 
    rotation: -2,
    color: "bg-rose-50",
    // date: "Always"
  },
  { 
    id: 4, 
    Icon: Mic, 
    title: "Your Voice", 
    caption: "I love your voice.", 
    rotation: 1,
    color: "bg-purple-50",
    // date: "Always"
  },
  { 
    id: 5, 
    Icon: Sparkles, 
    title: "My Favorite Person", 
    caption: "Every single day.", 
    rotation: -1,
    color: "bg-amber-50",
    // date: "Forever"
  },
];

const MemoryLane: React.FC = () => {
  const [clickedId, setClickedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setClickedId(id);
    setTimeout(() => setClickedId(null), 1000);
  };

  return (
    <section className="py-24 bg-cream overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 opacity-20">
        <Star className="text-accent-gold rotate-12" size={40} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Heart className="text-rose-pink -rotate-12" size={40} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cute text-4xl md:text-5xl text-rose-pink mb-4">
            Moments I Cherish 💭
          </h2>
          <p className="font-sans text-gray-500 max-w-lg mx-auto">
            Not just photos, but the feelings I keep safe in my heart.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-10">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 100, rotate: memory.rotation - 15 }} // Start lower and more rotated
              whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }} // Settle into final position
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 50, 
                y: -15,
                transition: { type: "spring", stiffness: 300, damping: 15 } // Snappy hover
              }}
              onClick={() => handleCardClick(memory.id)}
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 20, 
                delay: index * 0.1 // Staggered entrance
              }}
              className="relative group cursor-pointer"
              style={{ transformOrigin: "center center" }}
            >
              {/* Polaroid Card */}
              <div className="bg-white p-4 pb-16 shadow-lg group-hover:shadow-2xl rounded-sm w-64 md:w-72 transition-shadow duration-300 border border-gray-100">
                
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-pink/30 backdrop-blur-[1px] -rotate-1 opacity-80 shadow-sm z-10"></div>

                {/* "Photo" Area */}
                <div className={`aspect-square ${memory.color} mb-4 flex flex-col items-center justify-center p-6 border-[1px] border-gray-100/50 inner-shadow-sm relative overflow-hidden group-hover:brightness-105 transition-all`}>
                  <memory.Icon 
                    size={48} 
                    strokeWidth={1.5}
                    className="text-gray-700 mb-3 group-hover:scale-110 transition-transform duration-500 ease-out" 
                  />
                  <h3 className="font-sans font-semibold text-gray-800 text-center text-lg leading-tight">
                    {memory.title}
                  </h3>
                  
                  {/* Subtle date in the corner of the photo area */}
                  {memory.date && (
                    <span className="absolute bottom-2 right-3 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      {memory.date}
                    </span>
                  )}
                </div>

                {/* Caption Area */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-hand text-xl text-center text-gray-600 leading-snug group-hover:text-rose-pink transition-colors">
                     {memory.caption}
                  </p>
                </div>

                {/* Cute Sticker on corner */}
                <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 rotate-12 scale-0 group-hover:scale-100">
                   <Heart size={24} fill="#F8A1C4" className="text-rose-pink" />
                </div>
              </div>

              {/* Click Animation (Pop-up Hearts) */}
              <AnimatePresence>
                {clickedId === memory.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1.5, y: -100 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                  >
                    <Heart fill="#FF69B4" className="text-rose-pink" size={40} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryLane;