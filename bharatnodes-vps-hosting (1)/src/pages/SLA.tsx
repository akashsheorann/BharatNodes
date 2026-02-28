import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock, AlertTriangle, TrendingUp, Award, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SLA() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const uptimeMetrics = [
    { period: "Monthly", target: "99.99%", credit: "10%" },
    { period: "Quarterly", target: "99.95%", credit: "25%" },
    { period: "Yearly", target: "99.9%", credit: "50%" }
  ]

  const responseTimes = [
    { priority: "Critical", time: "1 hour", description: "Server downtime, network issues" },
    { priority: "High", time: "4 hours", description: "Performance degradation, service errors" },
    { priority: "Medium", time: "12 hours", description: "Configuration issues, minor bugs" },
    { priority: "Low", time: "24 hours", description: "General inquiries, feature requests" }
  ]

  const exclusions = [
    "Scheduled maintenance windows (announced 48 hours in advance)",
    "Customer-caused outages or misconfigurations",
    "Third-party service failures beyond our control",
    "Force majeure events (natural disasters, wars, etc.)",
    "DDoS attacks exceeding our mitigation capacity",
    "Customer software or application issues"
  ]

  const compensationTable = [
    { downtime: "0-5 minutes", credit: "0%" },
    { downtime: "5-30 minutes", credit: "5%" },
    { downtime: "30-60 minutes", credit: "10%" },
    { downtime: "1-4 hours", credit: "25%" },
    { downtime: "4-8 hours", credit: "50%" },
    { downtime: "8+ hours", credit: "100%" }
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
            <span className="text-white">Service Level Agreement</span>
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
            <Award size={64} className="mx-auto mb-6 text-blue-400" />
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Service Level <span className="italic font-serif">Agreement</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Our commitment to providing reliable, high-performance VPS hosting services with guaranteed uptime and support response times.
            </p>
            <p className="text-sm text-zinc-600 mt-4">
              Effective: February 26, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Uptime Guarantee */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Shield size={48} className="mx-auto mb-4 text-green-400" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Uptime <span className="italic font-serif">Guarantee</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              We guarantee 99.99% network uptime for all VPS hosting services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {uptimeMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl font-light mb-2">{metric.target}</div>
                <div className="text-sm text-zinc-500 mb-4">{metric.period}</div>
                <div className="text-lg font-medium text-green-400">{metric.credit} Credit</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Response Times */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Clock size={48} className="mx-auto mb-4 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Support Response <span className="italic font-serif">Times</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Guaranteed response times for different priority levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {responseTimes.map((response, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{response.priority}</h3>
                  <div className="text-2xl font-light text-blue-400">{response.time}</div>
                </div>
                <p className="text-sm text-zinc-500">{response.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Policy */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TrendingUp size={48} className="mx-auto mb-4 text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Service <span className="italic font-serif">Credits</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Compensation for downtime beyond our SLA guarantees
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3">Monthly Downtime</th>
                      <th className="text-center py-3">Service Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compensationTable.map((row, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="py-3">{row.downtime}</td>
                        <td className="text-center py-3 font-medium text-purple-400">{row.credit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-sm text-zinc-300">
                  Service credits are applied as account credits for future service payments and do not exceed the monthly service fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              SLA <span className="italic font-serif">Exclusions</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Situations not covered by our uptime guarantee
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8">
              <ul className="space-y-4">
                {exclusions.map((exclusion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{exclusion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Zap size={48} className="mx-auto mb-4 text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Performance <span className="italic font-serif">Metrics</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Guaranteed performance levels for all VPS plans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { metric: "CPU", guarantee: "Dedicated cores as specified" },
              { metric: "RAM", guarantee: "Guaranteed memory allocation" },
              { metric: "Storage", guarantee: "NVMe SSD with guaranteed IOPS" },
              { metric: "Network", guarantee: "1Gbps+ port speed" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-2xl font-light mb-2">{item.metric}</div>
                <div className="text-sm text-zinc-500">{item.guarantee}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-2xl font-light mb-4">SLA Claims</h2>
            <p className="text-zinc-300 mb-6">
              To file an SLA claim, please contact our support team with detailed information about the service interruption.
            </p>
            <div className="space-y-2">
              <p className="text-zinc-300">Email: sla@bharatnodes.com</p>
              <p className="text-zinc-300">Phone: +91 98765 43210</p>
              <p className="text-zinc-300">Response time: Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
