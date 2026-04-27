import { Calendar, ShoppingCart, BarChart3, Package, Users, Vault } from 'lucide-react'

const ITEMS = [
  {
    icon: Calendar,
    title: 'Turnos online',
    desc: 'Tus clientes reservan desde el celular en segundos. Vos ves el calendario organizado por barbero, día y horario.',
  },
  {
    icon: ShoppingCart,
    title: 'Punto de venta',
    desc: 'Cobrá servicios y productos desde una sola pantalla. El sistema calcula comisiones por barbero automáticamente.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard financiero',
    desc: 'Ingresos brutos, netos y comisiones en tiempo real. Filtrá por día, semana o mes con gráficos incluidos.',
  },
  {
    icon: Package,
    title: 'Control de inventario',
    desc: 'El stock se descuenta solo al vender. Alertas de bajo stock y valor total del inventario siempre visible.',
  },
  {
    icon: Users,
    title: 'Gestión de clientes',
    desc: 'Historial completo de visitas, teléfono y email de cada cliente. Buscalos en segundos.',
  },
  {
    icon: Vault,
    title: 'Cierre de caja',
    desc: 'Reporte imprimible por período. Desglose por barbero, método de pago y comisiones.',
  },
]

export function Features() {
  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 text-center">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Funcionalidades</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">
            Todo lo que<br />necesitás
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-black p-8 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center">
                <Icon size={18} className="text-white/50" />
              </div>
              <h3 className="text-white font-bold text-lg tracking-tight">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
