import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Server, Activity, Database, Globe, Plus, Settings, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Server as ServerType } from '../lib/types'
import ServerManagement from '../components/ServerManagement'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [servers, setServers] = useState<ServerType[]>([])
  const [selectedServer, setSelectedServer] = useState<ServerType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServers()
  }, [])

  const fetchServers = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockServers: ServerType[] = [
        {
          id: '1',
          user_id: user?.id || '',
          name: 'Web Server 1',
          plan: 'Pro Node',
          status: 'active',
          ip_address: '192.168.1.100',
          location: 'Mumbai',
          specs: {
            cpu: 4,
            ram: 8,
            storage: 80,
            bandwidth: 2000
          },
          created_at: '2024-01-15T10:30:00Z',
          expires_at: '2024-02-15T10:30:00Z'
        },
        {
          id: '2',
          user_id: user?.id || '',
          name: 'Database Server',
          plan: 'Starter Node',
          status: 'active',
          ip_address: '192.168.1.101',
          location: 'Delhi',
          specs: {
            cpu: 2,
            ram: 4,
            storage: 40,
            bandwidth: 1000
          },
          created_at: '2024-01-10T15:45:00Z',
          expires_at: '2024-02-10T15:45:00Z'
        }
      ]
      setServers(mockServers)
      if (mockServers.length > 0) {
        setSelectedServer(mockServers[0])
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleServerUpdate = (updatedServer: ServerType) => {
    setServers(prev => prev.map(s => s.id === updatedServer.id ? updatedServer : s))
    setSelectedServer(updatedServer)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'suspended': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (selectedServer) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedServer(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Servers</span>
              </button>
              <div className="h-6 w-px bg-white/20" />
              <h1 className="text-xl font-medium">{selectedServer.name}</h1>
            </div>
            <button
              onClick={signOut}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <ServerManagement 
            server={selectedServer} 
            onUpdate={handleServerUpdate}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium">Dashboard</h1>
            <span className="text-zinc-500">Welcome, {user?.name}</span>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <Server className="text-blue-400" size={24} />
              <div>
                <div className="text-2xl font-light">{servers.length}</div>
                <div className="text-sm text-zinc-500">Total Servers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <Activity className="text-green-400" size={24} />
              <div>
                <div className="text-2xl font-light">99.9%</div>
                <div className="text-sm text-zinc-500">Uptime</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <Database className="text-purple-400" size={24} />
              <div>
                <div className="text-2xl font-light">240GB</div>
                <div className="text-sm text-zinc-500">Total Storage</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <Globe className="text-orange-400" size={24} />
              <div>
                <div className="text-2xl font-light">3TB</div>
                <div className="text-sm text-zinc-500">Bandwidth</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Servers */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light">Your Servers</h2>
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg"
          >
            <Plus size={16} />
            Deploy New Server
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server, index) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedServer(server)}
              className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium mb-1">{server.name}</h3>
                  <p className="text-sm text-zinc-500">{server.plan}</p>
                </div>
                <button className="text-zinc-500 hover:text-white">
                  <Settings size={16} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Status</span>
                  <span className={getStatusColor(server.status)}>
                    {server.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">IP Address</span>
                  <span className="font-mono">{server.ip_address}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Location</span>
                  <span>{server.location}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500">CPU:</span>
                    <span className="ml-2">{server.specs.cpu} vCPUs</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">RAM:</span>
                    <span className="ml-2">{server.specs.ram}GB</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Storage:</span>
                    <span className="ml-2">{server.specs.storage}GB</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Bandwidth:</span>
                    <span className="ml-2">{server.specs.bandwidth}GB</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
