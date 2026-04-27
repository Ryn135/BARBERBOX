import { NavLink, Outlet, Link } from 'react-router-dom'
import { Calendar, BarChart3, ShoppingCart, Scissors, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/demo/turnos',    label: 'Turnos',   icon: Calendar },
  { to: '/demo/dashboard', label: 'Finanzas', icon: BarChart3 },
  { to: '/demo/pos',       label: 'POS',      icon: ShoppingCart },
]

export function DemoShell() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className="w-16 md:w-56 flex-shrink-0 border-r border-white/10 flex flex-col">
        <div className="h-14 flex items-center px-4 border-b border-white/10 gap-3">
          <Scissors size={16} className="text-white/60 flex-shrink-0" />
          <div className="hidden md:flex flex-col min-w-0">
            <span className="text-sm font-black tracking-tighter uppercase leading-none">FUTURES</span>
            <span className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">Demo</span>
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn('flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors',
                  isActive ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white hover:bg-white/5'
                )
              }
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="hidden md:block">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/app" className="flex items-center gap-2 text-white/30 hover:text-white text-xs transition-colors">
            <ArrowLeft size={12} />
            <span className="hidden md:block">Salir del demo</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="h-8 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-center">
          <span className="text-yellow-400/70 text-[10px] tracking-widest uppercase font-mono">
            Modo demo — datos de ejemplo, no afectan la app real
          </span>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
