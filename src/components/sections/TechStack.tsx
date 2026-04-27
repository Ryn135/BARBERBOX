const stack = [
  { label: 'Frontend', items: ['React.js', 'Vite', 'TypeScript'] },
  { label: 'Estilos', items: ['Tailwind CSS', 'PostCSS', 'shadcn/ui'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'TypeScript'] },
  { label: 'Base de datos', items: ['PostgreSQL', 'Prisma ORM'] },
  { label: 'Estado', items: ['Zustand', 'Redux Toolkit'] },
  { label: 'Multiplataforma', items: ['Capacitor.js', 'PWA', 'Android / iOS'] },
]

const schema = [
  { model: 'User', fields: ['id', 'email', 'name', 'role (ADMIN|BARBER)'] },
  { model: 'Barber', fields: ['userId', 'commissionRate (50%)'] },
  { model: 'Client', fields: ['id', 'name', 'phone'] },
  { model: 'Appointment', fields: ['date', 'status', 'barberId', 'clientId'] },
  { model: 'Product', fields: ['name', 'price', 'stock', 'minStock', 'isService'] },
  { model: 'Sale', fields: ['total', 'method', 'sellerId', 'items[]'] },
]

export function TechStack() {
  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Stack */}
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Stack tecnológico</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-16">
          Construido con
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 mb-24">
          {stack.map((s) => (
            <div key={s.label} className="bg-black p-8">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">{s.label}</p>
              <ul className="space-y-1.5">
                {s.items.map((item) => (
                  <li key={item} className="text-white font-medium text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Schema */}
        <div className="border-t border-white/10 pt-16">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-4">Modelos de datos</p>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-10">
            Schema Prisma
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {schema.map((s) => (
              <div key={s.model} className="border border-white/10 p-5 hover:border-white/25 transition-colors">
                <p className="text-white font-bold text-sm mb-3 font-mono">{s.model}</p>
                <ul className="space-y-1">
                  {s.fields.map((f) => (
                    <li key={f} className="text-white/30 text-xs font-mono">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
