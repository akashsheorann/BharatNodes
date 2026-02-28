import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Power, 
  RefreshCw, 
  Settings, 
  Monitor, 
  HardDrive, 
  Activity,
  Terminal,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react'
import { Server as ServerType } from '../lib/types'
import toast from 'react-hot-toast'

interface ServerManagementProps {
  server: ServerType
  onUpdate: (server: ServerType) => void
}

export default function ServerManagement({ server, onUpdate }: ServerManagementProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null)

  const handleServerAction = async (action: string) => {
    setIsActionLoading(action)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let updatedServer = { ...server }
      switch (action) {
        case 'start':
          updatedServer.status = 'active'
          toast.success('Server started successfully')
          break
        case 'stop':
          updatedServer.status = 'suspended'
          toast.success('Server stopped successfully')
          break
        case 'restart':
          toast.success('Server restart initiated')
          break
        case 'rebuild':
          toast.success('Server rebuild initiated')
          break
      }
      
      onUpdate(updatedServer)
    } catch (error) {
      toast.error('Action failed. Please try again.')
    } finally {
      setIsActionLoading(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'suspended': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Server Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Server Control</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
            {server.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServerAction('start')}
            disabled={server.status === 'active' || isActionLoading !== null}
            className="flex flex-col items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Power size={20} className="text-green-400" />
            <span className="text-xs">Start</span>
          </motion.button>

          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServerAction('stop')}
            disabled={server.status !== 'active' || isActionLoading !== null}
            className="flex flex-col items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Power size={20} className="text-red-400" />
            <span className="text-xs">Stop</span>
          </motion.button>

          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServerAction('restart')}
            disabled={server.status !== 'active' || isActionLoading !== null}
            className="flex flex-col items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={20} className="text-blue-400" />
            <span className="text-xs">Restart</span>
          </motion.button>

          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServerAction('rebuild')}
            disabled={isActionLoading !== null}
            className="flex flex-col items-center gap-2 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Settings size={20} className="text-orange-400" />
            <span className="text-xs">Rebuild</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Server Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <h3 className="text-lg font-medium mb-6">Server Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-zinc-500">IP Address</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{server.ip_address}</span>
              <button
                onClick={() => copyToClipboard(server.ip_address)}
                className="text-zinc-500 hover:text-white"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-zinc-500">Root Password</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">
                {showPassword ? 'server123!@#' : '••••••••'}
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={() => copyToClipboard('server123!@#')}
                className="text-zinc-500 hover:text-white"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-zinc-500">Location</span>
            <span className="text-sm">{server.location}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-zinc-500">Operating System</span>
            <span className="text-sm">Ubuntu 22.04 LTS</span>
          </div>
        </div>
      </motion.div>

      {/* Resource Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <h3 className="text-lg font-medium mb-6">Resource Usage</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-blue-400" />
                <span className="text-sm">CPU Usage</span>
              </div>
              <span className="text-sm">45%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-green-400" />
                <span className="text-sm">Memory Usage</span>
              </div>
              <span className="text-sm">62%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive size={16} className="text-purple-400" />
                <span className="text-sm">Storage Usage</span>
              </div>
              <span className="text-sm">28%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <h3 className="text-lg font-medium mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
          >
            <Terminal size={20} className="text-blue-400" />
            <div className="text-left">
              <div className="text-sm font-medium">Console Access</div>
              <div className="text-xs text-zinc-500">Open web terminal</div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
          >
            <Settings size={20} className="text-purple-400" />
            <div className="text-left">
              <div className="text-sm font-medium">Advanced Settings</div>
              <div className="text-xs text-zinc-500">Configure server options</div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
