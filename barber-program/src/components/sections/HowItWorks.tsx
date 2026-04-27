const WA = 'https://wa.me/541139337326'

const STEPS = [
  {
    n: '01',
    title: 'Nos contactás',
    desc: 'Mandás un WhatsApp. Te contamos cómo funciona, sin compromiso.',
  },
  {
    n: '02',
    title: 'Configuramos todo',
    desc: 'Cargamos tus barberos, servicios y horarios. El sistema queda listo en el día.',
  },
  {
    n: '03',
    title: 'Empezás a usarlo',
    desc: 'Tu URL de reservas, tu panel. Desde el primer día con control total.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-16 text-center">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Simple y rápido</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mt-3">
            Cómo funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-white/10">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="bg-black p-8 md:p-10 flex flex-col gap-4 border border-white/10 md:border-0 rounded-lg md:rounded-none mb-4 md:mb-0">
              <span className="text-white/15 font-black text-5xl leading-none">{n}</span>
              <h3 className="text-white font-black text-xl tracking-tight">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors"
          >
            Empezar ahora →
          </a>
        </div>
      </div>
    </section>
  )
}
