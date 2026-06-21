import { motion } from 'motion/react';

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6 relative z-10 w-full h-full">
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a2210 0%, transparent 70%)' }}></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, #d4af37 0%, transparent 40%), radial-gradient(circle at 90% 80%, #d4af37 0%, transparent 40%)' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-2xl shadow-2xl max-w-2xl"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-[#d4af37] italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          "I would like to share something with you, Dad..."
        </motion.h1>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="px-8 py-3 bg-white/10 border-2 border-[#d4af37] text-[#d4af37] rounded-lg text-sm uppercase tracking-widest hover:bg-white/20 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all font-bold"
        >
          Begin Journey
        </motion.button>
      </motion.div>
    </div>
  );
}
