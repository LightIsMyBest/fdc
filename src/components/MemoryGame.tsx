import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface MemoryGameProps {
  onNext: () => void;
}

const EMOJIS = ['👔', '☕', '💼', '🚗', '🛠️', '⚽'];
const CARDS = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

export default function MemoryGame({ onNext }: MemoryGameProps) {
  const [cards, setCards] = useState<{ emoji: string; id: number; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    setCards(CARDS.map((emoji, index) => ({ emoji, id: index, flipped: false, matched: false })));
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (newCards[firstIndex].emoji === newCards[secondIndex].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].matched = true;
          matchedCards[secondIndex].matched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsLocked(false);
          setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].flipped = false;
          resetCards[secondIndex].flipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matches === EMOJIS.length && matches > 0) {
      setTimeout(() => {
        onNext();
      }, 1500);
    }
  }, [matches, onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6 relative z-10 w-full h-full">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a2210 0%, transparent 70%)' }}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl z-10 max-w-md w-full"
      >
        <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-widest mb-4">The Mini-Game</h2>
        <p className="text-[#e0d8d0] italic opacity-90 text-sm">
          Find all the matching pairs before we continue.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 max-w-md w-full z-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`aspect-square relative cursor-pointer perspective-1000 w-full rounded-xl flex items-center justify-center text-4xl bg-white/10 shadow-lg border-2 ${
              card.flipped || card.matched ? 'border-[#d4af37]' : 'border-transparent hover:border-white/30'
            } transition-all duration-300`}
            onClick={() => handleCardClick(index)}
          >
            <motion.div
              initial={false}
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full h-full preserve-3d"
            >
              {(card.flipped || card.matched) && (
                <div className="absolute inset-0 flex items-center justify-center text-center backface-hidden rotate-y-180 bg-white/10 rounded-lg">
                  {card.emoji}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {matches === EMOJIS.length && (
         <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-sm uppercase tracking-widest font-bold text-[#d4af37] z-10"
         >
            Perfect! Let's move on...
         </motion.div>
      )}
    </div>
  );
}
