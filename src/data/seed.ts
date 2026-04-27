import type { Barber, Service, Product, Sale, Appointment } from '@/types'
import { subDays, format, addMinutes, setHours, setMinutes } from 'date-fns'

export const BARBERS: Barber[] = [
  { id: 'b1', name: 'Matias', commissionRate: 0.5, color: '#ffffff' },
  { id: 'b2', name: 'Santiago',   commissionRate: 0.5, color: '#a3a3a3' },
  
]

export const SERVICES: Service[] = [
  { id: 's1', name: 'Corte clásico',      price: 3500, durationMin: 40, isService: true },
  { id: 's2', name: 'Corte + barba',      price: 5000, durationMin: 40, isService: true },
  { id: 's3', name: 'Barba',              price: 2000, durationMin: 40, isService: true },
  { id: 's4', name: 'Corte degradado',    price: 4000, durationMin: 40, isService: true },
  { id: 's5', name: 'Diseño de barba',    price: 2500, durationMin: 40, isService: true },
  { id: 's6', name: 'Afeitado navaja',    price: 3000, durationMin: 40, isService: true },
]

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Pomada fijadora',    price: 2800, stock: 15, minStock: 5, isService: false },
  { id: 'p2', name: 'Cera mate',          price: 2200, stock: 12, minStock: 5, isService: false },
  { id: 'p3', name: 'Aceite de barba',    price: 1800, stock: 8,  minStock: 3, isService: false },
  { id: 'p4', name: 'Shampoo especial',   price: 1500, stock: 20, minStock: 5, isService: false },
  { id: 'p5', name: 'Talco barbero',      price: 900,  stock: 25, minStock: 8, isService: false },
]

// ─── Generate seed sales (last 30 days) ──────────────────────────────────────

function rnd<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateSeedSales(): Sale[] {
  const sales: Sale[] = []
  const methods = ['CASH', 'TRANSFER', 'CARD'] as const

  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const dailyCount = Math.floor(Math.random() * 6) + 3

    for (let j = 0; j < dailyCount; j++) {
      const barber = rnd(BARBERS)
      const service = rnd(SERVICES)
      const includeProduct = Math.random() > 0.6
      const product = rnd(PRODUCTS)

      const items = [
        { id: service.id, name: service.name, price: service.price, quantity: 1, type: 'service' as const },
        ...(includeProduct
          ? [{ id: product.id, name: product.name, price: product.price, quantity: 1, type: 'product' as const }]
          : []),
      ]

      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
      const commission = subtotal * barber.commissionRate

      sales.push({
        id: `sale_${i}_${j}`,
        date: date.toISOString(),
        barberId: barber.id,
        barberName: barber.name,
        items,
        subtotal,
        commission,
        net: subtotal - commission,
        method: rnd(methods),
      })
    }
  }

  return sales
}

// ─── Generate seed appointments (this week) ──────────────────────────────────

export function generateSeedAppointments(): Appointment[] {
  const appts: Appointment[] = []
  const clientNames = ['Juan López', 'Pedro García', 'Diego Martínez', 'Facundo Torres', 'Nicolás Sosa']
  const statuses = ['CONFIRMED', 'COMPLETED', 'PENDING'] as const

  for (let dayOffset = -2; dayOffset <= 4; dayOffset++) {
    const date = subDays(new Date(), -dayOffset)
    const dateStr = format(date, 'yyyy-MM-dd')
    const slotsToFill = Math.floor(Math.random() * 5) + 3

    for (let k = 0; k < slotsToFill; k++) {
      const barber = rnd(BARBERS)
      const service = rnd(SERVICES)
      const clientName = rnd(clientNames)
      const slotIndex = Math.floor(Math.random() * 17)
      const startHour = 10
      const start = addMinutes(setMinutes(setHours(date, startHour), 0), slotIndex * 40)
      const end = addMinutes(start, 40)

      appts.push({
        id: `appt_${dayOffset}_${k}`,
        date: dateStr,
        startTime: format(start, 'HH:mm'),
        endTime: format(end, 'HH:mm'),
        barberId: barber.id,
        clientName,
        clientPhone: `11-${Math.floor(Math.random() * 90000000) + 10000000}`,
        serviceName: service.name,
        price: service.price,
        status: rnd(statuses),
      })
    }
  }

  return appts
}
