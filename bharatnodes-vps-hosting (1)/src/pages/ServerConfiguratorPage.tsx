import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ServerConfigurator from '../components/ServerConfigurator'

export default function ServerConfiguratorPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={16} />
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white">Server Configurator</span>
          </nav>
        </div>
      </header>

      {/* Server Configurator Component */}
      <ServerConfigurator />
    </div>
  )
}
