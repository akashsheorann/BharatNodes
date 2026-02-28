import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const locations = [
  { name: "Mumbai", status: "Online", latency: "12ms" },
  { name: "Delhi", status: "Online", latency: "18ms" },
  { name: "Bangalore", status: "Online", latency: "15ms" },
  { name: "Singapore", status: "Online", latency: "35ms" },
  { name: "London", status: "Online", latency: "120ms" },
  { name: "New York", status: "Online", latency: "180ms" },
];

export default function Locations() {
  return (
    <section id="locations" className="py-32 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight"
          >
            Global <span className="italic font-serif">Presence.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-6 border border-white/5 hover:border-white/20 transition-colors group"
            >
              <span className="text-sm font-medium tracking-wider uppercase">{loc.name}</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors">{loc.latency}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
