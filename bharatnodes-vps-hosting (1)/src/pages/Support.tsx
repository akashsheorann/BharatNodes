import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { SupportTicket } from '../lib/types'
import toast from 'react-hot-toast'

export default function Support() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockTickets: SupportTicket[] = [
        {
          id: '1',
          user_id: user?.id || '',
          subject: 'Server not responding',
          message: 'My server has been down for the last 2 hours. Please help.',
          status: 'open',
          priority: 'high',
          created_at: '2024-01-20T10:30:00Z',
          updated_at: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          user_id: user?.id || '',
          subject: 'Billing inquiry',
          message: 'I have a question about my recent invoice.',
          status: 'resolved',
          priority: 'low',
          created_at: '2024-01-18T14:20:00Z',
          updated_at: '2024-01-19T09:15:00Z'
        }
      ]
      setTickets(mockTickets)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTicket.subject.trim() || !newTicket.message.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      // Mock API call - replace with actual implementation
      const ticket: SupportTicket = {
        id: Date.now().toString(),
        user_id: user?.id || '',
        subject: newTicket.subject,
        message: newTicket.message,
        status: 'open',
        priority: newTicket.priority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setTickets(prev => [ticket, ...prev])
      setNewTicket({ subject: '', message: '', priority: 'medium' })
      setShowNewTicketModal(false)
      toast.success('Ticket created successfully')
    } catch (error) {
      toast.error('Failed to create ticket')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} className="text-yellow-400" />
      case 'in_progress': return <Clock size={16} className="text-blue-400" />
      case 'resolved': return <CheckCircle size={16} className="text-green-400" />
      default: return <MessageSquare size={16} className="text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-medium">Support Center</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light mb-2">Support Tickets</h2>
            <p className="text-zinc-500">Manage and track your support requests</p>
          </div>
          
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewTicketModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg"
          >
            <Plus size={16} />
            New Ticket
          </motion.button>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-zinc-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">No tickets yet</h3>
              <p className="text-zinc-500 mb-6">Create your first support ticket to get started</p>
              <motion.button
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewTicketModal(true)}
                className="px-6 py-2 bg-white text-black text-sm font-medium rounded-lg"
              >
                Create Ticket
              </motion.button>
            </div>
          ) : (
            tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(ticket.status)}
                    <div>
                      <h3 className="font-medium mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-2">{ticket.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatDate(ticket.created_at)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">
                    Status: <span className="text-white">{ticket.status.replace('_', ' ').toUpperCase()}</span>
                  </span>
                  <motion.button
                    whileHover={{ opacity: 0.8 }}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowNewTicketModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Create New Ticket</h2>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitTicket} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-white"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-white h-32 resize-none"
                  placeholder="Detailed description of your issue..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="button"
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowNewTicketModal(false)}
                  className="flex-1 py-3 border border-white/20 text-white font-medium rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-white text-black font-medium rounded-lg"
                >
                  Create Ticket
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
