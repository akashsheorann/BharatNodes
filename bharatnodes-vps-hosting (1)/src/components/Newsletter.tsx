import { motion } from 'motion/react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-40 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-light tracking-tight mb-6">Join the <span className="italic font-serif">Network.</span></h2>
          <p className="text-zinc-500 mb-12 text-sm uppercase tracking-widest">Updates on node availability and new regions.</p>
          
          <form className="flex flex-col sm:flex-row gap-0 border-b border-white/20 pb-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="flex-grow px-0 py-4 bg-transparent outline-none text-xs tracking-widest placeholder:text-zinc-700"
            />
            <button className="py-4 text-xs font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
