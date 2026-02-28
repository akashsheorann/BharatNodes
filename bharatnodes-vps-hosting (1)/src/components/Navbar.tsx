import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  const isLandingPage = location.pathname === '/';

  const navItems = [
    { 
      name: 'Services', 
      dropdown: [
        { name: 'VPS Hosting', href: '#features' },
        { name: 'Global Locations', href: '#locations' },
        { name: 'Server Configurator', href: '/server-configurator' },
        ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : [])
      ]
    },
    { 
      name: 'Products', 
      dropdown: [
        { name: 'Starter VPS', href: '/server-configurator', desc: 'Perfect for small projects' },
        { name: 'Business VPS', href: '/server-configurator', desc: 'High-performance servers' },
        { name: 'Enterprise VPS', href: '/server-configurator', desc: 'Dedicated resources' },
        { name: 'Managed Hosting', href: '/server-configurator', desc: 'Expert support included' }
      ]
    },
    { 
      name: 'Resources', 
      dropdown: [
        { name: 'Knowledge Base', href: '/knowledge-base' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        ...(user ? [{ name: 'Support', href: '/support' }] : [])
      ]
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Server size={24} className="text-white" />
              <span className="text-xl font-medium text-white">BharatNodes</span>
            </Link>

            {/* Desktop Navigation */}
            {isLandingPage && (
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="text-white/80 hover:text-white transition-colors text-sm">
                      {item.name}
                    </button>
                    
                    {/* Animated Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 min-w-[200px] bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl"
                        >
                          <div className="p-4">
                            {item.dropdown.map((subItem, index) => (
                              <motion.div
                                key={subItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={subItem.href}
                                  className="block py-2 text-sm text-white/70 hover:text-white transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {subItem.name}
                                  {subItem.desc && (
                                    <span className="block text-xs text-white/50 mt-1">
                                      {subItem.desc}
                                    </span>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigate('/support')}
                    className="text-xs uppercase tracking-widest font-bold border-b border-white pb-1"
                  >
                    Support
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 bg-white text-black text-xs uppercase tracking-widest font-medium rounded-full hover:opacity-80 transition-opacity"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md md:hidden"
          >
            <div className="container mx-auto px-6 py-20">
              <div className="flex flex-col gap-8">
                {isLandingPage && navItems.map((item) => (
                  <div key={item.name}>
                    <div className="text-lg font-medium text-white mb-4">
                      {item.name}
                    </div>
                    <div className="flex flex-col gap-3 ml-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                {user ? (
                  <>
                    <button 
                      onClick={() => {
                        navigate('/dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 border border-white/20 text-white font-bold rounded-xl"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/support');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 bg-white text-black font-bold rounded-xl"
                    >
                      Support
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 border border-white/20 text-white font-bold rounded-xl"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 bg-white text-black font-bold rounded-xl"
                    >
                      Register
                    </button>
                  </>
                )}
                
                <button 
                  onClick={() => {
                    navigate('/server-configurator');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl"
                >
                  Configure Server
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
