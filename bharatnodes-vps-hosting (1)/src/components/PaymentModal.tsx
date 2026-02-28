import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: string
    features: string[]
  }
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue')
      return
    }

    setLoading(true)
    try {
      if (paymentMethod === 'card') {
        // Stripe payment logic here
        toast.success('Redirecting to payment gateway...')
        // const { error } = await stripe.redirectToCheckout({ sessionId })
        // if (error) throw error
      } else {
        // Razorpay UPI payment logic here
        toast.success('Initiating UPI payment...')
        // const options = { ... }
        // const razorpay = new Razorpay(options)
        // razorpay.open()
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Complete Payment</h2>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">{plan.name}</h3>
              <div className="text-3xl font-light mb-4">
                {plan.price}<span className="text-sm text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-zinc-400">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-4">Payment Method</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === 'card'
                      ? 'border-white bg-white/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <CreditCard size={20} className="mx-auto mb-2" />
                  <div className="text-sm">Card</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border rounded-lg transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-white bg-white/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <Smartphone size={20} className="mx-auto mb-2" />
                  <div className="text-sm">UPI</div>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3 bg-white text-black font-medium rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ${plan.price}`}
            </motion.button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              Secure payment powered by {paymentMethod === 'card' ? 'Stripe' : 'Razorpay'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
