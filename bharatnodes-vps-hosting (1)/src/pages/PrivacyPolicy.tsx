import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Account credentials (encrypted passwords)",
        "Payment information (processed securely by third-party payment processors)",
        "Server usage data and resource consumption metrics",
        "IP addresses and access logs",
        "Communication records (support tickets, chat logs)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and maintain our VPS hosting services",
        "Process payments and manage billing",
        "Offer customer support and technical assistance",
        "Send service notifications and important updates",
        "Improve our services through analytics and feedback",
        "Comply with legal obligations and protect against fraud"
      ]
    },
    {
      title: "Data Protection and Security",
      icon: Lock,
      content: [
        "All passwords are encrypted using industry-standard algorithms",
        "Data transmission secured with SSL/TLS encryption",
        "Regular security audits and vulnerability assessments",
        "24/7 monitoring for suspicious activities",
        "Data backups with encryption at rest",
        "Access controls and authentication mechanisms"
      ]
    },
    {
      title: "Third-Party Services",
      icon: Shield,
      content: [
        "Payment processors (Stripe, Razorpay) for transaction processing",
        "Analytics services for website optimization",
        "Email delivery services for notifications",
        "CDN providers for content delivery",
        "Cloud infrastructure providers for service delivery"
      ]
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
            <span className="text-white">Privacy Policy</span>
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
            <Shield size={64} className="mx-auto mb-6 text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Privacy <span className="italic font-serif">Policy</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-zinc-600 mt-4">
              Last updated: February 26, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <section.icon size={32} className="text-blue-400" />
                <h2 className="text-3xl font-light">{section.title}</h2>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-zinc-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Data Retention</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed mb-4">
                We retain your information only as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Account information: Retained while your account is active</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Payment records: Retained for 7 years for tax and legal purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Server logs: Retained for 30 days for security analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Support tickets: Retained for 2 years for service improvement</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Your Rights</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Access: Request a copy of your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Correction: Update inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Deletion: Request removal of your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Portability: Transfer your data to another service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Objection: Restrict processing of your information</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-light mb-4">Questions About Privacy?</h2>
            <p className="text-zinc-300 mb-6">
              If you have any questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-zinc-300">Email: privacy@bharatnodes.com</p>
              <p className="text-zinc-300">Phone: +91 98765 43210</p>
              <p className="text-zinc-300">Address: Mumbai, Maharashtra, India</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
