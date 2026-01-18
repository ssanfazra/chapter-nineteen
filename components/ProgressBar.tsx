import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-100/30 backdrop-blur-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-rose-pink to-deep-rose rounded-r-full relative shadow-[0_2px_10px_rgba(248,161,196,0.5)]"
        initial={{ width: "0%" }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* Moving Indicator Icon - Only show if progress > 0 */}
        {clampedProgress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-1 shadow-md border border-rose-pink/20 z-10">
            <Heart size={10} className="text-rose-pink fill-rose-pink" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;