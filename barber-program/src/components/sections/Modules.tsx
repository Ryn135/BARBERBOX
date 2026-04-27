const MODULES = [
  {
    tag: 'Web pública',
    title: 'Página de reservas',
    items: [
      'URL propia de tu barbería',
      'Selector de barbero y servicio',
      'Calendario de disponibilidad en tiempo real',
      'Confirmación con datos del cliente',
      'Cancelación de turnos por link',
    ],
  },
  {
    tag: 'Panel administrativo',
    title: 'Control total',
    items: [
      'Calendario semanal por barbero',
      'Registro manual de turnos',
      'Cambio de estado (pendiente / confirmado / completado)',
      'Registro de cobro con método de pago',
      'Bloqueo de días por barbero',
    ],
  },
  {
    tag: 'Punto de venta',
    title: 'Cobros rápidos',
    items: [
      'Carrito con servicios y productos',
      'Cálculo de comisión automático',
      'Efectivo, transferencia o tarjeta',
      'Ticket de venta',
      'Descuento de stock automático',
    ],
  },
  {
    tag: 'Finanzas',
    title: 'Números claros',
    items: [
      'Dashboard con gráficos de ingresos',
      'Resumen por barbero',
      'Filtro por día, semana o mes',
      'Reporte de cierre de caja imprimible',
      'Historial completo de ventas',
    ],
  },
]

export function Modules() {
  return (
    <section id="modulos" className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 text-center">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Qué incluye</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">
            Módulos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES.map(({ tag, title, items }) => (
            <div key={title} className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">{tag}</span>
              <h3 className="text-white font-black text-xl uppercase tracking-tight mt-2 mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                    <span className="text-white/30 mt-0.5 flex-shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
