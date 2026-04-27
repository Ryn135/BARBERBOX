import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props { children: ReactNode; fallbackPath?: string }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => {
    this.setState({ error: null })
    window.location.href = this.props.fallbackPath ?? '/'
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-12 h-12 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={20} className="text-red-400/60" />
        </div>
        <p className="text-white font-semibold mb-1">Algo salió mal</p>
        <p className="text-white/30 text-sm mb-2 max-w-xs">
          {this.state.error.message}
        </p>
        <p className="text-white/15 text-xs font-mono mb-6 max-w-sm break-all">
          {this.state.error.stack?.split('\n')[1]?.trim()}
        </p>
        <button
          onClick={this.reset}
          className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    )
  }
}
