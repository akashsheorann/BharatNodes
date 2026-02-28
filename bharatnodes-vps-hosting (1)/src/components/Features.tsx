import { motion } from 'motion/react';
import { Server, Shield, Zap, Globe, Cpu, Database } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    title: "Ultra-Fast NVMe",
    description: "Experience lightning-fast speeds with our enterprise-grade NVMe storage nodes.",
    icon: Zap,
    color: "text-cyan-400"
  },
  {
    title: "Global Network",
    description: "Strategically located nodes across India and the globe for minimal latency.",
    icon: Globe,
    color: "text-blue-400"
  },
  {
    title: "DDoS Protection",
    description: "Advanced multi-layer DDoS mitigation to keep your services online 24/7.",
    icon: Shield,
    color: "text-purple-400"
  },
  {
    title: "Scalable CPU",
    description: "Dynamically scale your processing power as your application grows.",
    icon: Cpu,
    color: "text-emerald-400"
  },
  {
    title: "Daily Backups",
    description: "Automated daily backups to ensure your data is always safe and recoverable.",
    icon: Database,
    color: "text-orange-400"
  },
  {
    title: "Root Access",
    description: "Full administrative control over your virtual environment with SSH access.",
    icon: Server,
    color: "text-rose-400"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Engineered for <br />
              <span className="italic font-serif">Performance.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="mb-6 text-white/30 group-hover:text-white transition-colors">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium mb-3 uppercase tracking-widest">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
