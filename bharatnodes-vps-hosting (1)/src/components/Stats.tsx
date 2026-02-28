import { motion } from 'motion/react';
import { Server, Activity, Users, Globe } from 'lucide-react';

const stats = [
  { label: "Active Nodes", value: "2,500+", icon: Server },
  { label: "Uptime", value: "99.99%", icon: Activity },
  { label: "Happy Clients", value: "10k+", icon: Users },
  { label: "Global Locations", value: "12+", icon: Globe },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-left"
            >
              <div className="text-4xl font-light mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
