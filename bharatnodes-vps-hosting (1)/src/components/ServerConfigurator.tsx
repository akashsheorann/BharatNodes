import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Activity, 
  Globe, 
  Plus, 
  Minus,
  Check,
  Info,
  Zap,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ServerConfig {
  cpu: number
  ram: number
  storage: number
  bandwidth: number
  location: string
  operatingSystem: string
  addons: string[]
}

const locations = [
  { code: 'mumbai', name: 'Mumbai, India', latency: '12ms', price: 1 },
  { code: 'delhi', name: 'Delhi, India', latency: '18ms', price: 1 },
  { code: 'bangalore', name: 'Bangalore, India', latency: '15ms', price: 1 },
  { code: 'singapore', name: 'Singapore', latency: '35ms', price: 1.2 },
  { code: 'london', name: 'London, UK', latency: '120ms', price: 1.5 },
  { code: 'newyork', name: 'New York, USA', latency: '180ms', price: 1.5 }
]

const operatingSystems = [
  { id: 'ubuntu22', name: 'Ubuntu 22.04 LTS', icon: '🐧', free: true },
  { id: 'ubuntu20', name: 'Ubuntu 20.04 LTS', icon: '🐧', free: true },
  { id: 'centos9', name: 'CentOS 9 Stream', icon: '🐧', free: true },
  { id: 'debian11', name: 'Debian 11', icon: '🐧', free: true },
  { id: 'windows2022', name: 'Windows Server 2022', icon: '🪟', free: false, price: 500 },
  { id: 'windows2019', name: 'Windows Server 2019', icon: '🪟', free: false, price: 400 }
]

const addons = [
  { id: 'backup', name: 'Automated Backups', price: 100, description: 'Daily automated backups with 30-day retention' },
  { id: 'monitoring', name: 'Advanced Monitoring', price: 150, description: 'Real-time monitoring and alerting system' },
  { id: 'ssl', name: 'SSL Certificate', price: 50, description: 'Premium SSL certificate for your domain' },
  { id: 'ddos', name: 'DDoS Protection', price: 200, description: 'Advanced DDoS mitigation service' },
  { id: 'managed', name: 'Managed Support', price: 500, description: 'Fully managed server with 24/7 support' }
]

export default function ServerConfigurator() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [config, setConfig] = useState<ServerConfig>({
    cpu: 2,
    ram: 4,
    storage: 40,
    bandwidth: 1000,
    location: 'mumbai',
    operatingSystem: 'ubuntu22',
    addons: []
  })

  const calculatePrice = () => {
    let basePrice = 0
    
    // CPU pricing
    basePrice += config.cpu * 150
    
    // RAM pricing
    basePrice += config.ram * 80
    
    // Storage pricing (NVMe SSD)
    basePrice += config.storage * 8
    
    // Bandwidth pricing
    basePrice += Math.ceil(config.bandwidth / 1000) * 50
    
    // Location multiplier
    const location = locations.find(l => l.code === config.location)
    basePrice *= location?.price || 1
    
    // OS pricing
    const os = operatingSystems.find(o => o.id === config.operatingSystem)
    if (!os?.free) {
      basePrice += os?.price || 0
    }
    
    // Addons
    config.addons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId)
      basePrice += addon?.price || 0
    })
    
    return basePrice
  }

  const updateConfig = (key: keyof ServerConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const handleDeploy = () => {
    if (!user) {
      toast.error('Please login to deploy a server')
      navigate('/register')
      return
    }
    
    toast.success('Server configuration saved! Proceeding to payment...')
    // Here you would typically save the config and redirect to payment
  }

  const addToAddons = (addonId: string) => {
    if (!config.addons.includes(addonId)) {
      setConfig(prev => ({
        ...prev,
        addons: [...prev.addons, addonId]
      }))
    }
  }

  const removeFromAddons = (addonId: string) => {
    setConfig(prev => ({
      ...prev,
      addons: prev.addons.filter(id => id !== addonId)
    }))
  }

  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Configure Your <span className="italic font-serif">Server</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Build your perfect VPS with our interactive configurator. Choose exactly what you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* CPU Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Cpu size={24} className="text-blue-400" />
                <h3 className="text-xl font-medium">CPU Cores</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => updateConfig('cpu', Math.max(1, config.cpu - 1))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Minus size={16} />
                </button>
                
                <div className="text-center">
                  <div className="text-3xl font-light">{config.cpu}</div>
                  <div className="text-sm text-zinc-500">vCPU Cores</div>
                </div>
                
                <button
                  onClick={() => updateConfig('cpu', Math.min(16, config.cpu + 1))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="text-sm text-zinc-500">
                Intel Xeon processors with guaranteed performance
              </div>
            </motion.div>

            {/* RAM Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity size={24} className="text-green-400" />
                <h3 className="text-xl font-medium">Memory (RAM)</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => updateConfig('ram', Math.max(1, config.ram - 1))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Minus size={16} />
                </button>
                
                <div className="text-center">
                  <div className="text-3xl font-light">{config.ram}</div>
                  <div className="text-sm text-zinc-500">GB DDR4 RAM</div>
                </div>
                
                <button
                  onClick={() => updateConfig('ram', Math.min(64, config.ram + 1))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="text-sm text-zinc-500">
                High-speed DDR4 ECC RAM for optimal performance
              </div>
            </motion.div>

            {/* Storage Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <HardDrive size={24} className="text-purple-400" />
                <h3 className="text-xl font-medium">Storage</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => updateConfig('storage', Math.max(20, config.storage - 10))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Minus size={16} />
                </button>
                
                <div className="text-center">
                  <div className="text-3xl font-light">{config.storage}</div>
                  <div className="text-sm text-zinc-500">GB NVMe SSD</div>
                </div>
                
                <button
                  onClick={() => updateConfig('storage', Math.min(1000, config.storage + 10))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="text-sm text-zinc-500">
                Ultra-fast NVMe SSD storage for maximum I/O performance
              </div>
            </motion.div>

            {/* Bandwidth Configuration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe size={24} className="text-cyan-400" />
                <h3 className="text-xl font-medium">Bandwidth</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => updateConfig('bandwidth', Math.max(500, config.bandwidth - 500))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Minus size={16} />
                </button>
                
                <div className="text-center">
                  <div className="text-3xl font-light">{config.bandwidth}</div>
                  <div className="text-sm text-zinc-500">GB/month</div>
                </div>
                
                <button
                  onClick={() => updateConfig('bandwidth', Math.min(20000, config.bandwidth + 500))}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="text-sm text-zinc-500">
                High-speed bandwidth with 1Gbps+ port speed
              </div>
            </motion.div>

            {/* Location Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe size={24} className="text-orange-400" />
                <h3 className="text-xl font-medium">Data Center Location</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <button
                    key={location.code}
                    onClick={() => updateConfig('location', location.code)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      config.location === location.code
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="font-medium mb-1">{location.name}</div>
                    <div className="text-sm text-zinc-500">Latency: {location.latency}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Operating System Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Server size={24} className="text-red-400" />
                <h3 className="text-xl font-medium">Operating System</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operatingSystems.map((os) => (
                  <button
                    key={os.id}
                    onClick={() => updateConfig('operatingSystem', os.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      config.operatingSystem === os.id
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{os.icon}</span>
                      <div className="font-medium">{os.name}</div>
                    </div>
                    <div className="text-sm text-zinc-500">
                      {os.free ? 'Free' : `+₹${os.price}/month`}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Addons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap size={24} className="text-yellow-400" />
                <h3 className="text-xl font-medium">Addons & Services</h3>
              </div>
              
              <div className="space-y-4">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`p-4 border rounded-lg transition-all ${
                      config.addons.includes(addon.id)
                        ? 'border-white bg-white/10'
                        : 'border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => {
                              if (config.addons.includes(addon.id)) {
                                removeFromAddons(addon.id)
                              } else {
                                addToAddons(addon.id)
                              }
                            }}
                            className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                              config.addons.includes(addon.id)
                                ? 'border-white bg-white'
                                : 'border-white/40'
                            }`}
                          >
                            {config.addons.includes(addon.id) && <Check size={12} className="text-black" />}
                          </button>
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-zinc-500">+₹{addon.price}/month</div>
                        </div>
                        <div className="text-sm text-zinc-500 ml-7">{addon.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-medium mb-6">Configuration Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">CPU Cores</span>
                  <span>{config.cpu} vCPUs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Memory</span>
                  <span>{config.ram} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Storage</span>
                  <span>{config.storage} GB NVMe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Bandwidth</span>
                  <span>{config.bandwidth} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Location</span>
                  <span>{locations.find(l => l.code === config.location)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">OS</span>
                  <span>{operatingSystems.find(o => o.id === config.operatingSystem)?.name}</span>
                </div>
                
                {config.addons.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <div className="text-sm font-medium mb-2">Addons:</div>
                    {config.addons.map(addonId => {
                      const addon = addons.find(a => a.id === addonId)
                      return (
                        <div key={addonId} className="flex justify-between text-sm">
                          <span className="text-zinc-500">{addon?.name}</span>
                          <span>₹{addon?.price}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              
              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium">Total Price</span>
                  <span className="text-3xl font-light">₹{calculatePrice()}</span>
                </div>
                <div className="text-sm text-zinc-500">per month</div>
              </div>
              
              <motion.button
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeploy}
                className="w-full py-3 bg-white text-black font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <Server size={16} />
                Deploy Server
              </motion.button>
              
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-blue-400 mt-0.5" />
                  <div className="text-sm text-zinc-300">
                    Your server will be deployed instantly after payment completion. No setup fees or hidden charges.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
