import { useEffect, useState } from 'react'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Plus, X, Check, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppointmentStore } from '@/store/appointmentStore'

const TIME_SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
]
import { useConfigStore } from '@/store/configStore'
import type { Appointment, AppointmentStatus } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING:   'Pendiente',
  CONFIRMED: 'Confirmado',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
}

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  PENDING:   'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  CONFIRMED: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  COMPLETED: 'bg-green-500/20 text-green-300 border-green-500/30',
  CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export function TurnosPage() {
  const { appointments, load, book, update } = useAppointmentStore()
  const { barbers, services } = useConfigStore()

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  )
  const [modal, setModal] = useState<{ date: string; time: string } | null>(null)
  const [detail, setDetail] = useState<Appointment | null>(null)
  const [form, setForm] = useState({ clientName: '', clientPhone: '', barberId: '', serviceId: '' })

  useEffect(() => { load() }, [load])
  useEffect(() => {
    if (barbers.length)  setForm((f) => ({ ...f, barberId:  f.barberId  || barbers[0].id }))
    if (services.length) setForm((f) => ({ ...f, serviceId: f.serviceId || services[0].id }))
  }, [barbers, services])

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getAppt = (dateStr: string, time: string) =>
    appointments.find(
      (a) => a.date === dateStr && a.startTime === time && a.status !== 'CANCELLED'
    )

  const handleBook = async () => {
    if (!modal || !form.clientName || !form.barberId || !form.serviceId) return
    const service = services.find((s) => s.id === form.serviceId)!
    const barber  = barbers.find((b) => b.id === form.barberId)!
    const [h, m] = modal.time.split(':').map(Number)
    const slotMin = barber.slotDuration ?? 40
    const totalMin = h * 60 + m + slotMin
    const endTime = `${String(Math.floor(totalMin / 60)).padStart(2, '0')}:${String(totalMin % 60).padStart(2, '0')}`

    await book({
      date:        modal.date,
      startTime:   modal.time,
      endTime,
      barberId:    barber.id,
      clientName:  form.clientName,
      clientPhone: form.clientPhone,
      serviceName: service.name,
      price:       service.price,
      status:      'CONFIRMED',
    })
    setModal(null)
    setForm((f) => ({ ...f, clientName: '', clientPhone: '' }))
  }

  // Empty state: no barbers or no services configured
  if (barbers.length === 0 || services.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-4">
          <Settings size={20} className="text-white/20" />
        </div>
        <p className="text-white font-semibold mb-1">Configuración requerida</p>
        <p className="text-white/30 text-sm mb-6 max-w-xs">
          Antes de cargar turnos necesitás agregar al menos un barbero y un servicio.
        </p>
        <Link
          to="/app/settings"
          className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 transition-colors"
        >
          Ir a Configuración
        </Link>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setWeekStart(addDays(weekStart, -7))} className="text-white/40 hover:text-white">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold">
            {format(weekStart, "d MMM", { locale: es })} — {format(addDays(weekStart, 6), "d MMM yyyy", { locale: es })}
          </span>
          <button onClick={() => setWeekStart(addDays(weekStart, 7))} className="text-white/40 hover:text-white">
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            className="text-xs text-white/30 hover:text-white border border-white/10 px-2 py-1 rounded"
          >
            Hoy
          </button>
        </div>
        <span className="text-white/30 text-xs font-mono hidden md:block">
          {TIME_SLOTS.length} slots/día · 40 min c/u
        </span>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[640px]">
          {/* Day headers */}
          <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-white/10 sticky top-0 bg-black z-10">
            <div />
            {days.map((day) => {
              const isToday = isSameDay(day, new Date())
              return (
                <div key={day.toISOString()} className={cn('py-3 text-center border-l border-white/10', isToday && 'bg-white/5')}>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">
                    {format(day, 'EEE', { locale: es })}
                  </p>
                  <p className={cn('text-sm font-bold mt-0.5', isToday ? 'text-white' : 'text-white/50')}>
                    {format(day, 'd')}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Time rows */}
          {TIME_SLOTS.map((slot) => (
            <div key={slot} className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-white/5 min-h-[52px]">
              <div className="flex items-center justify-end pr-3">
                <span className="text-white/20 text-[10px] font-mono">{slot}</span>
              </div>
              {days.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd')
                const appt    = getAppt(dateStr, slot)
                const isToday = isSameDay(day, new Date())

                return (
                  <div key={dateStr + slot} className={cn('border-l border-white/5 p-1', isToday && 'bg-white/[0.02]')}>
                    {appt ? (
                      <button
                        onClick={() => setDetail(appt)}
                        className={cn('w-full h-full min-h-[44px] rounded px-2 py-1 text-left text-xs border transition-opacity hover:opacity-80', STATUS_COLORS[appt.status])}
                      >
                        <p className="font-semibold truncate">{appt.clientName}</p>
                        <p className="opacity-70 truncate">{appt.serviceName}</p>
                        <p className="opacity-50 truncate">{barbers.find(b => b.id === appt.barberId)?.name}</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => setModal({ date: dateStr, time: slot })}
                        className="w-full h-full min-h-[44px] rounded flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-white/5 transition-opacity group"
                      >
                        <Plus size={14} className="text-white/30" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/15 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-lg">Nuevo turno</h2>
                <p className="text-white/40 text-sm mt-0.5">
                  {format(new Date(modal.date + 'T12:00'), "EEEE d MMM", { locale: es })} · {modal.time}
                </p>
              </div>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Cliente', el: <input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Nombre del cliente" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30" /> },
                { label: 'Teléfono', el: <input value={form.clientPhone} onChange={(e) => setForm({ ...form, clientPhone: e.target.value })} placeholder="11-12345678" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30" /> },
              ].map(({ label, el }) => (
                <div key={label}>
                  <label className="text-white/40 text-xs uppercase tracking-widest block mb-1.5">{label}</label>
                  {el}
                </div>
              ))}
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1.5">Barbero</label>
                <select value={form.barberId} onChange={(e) => setForm({ ...form, barberId: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none">
                  {barbers.map((b) => <option key={b.id} value={b.id} className="bg-black">{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-1.5">Servicio</label>
                <select value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none">
                  {services.map((s) => <option key={s.id} value={s.id} className="bg-black">{s.name} — ${s.price.toLocaleString()}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 border border-white/15 text-white/50 text-sm rounded hover:border-white/30 transition-colors">Cancelar</button>
              <button onClick={handleBook} disabled={!form.clientName} className="flex-1 py-2.5 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 disabled:opacity-30 transition-colors">Confirmar turno</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/15 rounded-lg w-full max-w-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-lg">{detail.clientName}</h2>
                <p className="text-white/40 text-sm">{detail.clientPhone}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-white/30 hover:text-white"><X size={18} /></button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ['Fecha',    format(new Date(detail.date + 'T12:00'), "EEEE d MMM yyyy", { locale: es })],
                ['Horario',  `${detail.startTime} → ${detail.endTime}`],
                ['Barbero',  barbers.find(b => b.id === detail.barberId)?.name ?? detail.barberId],
                ['Servicio', detail.serviceName],
                ['Precio',   `$${detail.price.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/30">{k}</span>
                  <span className="text-white font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm items-center">
                <span className="text-white/30">Estado</span>
                <span className={cn('text-xs px-2 py-0.5 rounded-full border', STATUS_COLORS[detail.status])}>
                  {STATUS_LABELS[detail.status]}
                </span>
              </div>
            </div>

            {detail.status !== 'CANCELLED' && detail.status !== 'COMPLETED' && (
              <div className="flex gap-2">
                <button onClick={() => { update(detail.id, { status: 'COMPLETED' }); setDetail(null) }} className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/20 border border-green-500/30 text-green-300 text-sm rounded hover:bg-green-500/30 transition-colors">
                  <Check size={14} /> Completar
                </button>
                <button onClick={() => { update(detail.id, { status: 'CANCELLED' }); setDetail(null) }} className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded hover:bg-red-500/20 transition-colors">
                  <X size={14} /> Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
