import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface DadJokesProps {
  onNext: () => void;
}

const PRESET_JOKES = [
  { setup: "I'm reading a book about anti-gravity...", punchline: "I just can't put it down." },
  { setup: "Did I tell you the time I fell in love during a backflip?", punchline: "I was heels over head." },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up." },
  { setup: "I made a pencil with two erasers...", punchline: "It was pointless." },
];

export default function DadJokes({ onNext }: DadJokesProps) {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleNextJoke = () => {
    setRevealed(false);
    setTimeout(() => {
      setCurrentJoke((prev) => (prev + 1) % PRESET_JOKES.length);
    }, 300);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setupInput.trim() && punchlineInput.trim()) {
      setCustomJokes([...customJokes, { setup: setupInput, punchline: punchlineInput }]);
      setSetupInput('');
      setPunchlineInput('');
      setShowSubmitMsg(true);
      setTimeout(() => setShowSubmitMsg(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6 relative z-10 w-full h-full">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a2210 0%, transparent 70%)' }}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 z-10"
      >
        <h2 className="text-xl font-bold text-[#d4af37] uppercase tracking-widest mb-4">Jokes</h2>
        <p className="text-[#e0d8d0] italic opacity-90 text-sm">Because what's Father's Day without some groans?</p>
      </motion.div>

      <div className="w-full max-w-2xl flex flex-col gap-6 z-10">
        {/* Joke Display */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentJoke}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <p className="text-xl md:text-2xl font-serif text-[#e0d8d0]">
                "{PRESET_JOKES[currentJoke].setup}"
              </p>
              
              <div className="min-h-[80px] flex items-center justify-center">
                {!revealed ? (
                  <button
                    onClick={handleReveal}
                    className="px-6 py-2 bg-white/10 border border-[#d4af37]/50 text-[#d4af37] rounded-lg text-xs uppercase tracking-widest hover:bg-[#d4af37]/20 transition-all shadow-lg shadow-[#d4af37]/10"
                  >
                    Reveal Punchline
                  </button>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl md:text-3xl font-bold text-[#d4af37] italic"
                  >
                    "{PRESET_JOKES[currentJoke].punchline}"
                  </motion.p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleNextJoke}
              className="text-[#e0d8d0] opacity-70 hover:opacity-100 uppercase tracking-widest text-xs font-bold transition-opacity"
            >
              Next Joke →
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onNext}
            className="w-full max-w-[250px] py-3 bg-[#d4af37]/10 border-2 border-[#d4af37] text-[#d4af37] rounded-lg text-xs uppercase tracking-widest hover:bg-[#d4af37]/20 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold"
          >
            Move Along
          </button>
        </div>
      </div>
    </div>
  );
}
