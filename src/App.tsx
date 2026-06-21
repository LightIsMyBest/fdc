/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Stage } from './types';
import Welcome from './components/Welcome';
import MemoryGame from './components/MemoryGame';
import BubblePop from './components/BubblePop';
import DadJokes from './components/DadJokes';
import FlyingLetter from './components/FlyingLetter';
import FinalMessage from './components/FinalMessage';

export default function App() {
  const [stage, setStage] = useState<Stage>('welcome');

  const containerVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: 'easeOut' } },
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 1, ease: 'easeIn' } }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0502] text-[#e0d8d0] font-serif relative overflow-y-auto">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div className="min-h-full" key="welcome" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Welcome onNext={() => setStage('game')} />
          </motion.div>
        )}
        
        {stage === 'game' && (
          <motion.div className="min-h-full" key="game" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <MemoryGame onNext={() => setStage('bubbles')} />
          </motion.div>
        )}

        {stage === 'bubbles' && (
          <motion.div className="min-h-full" key="bubbles" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <BubblePop onNext={() => setStage('jokes')} />
          </motion.div>
        )}

        {stage === 'jokes' && (
          <motion.div className="min-h-full" key="jokes" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <DadJokes onNext={() => setStage('letter')} />
          </motion.div>
        )}

        {stage === 'letter' && (
          <motion.div className="min-h-full" key="letter" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <FlyingLetter onNext={() => setStage('final')} />
          </motion.div>
        )}

        {stage === 'final' && (
          <motion.div className="min-h-full" key="final" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

