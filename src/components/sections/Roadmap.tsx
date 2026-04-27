const phases = [
  {
    phase: 'Fase 01',
    title: 'Setup & Base',
    description: 'Monorepo, configuración de TypeScript, Tailwind CSS y esquema inicial de Prisma.',
    status: 'done',
  },
  {
    phase: 'Fase 02',
    title: 'Auth & CRUD',
    description: 'Backend con autenticación JWT y CRUD básico de productos y servicios.',
    status: 'active',
  },
  {
    phase: 'Fase 03',
    title: 'Calendario',
    description: 'UI de calendario interactivo con Drag & Drop y lógica completa de reservas.',
    status: 'pending',
  },
  {
    phase: 'Fase 04',
    title: 'Ventas & Reportes',
    description: 'Módulo POS, registro de ventas, reportes financieros y comisiones automáticas.',
    status: 'pending',
  },
  {
    phase: 'Fase 05',
    title: 'Mobile & PWA',
    description: 'Integración con Capacitor.js para Android/iOS y optimización PWA.',
    status: 'pending',
  },
]

const statusStyles = {
  done: { dot: 'bg-white', line: 'bg-white', label: 'Completado', text: 'text-white' },
  active: { dot: 'bg-white animate-pulse', line: 'bg-white/40', label: 'En progreso', text: 'text-white/60' },
  pending: { dot: 'bg-white/15', line: 'bg-white/10', label: 'Pendiente', text: 'text-white/25' },
}

export function Roadmap() {
  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Plan de trabajo</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-16">
          Roadmap
        </h2>

        <div className="relative">
          {/* Vertical line */}
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
                  <div className="pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white/20 text-xs font-mono tracking-widest">{p.phase}</span>
                      <span className={`text-[10px] tracking-widest uppercase ${s.text}`}>
                        — {s.label}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold tracking-tight mb-2 ${p.status === 'pending' ? 'text-white/30' : 'text-white'}`}>
                      {p.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${p.status === 'pending' ? 'text-white/20' : 'text-white/40'}`}>
                      {p.description}
                    </p>
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
