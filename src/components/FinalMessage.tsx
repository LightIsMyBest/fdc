import { motion } from 'motion/react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function FinalMessage() {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6 relative z-10 w-full h-full text-center">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a2210 0%, transparent 70%)' }}></div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#d4af37] mb-2">
          Happy Father's Day
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase opacity-50 mb-8 text-[#e0d8d0]">EST. Since I was born</p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="max-w-xl mx-auto mt-6"
        >
          <p className="text-sm md:text-base italic opacity-90 text-[#e0d8d0]">
            "Sorry for not telling you earlier, I remembered it a week ago but forgot it today!"
          </p>
          <div className="h-px w-24 bg-[#d4af37]/30 mx-auto mt-6"></div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30 z-10 w-full justify-center"
      >
        <div className="h-px w-16 bg-white" />
        <div className="text-[10px] tracking-widest uppercase text-[#e0d8d0]">The Great Father Chronicles</div>
        <div className="h-px w-16 bg-white" />
      </motion.div>
    </div>
  );
}
