/**
 * Demo API — usa claves de localStorage distintas a la app real.
 * La app real usa "futures_appointments" / "futures_sales".
 * El demo usa "demo_appointments" / "demo_sales".
 */
import type { Appointment, Sale } from '@/types'

const KEYS = { appointments: 'demo_appointments', sales: 'demo_sales' }

export const DemoAppointmentAPI = {
  getAll(): Appointment[] {
    const raw = localStorage.getItem(KEYS.appointments)
    return raw ? JSON.parse(raw) : []
  },
  saveAll(appts: Appointment[]) {
    localStorage.setItem(KEYS.appointments, JSON.stringify(appts))
  },
}

export const DemoSalesAPI = {
  getAll(): Sale[] {
    const raw = localStorage.getItem(KEYS.sales)
    return raw ? JSON.parse(raw) : []
  },
  saveAll(sales: Sale[]) {
    localStorage.setItem(KEYS.sales, JSON.stringify(sales))
  },
}
