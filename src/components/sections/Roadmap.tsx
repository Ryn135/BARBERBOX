const phases = [
  {
    phase: 'Fase 01',
    title: 'Base del sistema',
    items: [
      'Setup con React + TypeScript + Vite + Tailwind CSS',
      'Arquitectura de stores con Zustand + persistencia en localStorage',
      'Routing con React Router (Landing / App real / Modo demo)',
      'Separación total de datos: demo nunca contamina datos reales',
      'Deploy en GitHub Pages con GitHub Actions',
    ],
  },
  {
    phase: 'Fase 02',
    title: 'Gestión de turnos',
    items: [
      'Calendario semanal navegable con grilla de horarios por franja de 30 min',
      'Alta de turno con cliente, barbero, servicio y hora',
      'Estados: Pendiente, Confirmado, Completado, Cancelado, Ausente',
      'Modal de detalle con cambio de estado en un click',
      'Duración de turno configurable por barbero',
    ],
  },
  {
    phase: 'Fase 03',
    title: 'Punto de venta (POS)',
    items: [
      'Catálogo de servicios y productos en grilla seleccionable',
      'Carrito con control de cantidades',
      'Selección de barbero y cálculo automático de comisión',
      'Métodos de pago: Efectivo, Transferencia, Tarjeta',
      'Comprobante de venta con detalle por ítem',
      'Descuento de stock automático al registrar venta de producto',
    ],
  },
  {
    phase: 'Fase 04',
    title: 'Dashboard financiero',
    items: [
      'KPIs: ingresos brutos, netos, comisiones, ticket promedio, valor inventario',
      'Gráfico de área — ingresos últimos 30 días (bruto vs neto)',
      'Gráfico de barras — rendimiento por barbero',
      'Gráfico de torta — distribución por método de pago',
      'Filtros por rango: Hoy, Semana, Mes, 30 días',
      'Listado de últimas ventas con opción de eliminar',
    ],
  },
  {
    phase: 'Fase 05',
    title: 'Configuración del negocio',
    items: [
      'ABM de barberos: nombre, comisión (%) y duración de turno',
      'ABM de servicios: nombre y precio',
      'ABM de productos: nombre, precio, stock y stock mínimo con alertas',
      'Edición inline sin modales',
      'Modo demo con datos de ejemplo precargados y aislados',
    ],
  },
  {
    phase: 'Fase 06',
    title: 'Cierre de caja diario',
    items: [
      'Resumen del día: ventas totales, comisiones y neto por barbero',
      'Desglose por método de pago (Efectivo, Transferencia, Tarjeta)',
      'Navegación entre fechas para ver cierres anteriores',
      'Exportación a Excel (.xlsx) con un click',
      'Vista de impresión optimizada',
    ],
  },
  {
    phase: 'Fase 07',
    title: 'Gestión de clientes (CRM)',
    items: [
      'Listado de clientes con búsqueda en tiempo real',
      'Perfil de cliente: historial de turnos y compras',
      'Acceso directo a WhatsApp del cliente',
      'Estado de cada turno en el perfil',
      'Exportación del listado completo a Excel',
      'Paginación para bases de datos grandes',
    ],
  },
  {
    phase: 'Fase 08',
    title: 'Sistema de autenticación',
    items: [
      'Login con usuario y contraseña',
      'Autenticación JWT conectada a backend',
      'Roles diferenciados (admin / barbero)',
      'Rutas protegidas — sin acceso sin login',
      'Logout y manejo de sesión',
    ],
  },
  {
    phase: 'Fase 09',
    title: 'Temas y personalización visual',
    items: [
      'Modo claro / oscuro con toggle en tiempo real',
      'Colores de acento: Neutro, Dorado, Violeta, Azul, Esmeralda, Rojo',
      'Persistencia de preferencias por usuario',
      'Aplicación del acento en toda la interfaz via CSS variables',
      'Previsualización del color antes de confirmar',
    ],
  },
  {
    phase: 'Fase 10',
    title: 'Web de reservas para clientes',
    items: [
      'Landing pública de la barbería para que los clientes reserven solos',
      'Flujo paso a paso: barbero → servicio → fecha → datos personales',
      'Slots disponibles generados según horario y breaks del barbero',
      'Días bloqueados configurables (feriados, vacaciones)',
      'Captcha Cloudflare Turnstile para evitar spam',
      'Pantalla de confirmación con resumen del turno',
      'Páginas: "Mis turnos" y "Cancelar turno" para el cliente',
    ],
  },
  {
    phase: 'Fase 11',
    title: 'Preview & simulador de dispositivos',
    items: [
      'Pantalla de preview con simulador de iPhone y Android',
      'Cambio entre dispositivos (iPhone 14, iPhone SE, Galaxy S23)',
      'Vista previa de todas las pantallas del sistema dentro del frame',
      'Toggle entre vista mobile y desktop',
    ],
  },
  {
    phase: 'Fase 12',
    title: 'Backend + base de datos real',
    items: [
      'API REST con Node.js / Express',
      'Base de datos PostgreSQL con Prisma ORM',
      'Multi-tenant: cada barbería con sus datos en la nube',
      'Migración de localStorage a base de datos real',
      'Variables de entorno y deploy en servidor (Railway / Render)',
    ],
  },
  {
    phase: 'Fase 13',
    title: 'Notificaciones por WhatsApp',
    items: [
      'Recordatorio automático de turno por WhatsApp (Twilio / Meta API)',
      'Confirmación al cliente al momento de reservar',
      'Notificación al barbero asignado',
      'Panel de historial de mensajes enviados',
    ],
  },
  {
    phase: 'Fase 14',
    title: 'App móvil (PWA / Android)',
    items: [
      'Configuración PWA instalable desde el navegador',
      'Empaquetado Android con Capacitor.js',
      'Push notifications nativas',
      'Publicación en Google Play Store',
    ],
  },
]

export function Roadmap() {
  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Plan de trabajo</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          Roadmap
        </h2>
        <p className="text-white/30 text-sm mb-12 max-w-lg">
          Cada fase es una entrega funcional e independiente. El sistema crece incrementalmente sin interrumpir lo que ya funciona.
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-16">
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Total de fases</p>
            <p className="text-white font-black text-3xl tracking-tight">{phases.length}</p>
            <p className="text-white/20 text-xs mt-1">entregas planificadas</p>
          </div>
          <div className="border border-white/10 rounded-lg p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Estado</p>
            <p className="text-white/40 font-black text-3xl tracking-tight">Por definir</p>
            <p className="text-white/20 text-xs mt-1">según acuerdo</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

          <div className="space-y-10">
            {phases.map((p, i) => (
              <div key={i} className="flex gap-8 relative">
                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-[15px] h-[15px] rounded-full border border-white/20 bg-white/10" />
                </div>

                <div className="pb-2 flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-white/20 text-xs font-mono tracking-widest">{p.phase}</span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight mb-3 text-white/25">
                    {p.title}
                  </h3>

                  <ul className="space-y-1.5">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/15">
                        <span className="mt-[5px] w-1 h-1 rounded-full bg-current flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
