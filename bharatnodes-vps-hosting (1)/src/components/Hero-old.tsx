import { motion } from 'motion/react';
import { Server, ChevronRight, Play, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">
              Infrastructure <br />
              <span className="italic font-serif">Simplified.</span>
            </h1>
            
            <p className="text-lg text-zinc-500 mb-8 max-w-xl mx-auto leading-relaxed -mt-4">
              High-performance VPS hosting for modern developers. No clutter, just raw power and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <motion.button
                whileHover={{ y: -2 }}
                className="px-10 py-4 bg-white text-black font-bold rounded-full text-sm uppercase tracking-widest"
              >
                Deploy Now
              </motion.button>
              <motion.button
                whileHover={{ opacity: 0.7 }}
                className="text-sm uppercase tracking-widest font-bold border-b border-white/30 pb-1"
              >
                Documentation
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Abstract Element */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full -z-10"
        />
      </div>
    </section>
  );
}
