import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const LoveLetter: React.FC = () => {
  const text = `Thank you for being my happiness, my safe place, and my favorite smile. Every day with you feels like a soft melody that I never want to stop listening to. You make the ordinary moments magical just by being there. I hope this year treats you with as much kindness and love as you give to the world. I love you, always.`;

  return (
    <section className="py-20 px-6 bg-white relative">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-10 gap-3">
          <Mail className="text-rose-pink" size={32} />
          <h2 className="font-hand text-4xl md:text-5xl text-gray-800">A Letter for You</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-cream border-2 border-soft-pink p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
        >
          {/* Paper texture overlay could go here, simplified with css */}
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-pink/20"></div>
          
          <p className="font-serif text-lg md:text-2xl text-gray-700 leading-relaxed italic text-center">
            "My Dearest,"
          </p>
          <br />
          <p className="font-serif text-lg md:text-xl text-gray-600 leading-loose tracking-wide text-justify">
            {text}
          </p>
          <br />
          <p className="font-hand text-3xl text-right text-rose-pink mt-4">
            - Yours Forever
          </p>
          
          <Heart className="absolute bottom-4 right-4 text-rose-pink/10 -rotate-12" size={120} fill="currentColor" />
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;