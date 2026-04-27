const phases = [
  {
    phase: 'Fase 01',
    title: 'Base del sistema',
    price: '$80.000',
    status: 'done',
    items: [
      'Setup del proyecto con React + TypeScript + Vite',
      'Configuración de Tailwind CSS y sistema de diseño dark',
      'Arquitectura de stores con Zustand + persistencia en localStorage',
      'Routing con React Router v7 (Landing / App real / Modo demo)',
      'Separación total de datos: demo nunca contamina datos reales',
      'Deploy en GitHub Pages con GitHub Actions',
    ],
  },
  {
    phase: 'Fase 02',
    title: 'Gestión de turnos',
    price: '$120.000',
    status: 'done',
    items: [
      'Calendario semanal navegable (semana anterior / siguiente)',
      'Grilla de horarios por franja de 30 minutos (08:00 a 20:00)',
      'Alta de turno con cliente, barbero, servicio y hora',
      'Estados de turno: Pendiente, Confirmado, Completado, Cancelado',
      'Modal de detalle con cambio de estado en un click',
      'Vista responsive adaptada a mobile',
    ],
  },
  {
    phase: 'Fase 03',
    title: 'Punto de venta (POS)',
    price: '$100.000',
    status: 'done',
    items: [
      'Catálogo de servicios y productos en grilla seleccionable',
      'Carrito de compras con control de cantidades',
      'Selección de barbero y cálculo automático de comisión',
      'Métodos de pago: Efectivo, Transferencia, Tarjeta',
      'Comprobante de venta con detalle por ítem y neto barbería',
      'Descuento de stock automático al registrar venta de producto',
    ],
  },
  {
    phase: 'Fase 04',
    title: 'Dashboard financiero',
    price: '$110.000',
    status: 'done',
    items: [
      'KPIs en tiempo real: ingresos brutos, netos, comisiones, ticket promedio',
      'Valor de inventario calculado desde stock actual',
      'Gráfico de área — ingresos últimos 30 días (bruto vs neto)',
      'Gráfico de barras — rendimiento por barbero en período seleccionado',
      'Gráfico de torta — distribución por método de pago',
      'Filtros por rango: Hoy, Esta semana, Este mes, Últimos 30 días',
      'Listado de últimas ventas con opción de eliminar',
    ],
  },
  {
    phase: 'Fase 05',
    title: 'Configuración del negocio',
    price: '$90.000',
    status: 'done',
    items: [
      'ABM de barberos: nombre, comisión (%) y duración de turno',
      'ABM de servicios: nombre y precio',
      'ABM de productos: nombre, precio, stock actual y stock mínimo',
      'Alertas visuales de stock bajo',
      'Edición inline sin modales — experiencia fluida',
      'Modo demo con datos de ejemplo precargados y aislados',
    ],
  },
  {
    phase: 'Fase 06',
    title: 'Backend + base de datos real',
    price: '$200.000',
    status: 'active',
    items: [
      'API REST con Node.js / Express o Next.js App Router',
      'Base de datos PostgreSQL con Prisma ORM',
      'Autenticación con JWT — login seguro por barbería',
      'Multi-tenant: cada barbería con sus propios datos en la nube',
      'Migración de localStorage a base de datos real',
      'Deploy en servidor (Railway / Render)',
    ],
  },
  {
    phase: 'Fase 07',
    title: 'Notificaciones & recordatorios',
    price: '$80.000',
    status: 'pending',
    items: [
      'Recordatorio de turno por WhatsApp (Twilio / Meta API)',
      'Confirmación automática al reservar',
      'Notificación al barbero asignado',
      'Panel de control de mensajes enviados',
    ],
  },
  {
    phase: 'Fase 08',
    title: 'App móvil (PWA / Android)',
    price: '$150.000',
    status: 'pending',
    items: [
      'Configuración PWA instalable desde el navegador',
      'Empaquetado Android con Capacitor.js',
      'Push notifications nativas',
      'Publicación en Google Play Store',
    ],
  },
]

const statusStyles = {
  done:    { dot: 'bg-white',              label: 'Completado',   text: 'text-white/50',  title: 'text-white',    desc: 'text-white/40'  },
  active:  { dot: 'bg-white animate-pulse', label: 'En progreso', text: 'text-white/70',  title: 'text-white',    desc: 'text-white/50'  },
  pending: { dot: 'bg-white/10',           label: 'Pendiente',    text: 'text-white/20',  title: 'text-white/25', desc: 'text-white/15'  },
}

export function Roadmap() {
  const totalDone    = phases.filter(p => p.status === 'done').reduce((s, p) => s + parsePesos(p.price), 0)
  const totalPending = phases.filter(p => p.status !== 'done').reduce((s, p) => s + parsePesos(p.price), 0)

  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Plan de trabajo</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Roadmap
        </h2>
        <p className="text-white/30 text-sm mb-12 max-w-lg">
          Cada fase es una entrega funcional y cobrable. El sistema crece incrementalmente sin interrumpir lo que ya funciona.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-16">
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Desarrollado</p>
            <p className="text-white font-black text-2xl tracking-tight">{fmt(totalDone)}</p>
            <p className="text-white/20 text-xs mt-1">5 fases entregadas</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Por cotizar</p>
            <p className="text-white/50 font-black text-2xl tracking-tight">{fmt(totalPending)}</p>
            <p className="text-white/20 text-xs mt-1">3 fases en roadmap</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

          <div className="space-y-10">
            {phases.map((p, i) => {
              const s = statusStyles[p.status as keyof typeof statusStyles]
              return (
                <div key={i} className="flex gap-8 relative">
                  {/* Dot */}
                  <div className="flex-shrink-0 mt-1.5">
                    <div className={`w-[15px] h-[15px] rounded-full border border-white/20 ${s.dot}`} />
                  </div>

                  {/* Content */}
                  <div className="pb-2 flex-1">
                    <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="text-white/20 text-xs font-mono tracking-widest">{p.phase}</span>
                        <span className={`text-[10px] tracking-widest uppercase ${s.text}`}>— {s.label}</span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${p.status === 'done' ? 'text-white/60' : p.status === 'active' ? 'text-white/50' : 'text-white/15'}`}>
                        {p.price}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold tracking-tight mb-3 ${s.title}`}>
                      {p.title}
                    </h3>

                    <ul className="space-y-1.5">
                      {p.items.map((item, j) => (
                        <li key={j} className={`flex items-start gap-2 text-sm ${s.desc}`}>
                          <span className="mt-[5px] w-1 h-1 rounded-full bg-current flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

function parsePesos(str: string) {
  return parseInt(str.replace(/\./g, '').replace('$', ''), 10)
}

function fmt(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}
