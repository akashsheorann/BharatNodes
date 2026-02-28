import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Shield, Gavel } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      title: "Service Description",
      icon: FileText,
      content: [
        "BharatNodes provides Virtual Private Server (VPS) hosting services",
        "Services include server provisioning, management, and technical support",
        "All services are provided \"as is\" subject to the terms outlined in this agreement",
        "We reserve the right to modify, suspend, or discontinue services with notice"
      ]
    },
    {
      title: "Acceptable Use Policy",
      icon: AlertTriangle,
      content: [
        "Servers must not be used for illegal activities or content",
        "Prohibited activities include spamming, phishing, malware distribution",
        "No resource-intensive applications that affect other users",
        "Copyright infringement and intellectual property violations are prohibited",
        "Cryptocurrency mining is not allowed on shared infrastructure"
      ]
    },
    {
      title: "Payment Terms",
      icon: Shield,
      content: [
        "All payments are processed in advance on a monthly or annual basis",
        "Prices are subject to change with 30 days notice",
        "Late payments may result in service suspension",
        "Refunds are provided according to our 30-day money-back guarantee",
        "All payments are non-refundable after the initial 30-day period"
      ]
    },
    {
      title: "Service Level Agreement",
      icon: Gavel,
      content: [
        "We guarantee 99.99% network uptime excluding scheduled maintenance",
        "Compensation credits provided for uptime failures beyond our control",
        "Response times: Critical issues within 1 hour, normal issues within 24 hours",
        "Maintenance windows are scheduled with advance notice when possible",
        "Service credits are calculated as a percentage of monthly fees"
      ]
    }
  ]

  const limitations = [
    "We are not liable for data loss due to customer actions or omissions",
    "We do not guarantee third-party service integrations or compatibility",
    "Maximum liability is limited to the amount paid for services in a given month",
    "We are not responsible for content hosted on customer servers",
    "Force majeure events exempt us from service level obligations"
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
            <span className="text-white">Terms of Service</span>
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
            <FileText size={64} className="mx-auto mb-6 text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Terms of <span className="italic font-serif">Service</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed">
              By using BharatNodes services, you agree to these terms and conditions.
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

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Limitation of Liability</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed mb-6">
                To the maximum extent permitted by law, BharatNodes shall not be liable for:
              </p>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Termination</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Either party may terminate this agreement under the following conditions:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Customer may terminate with 30 days notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">We may terminate for violation of terms or non-payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Immediate termination for illegal activities or security threats</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-zinc-300">Data will be available for 30 days after termination</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-light mb-8">Governing Law</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-zinc-300 leading-relaxed">
                These terms are governed by and construed in accordance with the laws of India. 
                Any disputes arising from these terms shall be resolved through arbitration in Mumbai, India.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-light mb-4">Questions About Terms?</h2>
            <p className="text-zinc-300 mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-zinc-300">Email: legal@bharatnodes.com</p>
              <p className="text-zinc-300">Phone: +91 98765 43210</p>
              <p className="text-zinc-300">Address: Mumbai, Maharashtra, India</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
