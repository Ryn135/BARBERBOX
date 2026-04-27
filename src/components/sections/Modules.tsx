import { Calendar, Package, BarChart3, ShoppingCart } from 'lucide-react'

const modules = [
  {
    icon: Calendar,
    title: 'Gestión de Turnos',
    tag: '01',
    description:
      'Calendario interactivo con Drag & Drop. Validación de colisiones de horarios y sincronización en tiempo real vía WebSockets.',
    features: [
      'Drag & Drop de reservas',
      'Validación de colisiones',
      'Sincronización en tiempo real',
      'Vista diaria / semanal / mensual',
    ],
  },
  {
    icon: Package,
    title: 'Inventario & Stock',
    tag: '02',
    description:
      'Panel de control con indicadores visuales de bajo stock. Registro de entrada de mercadería y trazabilidad completa de ventas.',
    features: [
      'Alertas de stock mínimo',
      'Registro de entradas',
      'Trazabilidad de ventas',
      'Historial de movimientos',
    ],
  },
  {
    icon: BarChart3,
    title: 'Dashboard Financiero',
    tag: '03',
    description:
      'Filtros de tiempo: Hoy, Esta Semana, Este Mes. Cálculo automático de ingresos brutos vs netos restando comisiones de barberos.',
    features: [
      'Ingresos brutos vs netos',
      'Comisiones automáticas',
      'Gráficos de rendimiento',
      'Filtros por período',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Punto de Venta (POS)',
    tag: '04',
    description:
      'Interfaz rápida para seleccionar servicios y productos. Generación de ticket digital y cierre de caja diario automatizado.',
    features: [
      'Selección rápida de servicios',
      'Tickets digitales',
      'Cierre de caja diario',
      'Descuento automático de stock',
    ],
  },
]

export function Modules() {
  return (
    <section className="bg-black py-24 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Módulos del sistema</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Todo en un solo lugar
        </h2>
        <div className="mt-4 h-[1px] w-16 bg-white/20" />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <div
              key={mod.tag}
              className="bg-black p-10 group hover:bg-white/[0.03] transition-colors duration-300"
            >
              {/* Tag + Icon */}
              <div className="flex items-start justify-between mb-8">
                <span className="text-white/20 text-xs tracking-[0.3em] font-mono">{mod.tag}</span>
                <Icon
                  className="text-white/20 group-hover:text-white/50 transition-colors duration-300"
                  size={28}
                  strokeWidth={1}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                {mod.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {mod.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {mod.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/30 text-xs">
                    <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
