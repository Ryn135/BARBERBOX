import { useNavigate } from 'react-router-dom'
import { Waves } from '@/components/ui/wave-background'

export function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Waves
        strokeColor="#ffffff"
        backgroundColor="#000000"
        pointerSize={0.5}
      />

      {/* Overlay gradient bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        {/* Badge */}
        <span className="mb-6 inline-block border border-white/20 text-white/60 text-xs tracking-[0.3em] uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
          Management System
        </span>

        {/* Title */}
        <h1 className="text-[clamp(1.5rem,5vw,5rem)] font-black leading-none tracking-tighter text-white uppercase">
          AQUI EL NOMBRE DE TU BARBERIA
        </h1>
        <p className="text-[clamp(0.9rem,2vw,1.4rem)] font-light tracking-[0.5em] text-white/50 uppercase mt-2">
          Barber Studio
        </p>

        {/* Subtitle */}
        <p className="mt-8 max-w-lg text-white/40 text-sm leading-relaxed font-light">
          Control total de turnos, inventario, finanzas y personal
          en una sola plataforma multiplataforma.
        </p>

        {/* CTA */}
        <div className="mt-10 flex gap-4 pointer-events-auto">
          <button
            onClick={() => navigate('/app')}
            className="px-6 py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-white/90 transition-colors"
          >
            Ingresar
          </button>
          <button
            onClick={() => navigate('/demo')}
            className="px-6 py-3 border border-white/30 text-white text-sm font-semibold tracking-widest uppercase hover:border-white/60 transition-colors"
          >
            Ver Demo
          </button>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-20" />
    </section>
  )
}
