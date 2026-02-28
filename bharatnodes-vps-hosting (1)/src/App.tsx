/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import SEO from './components/SEO'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import { StarryBackground } from './components/StarryBackground'
import { GoogleGeminiEffectDemo } from './components/GoogleGeminiEffectDemo'
import Stats from './components/Stats'
import Features from './components/Features'
import Locations from './components/Locations'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import ServerConfigurator from './components/ServerConfigurator'
import LiveChat from './components/LiveChat'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Support from './pages/Support'
import About from './pages/About'
import Contact from './pages/Contact'
import KnowledgeBase from './pages/KnowledgeBase'
import ServerConfiguratorPage from './pages/ServerConfiguratorPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import SLA from './pages/SLA'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import SignIn from './pages/SignIn'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  return !user ? <>{children}</> : <Navigate to="/dashboard" />
}

function LandingPage() {
  return (
    <>
      <GoogleGeminiEffectDemo />
      <Stats />
      <Features />
      <Locations />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <AuthProvider>
            <div className="min-h-screen">
              <SEO />
              <StarryBackground />
              <Navbar />
              <Routes>
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/support" element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/server-configurator" element={<ServerConfiguratorPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/sla" element={<SLA />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/customer/dashboard" element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/" element={
                  <PublicRoute>
                    <main>
                      <LandingPage />
                    </main>
                  </PublicRoute>
                } />
              </Routes>
              <Toaster position="top-right" />
              <LiveChat />
            </div>
          </AuthProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
