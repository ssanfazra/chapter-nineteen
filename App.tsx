import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import MemoryLane from './components/MemoryLane';
import Reasons from './components/Reasons';
import BirthdayWish from './components/BirthdayWish';
import FinalSurprise from './components/FinalSurprise';
import MessageInBottle from './components/MessageInBottle'; // NEW: Alternative final surprise
import SectionWrapper from './components/SectionWrapper';
import IntroExperience from './components/IntroExperience';
import ChapterNineteen from './components/ChapterNineteen';
import Countdown from './components/Countdown';
import Quiz from './components/Quiz';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  // New Flow: Countdown -> Intro -> Chapter -> Main
  const [appState, setAppState] = useState<'countdown' | 'intro' | 'chapter' | 'main'>('countdown');
  const [scrollProgress, setScrollProgress] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    // Scroll to the first content section
    const element = document.getElementById('wish-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCountdownComplete = () => {
    setAppState('intro');
  };

  const handleIntroComplete = () => {
    setAppState('chapter');
  };

  const handleChapterComplete = () => {
    setAppState('main');
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (scrollTop / totalScroll) * 100;
        setScrollProgress(progress);
      }
    }
  };

  return (
    <div className="h-screen w-full font-sans text-gray-800 bg-[#FFF5F5] relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        {appState === 'countdown' && (
          <Countdown key="countdown" onComplete={handleCountdownComplete} />
        )}

        {appState === 'intro' && (
          <IntroExperience key="intro" onComplete={handleIntroComplete} />
        )}

        {appState === 'chapter' && (
          <ChapterNineteen key="chapter" onComplete={handleChapterComplete} />
        )}

        {appState === 'main' && (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full"
          >
            <ProgressBar progress={scrollProgress} />
            <FloatingHearts />
            
            {/* Scrollable Container with Snap */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10"
            >
              <SectionWrapper>
                <Hero onStart={scrollToContent} />
              </SectionWrapper>
              
              <SectionWrapper id="wish-section">
                <BirthdayWish />
              </SectionWrapper>

              <SectionWrapper>
                <MemoryLane />
              </SectionWrapper>

              <SectionWrapper>
                <Quiz />
              </SectionWrapper>

              <SectionWrapper>
                <Reasons />
              </SectionWrapper>

              {/* <div ref={letterRef}>
                <SectionWrapper>
                  <LoveLetter />
                </SectionWrapper>
              </div> */}

              <SectionWrapper>
                <div className="flex flex-col min-h-screen">
                   <div className="flex-grow flex flex-col justify-center">
                      {/* 🔄 SWAP COMPONENTS: Comment one, uncomment the other to test */}
                      {/* <FinalSurprise /> */}
                      <MessageInBottle />
                   </div>
                   <footer className="bg-rose-pink py-6 text-center text-white text-sm">
                      <p>Made with ❤️ just for you</p>
                   </footer>
                </div>
              </SectionWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;