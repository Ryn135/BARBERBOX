import { useEffect, useMemo, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts'
import {
  format, subDays, startOfDay, endOfDay,
  startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { TrendingUp, DollarSign, Scissors, ShoppingCart, Settings, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSalesStore } from '@/store/salesStore'
import { useConfigStore } from '@/store/configStore'
import { cn } from '@/lib/utils'

type Range = 'today' | 'week' | 'month' | '30d'

const RANGE_LABELS: Record<Range, string> = {
  today: 'Hoy',
  week:  'Esta semana',
  month: 'Este mes',
  '30d': 'Últimos 30 días',
}

function getRangeDates(range: Range): [Date, Date] {
  const now = new Date()
  switch (range) {
    case 'today': return [startOfDay(now), endOfDay(now)]
    case 'week':  return [startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 })]
    case 'month': return [startOfMonth(now), endOfMonth(now)]
    case '30d':   return [startOfDay(subDays(now, 29)), endOfDay(now)]
  }
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export function DashboardPage() {
  const { sales, load, removeSale } = useSalesStore()
  const { barbers, products } = useConfigStore()
  const [range, setRange] = useState<Range>('30d')

  useEffect(() => { load() }, [load])

  // All hooks must run unconditionally — before any early return
  const [from, to] = getRangeDates(range)

  const filtered = useMemo(
    () => sales.filter((s) => { const d = new Date(s.date); return d >= from && d <= to }),
    [sales, from, to]
  )

  const totals = useMemo(() => ({
    gross:      filtered.reduce((s, x) => s + x.subtotal, 0),
    net:        filtered.reduce((s, x) => s + x.net, 0),
    commission: filtered.reduce((s, x) => s + x.commission, 0),
    count:      filtered.length,
  }), [filtered])

  const revenueByDay = useMemo(() => {
    const days = eachDayOfInterval({ start: subDays(new Date(), 29), end: new Date() })
    return days.map((d) => {
      const dayStr = format(d, 'yyyy-MM-dd')
      const daySales = sales.filter((s) => format(new Date(s.date), 'yyyy-MM-dd') === dayStr)
      return {
        day:   format(d, 'dd/MM', { locale: es }),
        bruto: daySales.reduce((s, x) => s + x.subtotal, 0),
        neto:  daySales.reduce((s, x) => s + x.net, 0),
      }
    })
  }, [sales])

  const byBarber = useMemo(() =>
    barbers.map((b) => {
      const bs = filtered.filter((s) => s.barberId === b.id)
      return { name: b.name.split(' ')[0], bruto: bs.reduce((s, x) => s + x.subtotal, 0), cortes: bs.length }
    }),
    [filtered, barbers]
  )

  const byMethod = useMemo(() => {
    const map: Record<string, number> = {}
    filtered.forEach((s) => { map[s.method] = (map[s.method] ?? 0) + s.subtotal })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [filtered])

  const valorInventario = products.reduce((s, p) => s + p.price * p.stock, 0)

  // Empty state — no sales yet (after all hooks)
  if (sales.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-4">
          <DollarSign size={20} className="text-white/20" />
        </div>
        <p className="text-white font-semibold mb-1">Sin ventas registradas</p>
        <p className="text-white/30 text-sm mb-6 max-w-xs">
          Las métricas aparecerán aquí una vez que registres ventas desde el POS.
        </p>
        <div className="flex gap-3">
          <Link to="/app/pos" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 transition-colors">
            Ir al POS
          </Link>
          {barbers.length === 0 && (
            <Link to="/app/settings" className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/50 text-sm rounded hover:border-white/30 transition-colors">
              <Settings size={14} /> Configurar
            </Link>
          )}
        </div>
      </div>
    )
  }

  const PIE_COLORS = ['#ffffff', '#737373', '#404040']

  const cards = [
    { label: 'Ingresos brutos',   value: fmt(totals.gross),        icon: DollarSign, sub: `${totals.count} ventas` },
    { label: 'Ingresos netos',    value: fmt(totals.net),          icon: TrendingUp, sub: 'Descontando comisiones' },
    { label: 'Comisiones',        value: fmt(totals.commission),   icon: Scissors,   sub: 'A repartir entre barberos' },
    { label: 'Ticket promedio',   value: totals.count ? fmt(totals.gross / totals.count) : '$0', icon: ShoppingCart, sub: 'Por venta' },
    { label: 'Valor inventario',  value: fmt(valorInventario),     icon: ShoppingCart, sub: `${products.length} productos en stock` },
  ]

  return (
    <div className="p-6 space-y-6 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight">Dashboard Financiero</h1>
          <p className="text-white/30 text-sm mt-0.5">FUTURES Barber Studio</p>
        </div>
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded p-1">
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn('px-3 py-1.5 text-xs rounded transition-colors', range === r ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white')}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/30 text-xs uppercase tracking-widest">{label}</span>
              <Icon size={16} className="text-white/20" />
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
            <p className="text-white/25 text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Ingresos — últimos 30 días</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueByDay} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gBruto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ffffff" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gNeto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#737373" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#737373" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: '#525252', fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fill: '#525252', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }}
              labelStyle={{ color: '#737373', fontSize: 11 }}
              itemStyle={{ color: '#fff', fontSize: 12 }}
              formatter={(v) => fmt(Number(v))}
            />
            <Area type="monotone" dataKey="bruto" stroke="#ffffff" strokeWidth={1.5} fill="url(#gBruto)" name="Bruto" />
            <Area type="monotone" dataKey="neto"  stroke="#737373" strokeWidth={1.5} fill="url(#gNeto)"  name="Neto" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Rendimiento por barbero</p>
          {byBarber.every((b) => b.bruto === 0) ? (
            <p className="text-white/20 text-sm py-6 text-center">Sin ventas en este período</p>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={byBarber} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#525252', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#525252', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6 }} itemStyle={{ color: '#fff', fontSize: 12 }} formatter={(v) => fmt(Number(v))} />
                <Bar dataKey="bruto" fill="#ffffff" radius={[3, 3, 0, 0]} name="Bruto" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Métodos de pago</p>
          {byMethod.length === 0 ? (
            <p className="text-white/20 text-sm py-6 text-center">Sin ventas en este período</p>
          ) : (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={byMethod} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                    {byMethod.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex-1">
                {byMethod.map(({ name, value }, i) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-white/50 text-sm">{name === 'CASH' ? 'Efectivo' : name === 'TRANSFER' ? 'Transferencia' : 'Tarjeta'}</span>
                    </div>
                    <span className="text-white text-sm font-semibold">{fmt(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent sales */}
      <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02]">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Últimas ventas</p>
        {filtered.length === 0 ? (
          <p className="text-white/20 text-sm py-3 text-center">Sin ventas en este período</p>
        ) : (
          <div className="space-y-1">
            {[...filtered].reverse().slice(0, 8).map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0 text-sm gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white/70">{s.barberName}</p>
                  <p className="text-white/30 text-xs truncate">{s.items.map((i) => i.name).join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{fmt(s.subtotal)}</p>
                  <p className="text-white/20 text-xs">{s.method === 'CASH' ? 'Efectivo' : s.method === 'TRANSFER' ? 'Transfer' : 'Tarjeta'}</p>
                </div>
                <button
                  onClick={() => removeSale(s.id)}
                  className="w-7 h-7 flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors flex-shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
