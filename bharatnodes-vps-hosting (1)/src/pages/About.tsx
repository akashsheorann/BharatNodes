import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Server, Users, Globe, Award, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To provide reliable, high-performance VPS hosting solutions that empower developers and businesses to scale their digital infrastructure."
    },
    {
      icon: Zap,
      title: "Vision",
      description: "To become the most trusted VPS hosting provider in India, known for exceptional performance, security, and customer support."
    },
    {
      icon: Award,
      title: "Values",
      description: "We believe in transparency, reliability, and customer-first approach. Your success is our success."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Customers Served" },
    { number: "99.99%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Expert Support" },
    { number: "15+", label: "Global Locations" }
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      avatar: "RK",
      description: "15+ years in cloud infrastructure and DevOps"
    },
    {
      name: "Anita Sharma",
      role: "CTO",
      avatar: "AS",
      description: "Expert in scalable architecture and security"
    },
    {
      name: "Vikram Singh",
      role: "Head of Operations",
      avatar: "VS",
      description: "Ensuring smooth operations worldwide"
    },
    {
      name: "Priya Patel",
      role: "Head of Customer Success",
      avatar: "PP",
      description: "Dedicated to exceptional customer experience"
    }
  ]

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-zinc-500 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              About <span className="italic font-serif">BharatNodes</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Founded in 2020, BharatNodes has grown from a small startup to one of India's most trusted VPS hosting providers. 
              We combine cutting-edge technology with exceptional customer service to deliver hosting solutions that businesses can rely on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light mb-2">{stat.number}</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Our <span className="italic font-serif">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <value.icon size={48} className="mx-auto mb-6 text-blue-400" />
                <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Meet Our <span className="italic font-serif">Leadership</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              The passionate team behind BharatNodes, dedicated to providing you with the best hosting experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-medium mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-medium mb-1">{member.name}</h3>
                <p className="text-sm text-zinc-500 mb-2">{member.role}</p>
                <p className="text-xs text-zinc-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Our <span className="italic font-serif">Technology</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Built on enterprise-grade infrastructure to ensure maximum performance and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "NVMe SSD Storage",
              "DDR4 RAM",
              "Intel Xeon Processors",
              "1Gbps+ Network",
              "DDoS Protection",
              "Automated Backups",
              "99.99% Uptime SLA",
              "24/7 Monitoring",
              "Global CDN"
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <Server size={20} className="text-blue-400" />
                <span className="text-sm">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
