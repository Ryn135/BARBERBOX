/**
 * Service layer — currently backed by localStorage.
 * Replace each function body with a real fetch() call to swap in a backend.
 *
 * e.g.:  const res = await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) })
 *        return res.json()
 */

import type { Appointment, Sale } from '@/types'

const KEYS = {
  appointments: 'barber_appointments',
  sales: 'barber_sales',
}

// ─── Appointments ───────────────────────────────────────────────────────────

export const AppointmentAPI = {
  getAll(): Appointment[] {
    const raw = localStorage.getItem(KEYS.appointments)
    return raw ? JSON.parse(raw) : []
  },

  save(appt: Appointment): Appointment {
    const all = AppointmentAPI.getAll()
    const existing = all.findIndex((a) => a.id === appt.id)
    if (existing >= 0) {
      all[existing] = appt
    } else {
      all.push(appt)
    }
    localStorage.setItem(KEYS.appointments, JSON.stringify(all))
    return appt
  },

  delete(id: string): void {
    const all = AppointmentAPI.getAll().filter((a) => a.id !== id)
    localStorage.setItem(KEYS.appointments, JSON.stringify(all))
  },

  getByDate(dateStr: string): Appointment[] {
    return AppointmentAPI.getAll().filter((a) => a.date === dateStr)
  },
}

// ─── Sales ───────────────────────────────────────────────────────────────────

export const SalesAPI = {
  getAll(): Sale[] {
    const raw = localStorage.getItem(KEYS.sales)
    return raw ? JSON.parse(raw) : []
  },

  save(sale: Sale): Sale {
    const all = SalesAPI.getAll()
    all.push(sale)
    localStorage.setItem(KEYS.sales, JSON.stringify(all))
    return sale
  },

  getByRange(from: Date, to: Date): Sale[] {
    return SalesAPI.getAll().filter((s) => {
      const d = new Date(s.date)
      return d >= from && d <= to
    })
  },
}
