const WA = 'https://wa.me/541139337326'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(90deg,transparent 0,transparent 79px,rgba(255,255,255,.05) 79px,rgba(255,255,255,.05) 80px)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg,transparent 0,transparent 79px,rgba(255,255,255,.025) 79px,rgba(255,255,255,.025) 80px)',
      }} />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,.12) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 50%, #000 100%)',
      }} />

      {/* Orbit star */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <span className="animate-orbit absolute text-5xl select-none">✦</span>
      </div>

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 h-16 z-10">
        <span className="font-black tracking-tighter uppercase text-sm">BarberSystem</span>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white border border-white/15 px-4 py-2 rounded hover:border-white/40 transition-colors"
        >
          Contactar
        </a>
      </nav>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <span className="inline-block border border-white/20 text-white/50 text-xs tracking-[0.35em] uppercase px-4 py-1.5 rounded-full mb-8">
          Software para barberías
        </span>

        <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter uppercase mb-6">
          Tu barbería,<br />sin caos.
        </h1>

        <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Turnos online, cobros, comisiones, inventario y finanzas.<br className="hidden md:block" />
          Todo en una sola plataforma.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors"
          >
            Quiero mi sistema →
          </a>
          <a
            href="#modulos"
            className="px-8 py-4 border border-white/20 text-white/60 font-semibold text-sm tracking-widest uppercase hover:border-white/50 hover:text-white transition-colors"
          >
            Ver módulos
          </a>
        </div>

        <p className="text-white/20 text-xs mt-8 tracking-widest">Sin contrato. Instalación incluida.</p>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
