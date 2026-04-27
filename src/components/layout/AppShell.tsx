import { NavLink, Outlet, Link } from 'react-router-dom'
import { Calendar, BarChart3, ShoppingCart, Scissors, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/app/turnos',    label: 'Turnos',       icon: Calendar },
  { to: '/app/dashboard', label: 'Finanzas',      icon: BarChart3 },
  { to: '/app/pos',       label: 'POS',           icon: ShoppingCart },
  { to: '/app/settings',  label: 'Configuración', icon: Settings },
]

export function AppShell() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <aside className="w-16 md:w-56 flex-shrink-0 border-r border-white/10 flex flex-col">
        <Link to="/" className="h-14 flex items-center px-4 border-b border-white/10 gap-3 hover:bg-white/5 transition-colors">
          <Scissors size={16} className="text-white/60 flex-shrink-0" />
          <span className="hidden md:block text-sm font-black tracking-tighter uppercase">FUTURES</span>
        </Link>

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
          <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase hidden md:block">v0.1.0 — demo</p>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative bg-black">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 79px, rgba(255,255,255,0.05) 79px, rgba(255,255,255,0.05) 80px)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 79px, rgba(255,255,255,0.025) 79px, rgba(255,255,255,0.025) 80px)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 85% 0%, rgba(255,255,255,0.09) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
