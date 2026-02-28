import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Server, MessageSquare, DollarSign, LogOut, Settings, ChevronRight, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AdminStats {
  totalUsers: number
  totalServers: number
  openTickets: number
  totalRevenue: number
}

interface User {
  id: number
  name: string
  email: string
  created_at: string
}

interface Server {
  id: number
  name: string
  cpu: number
  ram: number
  storage: number
  bandwidth: number
  location: string
  operating_system: string
  status: string
  price: number
  user_name: string
  user_email: string
  created_at: string
}

interface Ticket {
  id: number
  subject: string
  message: string
  status: string
  priority: string
  user_name: string
  user_email: string
  created_at: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<AdminStats>({ totalUsers: 0, totalServers: 0, openTickets: 0, totalRevenue: 0 })
  const [users, setUsers] = useState<User[]>([])
  const [servers, setServers] = useState<Server[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': `Bearer ${token}` }

      const [statsRes, usersRes, serversRes, ticketsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats', { headers }),
        fetch('http://localhost:5000/api/admin/users', { headers }),
        fetch('http://localhost:5000/api/admin/servers', { headers }),
        fetch('http://localhost:5000/api/admin/tickets', { headers })
      ])

      setStats(await statsRes.json())
      setUsers(await usersRes.json())
      setServers(await serversRes.json())
      setTickets(await ticketsRes.json())
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTicketStatus = async (ticketId: number, status: string) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:5000/api/admin/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      
      fetchAdminData()
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'inactive': return 'text-red-400 bg-red-400/10'
      case 'open': return 'text-blue-400 bg-blue-400/10'
      case 'closed': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-zinc-500 hover:text-white transition-colors">
                ← Back to Site
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-white">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 p-1 rounded-lg max-w-2xl">
          {['dashboard', 'users', 'servers', 'tickets'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-light text-white">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-blue-400" size={24} />
                  <span className="text-2xl font-light text-white">{stats.totalUsers}</span>
                </div>
                <div className="text-zinc-400">Total Users</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Server className="text-green-400" size={24} />
                  <span className="text-2xl font-light text-white">{stats.totalServers}</span>
                </div>
                <div className="text-zinc-400">Active Servers</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <MessageSquare className="text-yellow-400" size={24} />
                  <span className="text-2xl font-light text-white">{stats.openTickets}</span>
                </div>
                <div className="text-zinc-400">Open Tickets</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="text-purple-400" size={24} />
                  <span className="text-2xl font-light text-white">${stats.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="text-zinc-400">Total Revenue</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-light text-white">All Users</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-zinc-400">Name</th>
                      <th className="text-left p-4 text-zinc-400">Email</th>
                      <th className="text-left p-4 text-zinc-400">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4 text-white">{user.name}</td>
                        <td className="p-4 text-zinc-300">{user.email}</td>
                        <td className="p-4 text-zinc-400">{formatDate(user.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Servers Tab */}
        {activeTab === 'servers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-light text-white">All Servers</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-zinc-400">Server Name</th>
                      <th className="text-left p-4 text-zinc-400">User</th>
                      <th className="text-left p-4 text-zinc-400">Specs</th>
                      <th className="text-left p-4 text-zinc-400">Location</th>
                      <th className="text-left p-4 text-zinc-400">Status</th>
                      <th className="text-left p-4 text-zinc-400">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servers.map((server) => (
                      <tr key={server.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4 text-white">{server.name}</td>
                        <td className="p-4 text-zinc-300">
                          <div>
                            <div>{server.user_name}</div>
                            <div className="text-xs text-zinc-500">{server.user_email}</div>
                          </div>
                        </td>
                        <td className="p-4 text-zinc-300">
                          {server.cpu} vCPU / {server.ram}GB RAM / {server.storage}GB SSD
                        </td>
                        <td className="p-4 text-zinc-300">{server.location}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(server.status)}`}>
                            {server.status}
                          </span>
                        </td>
                        <td className="p-4 text-white">${server.price}/mo</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-light text-white">Support Tickets</h2>
            
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">{ticket.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>{ticket.user_name}</span>
                        <span>•</span>
                        <span>{ticket.user_email}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-4">{ticket.message}</p>
                  
                  {ticket.status === 'open' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Mark In Progress
                      </button>
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'closed')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Close Ticket
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
