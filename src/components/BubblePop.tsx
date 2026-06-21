import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface BubblePopProps {
  onNext: () => void;
}

const ATTRIBUTES = [
  "My Hero",
  "My Guide",
  "My Protector",
  "My Role Model",
  "My Best Friend",
];

export default function BubblePop({ onNext }: BubblePopProps) {
  const [poppedCount, setPoppedCount] = useState(0);
  const [bubbles, setBubbles] = useState(ATTRIBUTES.map((text, i) => ({ id: i, text, popped: false })));

  useEffect(() => {
    if (poppedCount === ATTRIBUTES.length) {
      const timer = setTimeout(() => {
        onNext();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [poppedCount, onNext]);

  const popBubble = (index: number) => {
    if (bubbles[index].popped) return;
    
    const newBubbles = [...bubbles];
    newBubbles[index].popped = true;
    setBubbles(newBubbles);
    setPoppedCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6 overflow-hidden relative z-10 w-full h-full">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a2210 0%, transparent 70%)' }}></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16 z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm"
      >
        <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-widest mb-4">You are...</h2>
        <p className="text-[#e0d8d0] italic opacity-90 text-sm">Pop the bubbles to reveal</p>
      </motion.div>

      <div className="relative w-full max-w-4xl h-96 z-10">
        <AnimatePresence>
          {bubbles.map((bubble, index) => (
            !bubble.popped && (
              <motion.div
                key={bubble.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -20, 0, 20, 0],
                  x: [0, 10, -10, 5, 0]
                }}
                exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
                transition={{ 
                  scale: { duration: 0.5, delay: index * 0.2 },
                  opacity: { duration: 0.5, delay: index * 0.2 },
                  y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 5 + Math.random() * 2, ease: "easeInOut" }
                }}
                onClick={() => popBubble(index)}
                className="absolute cursor-pointer rounded-full bg-white/10 border-2 border-[#d4af37]/40 shadow-lg flex items-center justify-center backdrop-blur-md hover:bg-white/20 hover:border-[#d4af37] transition-all"
                style={{
                  width: '120px',
                  height: '120px',
                  // Random rough placement
                  top: `${10 + (index * 15)}%`,
                  left: `${(index % 2 === 0 ? 20 : 60) + (Math.random() * 10 - 5)}%`,
                }}
              >
                <div className="w-full h-full rounded-full absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <AnimatePresence>
           {bubbles.map((bubble) => (
             bubble.popped && (
                 <motion.div
                    key={`text-${bubble.id}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute text-center w-full mt-10"
                    style={{
                      top: `${10 + (bubble.id * 15)}%`,
                      left: `${(bubble.id % 2 === 0 ? 20 : 60)}%`,
                      transform: 'translateX(-50%)'
                    }}
                 >
                    <span className="text-2xl font-bold text-[#d4af37] italic opacity-90 tracking-wider blur-[0.5px] drop-shadow-md">
                        {bubble.text}
                    </span>
                 </motion.div>
             )
           ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {poppedCount === ATTRIBUTES.length && (
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 1 }}
             className="mt-16 z-20 text-center"
          >
             <span className="text-[#d4af37] font-bold text-sm uppercase tracking-widest animate-pulse">
                Continuing...
             </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
