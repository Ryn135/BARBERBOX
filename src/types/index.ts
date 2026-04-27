export type Role = 'ADMIN' | 'BARBER'
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CARD'

export interface Barber {
  id: string
  name: string
  commissionRate: number
  color: string
  workStart?: string    // "hh:mm"
  workEnd?: string      // "hh:mm"
  slotDuration?: number // minutos por turno (30 o 40)
}

export interface Client {
  id: string
  name: string
  phone: string
}

export interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  barberId: string
  clientName: string
  clientPhone?: string
  serviceName: string
  price: number
  status: AppointmentStatus
}

export interface Service {
  id: string
  name: string
  price: number
  durationMin: number
  isService: boolean
}

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  minStock: number
  isService: false
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  type: 'service' | 'product'
}

export interface Sale {
  id: string
  date: string
  barberId: string
  barberName: string
  items: CartItem[]
  subtotal: number
  commission: number
  net: number
  method: PaymentMethod
}

