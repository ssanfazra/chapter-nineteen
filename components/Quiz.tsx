import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X, RefreshCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer
  icon?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's my favorite thing about you?",
    options: ["Your laugh", "Your kindness", "Your cooking", "Your style"],
    correctAnswer: 1,
    icon: "😊"
  },
  {
    id: 2,
    question: "What makes me feel better instantly?",
    options: ["Your text", "Music", "Snacks", "Your voice"],
    correctAnswer: 3,
    icon: "😊"
  },
  {
    id: 3,
    question: "What's my favorite thing to do with you?",
    options: ["Watch movies in discord", "Eat together", "Just talk", "Walk around"],
    correctAnswer: 0,
    icon: "🎬"
  },
  {
    id: 4,
    question: "If I could teleport anywhere with you right now?",
    options: ["Paris", "Bali", "Japan", "Switzerland"],
    correctAnswer: 2,
    icon: "✈️"
  },
  {
    id: 5,
    question: "What am I thinking about right now?",
    options: ["Food", "Sleep", "Work", "You! ❤️"],
    correctAnswer: 3,
    icon: "💭"
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
    setIsAnswerChecked(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswerChecked(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const getResultMessage = () => {
    if (score === questions.length) return "Soulmate Level! 💕 You know me perfectly.";
    if (score >= questions.length - 2) return "Almost Telepathic! 🌟 We're so in sync.";
    return "Room to Grow! 🌱 Let's make more memories.";
  };

  return (
    <section className="py-24 bg-[#FFFBF5] relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6">
        
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4">
             <HelpCircle className="text-rose-pink" size={24} />
           </div>
           <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-2">How Well Do You Know Me?</h2>
           <p className="text-gray-500">Let's see if you can get 5/5!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 relative min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                {/* Progress */}
                <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-400 uppercase tracking-wider">
                   <span>Question {currentQuestion + 1}/{questions.length}</span>
                   <span>Score: {score}</span>
                </div>

                {/* Question */}
                <h3 className="font-serif text-2xl md:text-3xl text-gray-800 mb-8 leading-snug">
                   <span className="mr-3">{questions[currentQuestion].icon}</span>
                   {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    let buttonStyle = "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100";
                    
                    if (isAnswerChecked) {
                       if (index === questions[currentQuestion].correctAnswer) {
                          buttonStyle = "bg-green-100 border-green-200 text-green-700";
                       } else if (index === selectedOption) {
                          buttonStyle = "bg-red-50 border-red-100 text-red-600";
                       } else {
                          buttonStyle = "opacity-50";
                       }
                    }

                    return (
                      <motion.button
                        key={index}
                        whileTap={!isAnswerChecked ? { scale: 0.98 } : {}}
                        onClick={() => handleOptionClick(index)}
                        disabled={isAnswerChecked}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex justify-between items-center ${buttonStyle}`}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswerChecked && index === questions[currentQuestion].correctAnswer && (
                           <Check size={20} />
                        )}
                        {isAnswerChecked && index === selectedOption && index !== questions[currentQuestion].correctAnswer && (
                           <X size={20} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="mb-6 inline-block p-4 bg-yellow-50 rounded-full">
                  <Trophy size={48} className="text-yellow-500" />
                </div>
                <h3 className="font-cute text-4xl text-rose-pink mb-4">Quiz Complete!</h3>
                <p className="font-serif text-5xl font-bold text-gray-800 mb-4">{score}/{questions.length}</p>
                <p className="font-sans text-gray-500 text-lg mb-8 max-w-sm mx-auto">
                   {getResultMessage()}
                </p>
                
                <button 
                  onClick={restartQuiz}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-pink transition-colors font-medium"
                >
                   <RefreshCcw size={18} /> Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Quiz;