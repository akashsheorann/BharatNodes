import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '../lib/utils'
import PaymentModal from './PaymentModal'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: "Starter Node",
    price: "₹499",
    period: "/mo",
    features: ["2 vCPU Cores", "4GB DDR4 RAM", "40GB NVMe SSD", "1TB Bandwidth", "1Gbps Port Speed"],
    recommended: false,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Pro Node",
    price: "₹999",
    period: "/mo",
    features: ["4 vCPU Cores", "8GB DDR4 RAM", "80GB NVMe SSD", "2TB Bandwidth", "2Gbps Port Speed", "Priority Support"],
    recommended: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Enterprise Node",
    price: "₹1999",
    period: "/mo",
    features: ["8 vCPU Cores", "16GB DDR4 RAM", "160GB NVMe SSD", "5TB Bandwidth", "5Gbps Port Speed", "Dedicated Account Manager"],
    recommended: false,
    color: "from-orange-500 to-red-500"
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!user) {
      navigate('/register');
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <>
      <section id="pricing" className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light tracking-tight"
            >
              Simple <span className="italic font-serif">Pricing.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="mb-10">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-light">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-6 mb-12 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-sm text-zinc-400 border-b border-white/5 pb-4 last:border-0">
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ opacity: 0.8 }}
                  onClick={() => handleSelectPlan(plan)}
                  className={cn(
                    "w-full py-4 text-xs uppercase tracking-widest font-bold transition-all",
                    plan.recommended 
                      ? "bg-white text-black" 
                      : "border border-white/20 text-white"
                  )}
                >
                  Select Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan!}
      />
    </>
  );
}
