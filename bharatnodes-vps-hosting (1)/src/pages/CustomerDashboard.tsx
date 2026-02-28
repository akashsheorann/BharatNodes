import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, MessageSquare, User, CreditCard, Activity, Power, RefreshCw, Plus, Trash2, CheckCircle, XCircle, AlertCircle, Settings, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

// Mock data for demo
const mockServers = [
  {
    id: 1,
    name: 'Web Server',
    cpu: 2,
    ram: 4,
    storage: 50,
    bandwidth: 1,
    location: 'Mumbai, India',
    operating_system: 'Ubuntu 22.04 LTS',
    status: 'active',
    price: 999.00,
    ip_address: '192.168.1.100',
    created_at: '2024-01-15'
  },
  {
    id: 2,
    name: 'Database Server',
    cpu: 4,
    ram: 8,
    storage: 100,
    bandwidth: 2,
    location: 'Delhi, India',
    operating_system: 'Ubuntu 20.04 LTS',
    status: 'active',
    price: 1999.00,
    ip_address: '192.168.1.101',
    created_at: '2024-01-20'
  },
  {
    id: 3,
    name: 'Development Server',
    cpu: 1,
    ram: 2,
    storage: 25,
    bandwidth: 0.5,
    location: 'Bangalore, India',
    operating_system: 'CentOS 9 Stream',
    status: 'inactive',
    price: 499.00,
    ip_address: '192.168.1.102',
    created_at: '2024-02-01'
  }
]

const mockTickets = [
  {
    id: 1,
    subject: 'Server not responding',
    message: 'My web server is not loading. Please help me troubleshoot this issue.',
    status: 'open',
    priority: 'high',
    created_at: '2024-02-25'
  },
  {
    id: 2,
    subject: 'Need to upgrade RAM',
    message: 'I want to upgrade my server RAM from 4GB to 8GB. What is the process?',
    status: 'closed',
    priority: 'medium',
    created_at: '2024-02-20'
  },
  {
    id: 3,
    subject: 'Backup configuration',
    message: 'How do I set up automated backups for my server?',
    status: 'in-progress',
    priority: 'low',
    created_at: '2024-02-22'
  }
]

const mockUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  created_at: '2024-01-01'
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('servers')
  const [servers, setServers] = useState(mockServers)
  const [tickets, setTickets] = useState(mockTickets)
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', priority: 'medium' })

  const handleServerAction = (serverId: number, action: string) => {
    setServers(servers.map(server => {
      if (server.id === serverId) {
        let newStatus = server.status
        if (action === 'start') newStatus = 'active'
        if (action === 'stop') newStatus = 'inactive'
        if (action === 'restart') newStatus = 'active'
        
        if (action === 'delete') {
          toast.success('Server deleted successfully')
          return null as any
        }
        
        toast.success(`Server ${action} successful`)
        return { ...server, status: newStatus }
      }
      return server
    }).filter(Boolean))
  }

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: 'open',
      created_at: new Date().toISOString().split('T')[0]
    }
    setTickets([ticket, ...tickets])
    setShowCreateTicket(false)
    setNewTicket({ subject: '', message: '', priority: 'medium' })
    toast.success('Support ticket created successfully!')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-400" />
      case 'inactive': return <XCircle size={16} className="text-red-400" />
      case 'pending': return <AlertCircle size={16} className="text-yellow-400" />
      default: return <Activity size={16} className="text-zinc-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'inactive': return 'text-red-400 bg-red-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'open': return 'text-blue-400 bg-blue-400/10'
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10'
      case 'closed': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-zinc-400 bg-zinc-400/10'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                Back to Website
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-white">My Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-400">Welcome, {mockUser.name}</span>
              <Link to="/support" className="text-zinc-400 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Server className="text-blue-400" size={24} />
              <span className="text-2xl font-light text-white">{servers.length}</span>
            </div>
            <div className="text-zinc-400">My Servers</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="text-green-400" size={24} />
              <span className="text-2xl font-light text-white">
                {servers.filter(s => s.status === 'active').length}
              </span>
            </div>
            <div className="text-zinc-400">Active Servers</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="text-yellow-400" size={24} />
              <span className="text-2xl font-light text-white">
                {tickets.filter(t => t.status === 'open').length}
              </span>
            </div>
            <div className="text-zinc-400">Open Tickets</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="text-purple-400" size={24} />
              <span className="text-2xl font-light text-white">
                ${servers.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
              </span>
            </div>
            <div className="text-zinc-400">Monthly Cost</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 p-1 rounded-lg max-w-2xl">
          {['servers', 'tickets', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md transition-colors capitalize flex items-center justify-center gap-2 ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab === 'servers' && <Server size={16} />}
              {tab === 'tickets' && <MessageSquare size={16} />}
              {tab === 'profile' && <User size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Servers Tab */}
        {activeTab === 'servers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-light text-white">My Servers</h2>
              <Link
                to="/server-configurator"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                New Server
              </Link>
            </div>

            {servers.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Server size={48} className="mx-auto mb-4 text-zinc-500" />
                <h3 className="text-xl text-white mb-2">No Servers Yet</h3>
                <p className="text-zinc-400 mb-6">You don't have any servers configured yet.</p>
                <Link
                  to="/server-configurator"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  Create Your First Server
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {servers.map((server) => (
                  <div key={server.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">{server.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(server.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(server.status)}`}>
                            {server.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${server.price}/mo</div>
                        <div className="text-xs text-zinc-500">{formatDate(server.created_at)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">CPU</div>
                        <div className="text-white">{server.cpu} vCPU</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">RAM</div>
                        <div className="text-white">{server.ram} GB</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Storage</div>
                        <div className="text-white">{server.storage} GB SSD</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-xs text-zinc-500 mb-1">Bandwidth</div>
                        <div className="text-white">{server.bandwidth} TB</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-sm text-zinc-400">
                      <span>{server.location}</span>
                      <span>•</span>
                      <span>{server.operating_system}</span>
                      <span>•</span>
                      <span className="text-blue-400">{server.ip_address}</span>
                    </div>

                    <div className="flex gap-2">
                      {server.status === 'active' ? (
                        <>
                          <button
                            onClick={() => handleServerAction(server.id, 'restart')}
                            className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                          >
                            <RefreshCw size={14} />
                            Restart
                          </button>
                          <button
                            onClick={() => handleServerAction(server.id, 'stop')}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Power size={14} />
                            Stop
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleServerAction(server.id, 'start')}
                          className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <Power size={14} />
                          Start
                        </button>
                      )}
                      <button
                        onClick={() => handleServerAction(server.id, 'delete')}
                        className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors ml-auto"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-light text-white">Support Tickets</h2>
              <button
                onClick={() => setShowCreateTicket(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} />
                New Ticket
              </button>
            </div>

            {showCreateTicket && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-medium text-white mb-4">Create Support Ticket</h3>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                    <input
                      type="text"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message</label>
                    <textarea
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none"
                      placeholder="Describe your issue in detail..."
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Submit Ticket
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateTicket(false)}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {tickets.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-zinc-500" />
                <h3 className="text-xl text-white mb-2">No Tickets Yet</h3>
                <p className="text-zinc-400 mb-6">You haven't created any support tickets yet.</p>
                <button
                  onClick={() => setShowCreateTicket(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  Create Your First Ticket
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">{ticket.subject}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                          <span>{formatDate(ticket.created_at)}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.priority)}`}>
                            {ticket.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-300">{ticket.message}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-light text-white">My Profile</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                  {mockUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{mockUser.name}</h3>
                  <p className="text-zinc-400">{mockUser.email}</p>
                  <p className="text-sm text-zinc-500">Member since {formatDate(mockUser.created_at)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Server size={16} className="text-blue-400" />
                    <span className="text-white font-medium">Servers</span>
                  </div>
                  <div className="text-2xl text-white mb-1">{servers.length}</div>
                  <div className="text-sm text-zinc-400">Active servers</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={16} className="text-yellow-400" />
                    <span className="text-white font-medium">Support</span>
                  </div>
                  <div className="text-2xl text-white mb-1">{tickets.length}</div>
                  <div className="text-sm text-zinc-400">Total tickets</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/server-configurator"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Plus size={16} />
                    Order New Server
                  </Link>
                  <Link
                    to="/knowledge-base"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Settings size={16} />
                    Knowledge Base
                  </Link>
                  <Link
                    to="/support"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <MessageSquare size={16} />
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
