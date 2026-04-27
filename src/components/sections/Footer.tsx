export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white font-black text-lg tracking-tighter uppercase">AQUI EL NOMBRE DE TU BARBERIA</p>
          <p className="text-white/30 text-xs tracking-widest uppercase">Barber Studio</p>
        </div>
        <div className="flex gap-8 text-white/20 text-xs tracking-widest uppercase">
          <span>Turnos</span>
          <span>Inventario</span>
          <span>Finanzas</span>
          <span>POS</span>
        </div>
        <p className="text-white/20 text-xs font-mono">
          v0.1.0 — React + Vite + TypeScript
        </p>
      </div>
    </footer>
  )
}
