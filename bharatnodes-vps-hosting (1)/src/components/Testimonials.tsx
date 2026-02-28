import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CTO at TechStart",
    avatar: "RS",
    content: "BharatNodes has been instrumental in scaling our infrastructure. The uptime is incredible and the support team is always responsive. Highly recommended!",
    rating: 5,
    company: "TechStart Solutions"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Full Stack Developer",
    avatar: "PP",
    content: "I've tried several VPS providers, but BharatNodes stands out with their exceptional performance and competitive pricing. The Mumbai data center gives me amazing latency.",
    rating: 5,
    company: "Freelance Developer"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "DevOps Engineer",
    avatar: "AK",
    content: "The deployment process is seamless and the server specifications are exactly as advertised. Been using their services for over a year with zero issues.",
    rating: 5,
    company: "Enterprise Corp"
  }
]

const socialProof = [
  {
    metric: "100+",
    label: "Beta Testers"
  },
  {
    metric: "99.9%",
    label: "Uptime"
  },
  {
    metric: "24/7",
    label: "Expert Support"
  },
  {
    metric: "3",
    label: "Data Centers"
  }
]

export default function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Trusted by <span className="italic font-serif">Beta Testers.</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            See what our early users have to say about their experience with BharatNodes
          </p>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {socialProof.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">{item.metric}</div>
              <div className="text-sm text-zinc-500 uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <Quote className="text-white/20 group-hover:text-white/30 transition-colors" size={24} />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-zinc-300 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500">{testimonial.role}</div>
                  <div className="text-xs text-zinc-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
