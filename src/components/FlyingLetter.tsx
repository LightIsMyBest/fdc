import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface FlyingLetterProps {
  onNext: () => void;
}

export default function FlyingLetter({ onNext }: FlyingLetterProps) {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isUnrolled) {
      setShowParticles(true);
      setTimeout(() => {
        setShowNext(true);
      }, 10000); 
    }
  }, [isUnrolled]);

  const letterVariants = {
    hidden: { height: 0, opacity: 0, overflow: 'hidden' },
    visible: { 
      height: "auto", 
      opacity: 1, 
      transition: { duration: 2, ease: "easeOut", staggerChildren: 0.5, delayChildren: 1 } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4 md:p-8 overflow-hidden relative z-10 w-full h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3a2210]/60 via-transparent to-transparent pointer-events-none" />

      {/* Magical Particles */}
      <AnimatePresence>
        {showParticles && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#d4af37]"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                  opacity: 1,
                  filter: "blur(2px)"
                }}
                animate={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, Math.random() * 2 + 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 10px #d4af37, 0 0 20px #d4af37'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -1000, scale: 0.1, rotateZ: 720, filter: "drop-shadow(0 0 50px rgba(212,175,55,0.8))" }}
        animate={{ y: 0, scale: 1, rotateZ: 0, filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))" }}
        transition={{ duration: 2.5, type: "spring", bounce: 0.3 }}
        onAnimationComplete={() => setTimeout(() => setIsUnrolled(true), 800)}
        className="relative z-20 w-[600px] max-w-full cursor-pointer perspective-1000"
        onClick={() => !isUnrolled && setIsUnrolled(true)}
      >
        {!isUnrolled && (
          <motion.div 
            className="w-full h-32 bg-[#fdf5e6] shadow-[0_0_40px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(139,69,19,0.2)] rounded-sm flex items-center justify-center border-y-8 border-[#3d3122]/20"
            animate={{ rotateY: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="relative w-16 h-16 bg-[#8b4513] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-[#d4af37]">
               <motion.span 
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="text-2xl font-bold text-[#d4af37]"
               >
                 A
               </motion.span>
            </div>
          </motion.div>
        )}

        {isUnrolled && (
          <motion.div
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="bg-[#fdf5e6] w-full p-10 shadow-[0_0_100px_rgba(212,175,55,0.3),_inset_0_0_40px_rgba(139,69,19,0.2)] origin-top relative rounded-sm border-x-8 border-[#3d3122]/10"
          >
             <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#8b4513] rounded-full flex items-center justify-center shadow-lg border-2 border-[#d4af37]">
                 <span className="text-[#d4af37] font-bold text-xl">S</span>
             </div>
             
             <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.2),_transparent_70%)] pointer-events-none" />
             
             <div className="font-serif text-[#3d3122] text-lg leading-[1.6] text-justify italic max-w-prose mx-auto relative z-10">
                <motion.p variants={textVariants} className="mb-6">
                  Thank you for always taking such incredible care of me. Whenever I ask for something, you never think twice about getting it for me, and I want you to know how much I appreciate your generosity.
                </motion.p>
                <motion.p variants={textVariants} className="mb-6">
                  Even though you usually blindly take Mom's side over mine—even when I try my absolute best to tell you the truth—and we have our arguments, I know deep down that you are always by my side. You protect me at every single step, and that means the world to me.
                </motion.p>
                <motion.p variants={textVariants} className="mb-6">
                  I also know you worry a lot about me getting distracted. Please know that when I take a break, it's just my way of clearing my head so I can focus better. I am genuinely trying my level best to prioritize my studies.
                </motion.p>
                <motion.p variants={textVariants} className="mb-8">
                  I promise you that I will keep pushing forward, putting in all my effort, and working to get the marks I deserve. Thank you for believing in me all this time. I won't let your faith in me go to waste.
                </motion.p>
                <motion.p variants={textVariants} className="text-right font-bold text-xl mt-4 not-italic text-[#8b4513]">
                  Love you always, Happy Father's Day!
                </motion.p>
             </div>
             <div className="absolute -bottom-2 right-10 w-32 h-6 bg-[#3d3122]/5 blur-sm" />
          </motion.div>
        )}
      </motion.div>

      {isUnrolled && showNext && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="mt-12 z-20 px-8 py-3 bg-[#d4af37]/10 border-2 border-[#d4af37] text-[#d4af37] font-bold rounded-lg text-sm uppercase tracking-widest hover:bg-[#d4af37]/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
        >
          Close Letter
        </motion.button>
      )}
    </div>
  );
}
