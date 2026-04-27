import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Appointment } from '@/types'

interface AppointmentStore {
  appointments: Appointment[]
  load:   () => void
  book:   (a: Omit<Appointment, 'id'>) => void
  update: (id: string, data: Partial<Appointment>) => void
  remove: (id: string) => void
}

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set, get) => ({
      appointments: [],

      load() {}, // no-op en demo, ya está en localStorage

      book(a) {
        const appt: Appointment = { ...a, id: `appt_${Date.now()}` }
        set({ appointments: [...get().appointments, appt] })
      },

      update(id, data) {
        set({ appointments: get().appointments.map(a => a.id === id ? { ...a, ...data } : a) })
      },

      remove(id) {
        set({ appointments: get().appointments.filter(a => a.id !== id) })
      },
    }),
    { name: 'demo_appointments' }
  )
)
