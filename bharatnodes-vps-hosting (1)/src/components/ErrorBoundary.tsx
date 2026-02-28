import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    
    // Here you would typically send the error to a logging service
    // logErrorToService(error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            
            <h1 className="text-2xl font-light mb-4">Something went wrong</h1>
            
            <p className="text-zinc-500 mb-8">
              We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
            </p>
            
            {this.state.error && (
              <details className="mb-8 text-left">
                <summary className="text-sm text-zinc-600 cursor-pointer hover:text-white transition-colors">
                  Error details
                </summary>
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <code className="text-xs text-red-400 break-all">
                    {this.state.error.toString()}
                  </code>
                </div>
              </details>
            )}
            
            <div className="space-y-4">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:opacity-80 transition-opacity"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Go Home
              </button>
            </div>
            
            <div className="mt-8 text-xs text-zinc-600">
              If the problem persists, please contact our support team at{' '}
              <a href="mailto:support@bharatnodes.com" className="text-blue-400 hover:underline">
                support@bharatnodes.com
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
