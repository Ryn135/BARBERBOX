import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Barber, Service, Product } from '@/types'

interface ConfigStore {
  barbers:  Barber[]
  services: Service[]
  products: Product[]

  addBarber:    (b: Omit<Barber, 'id'>) => void
  updateBarber: (id: string, data: Partial<Omit<Barber, 'id'>>) => void
  removeBarber: (id: string) => void

  addService:    (s: Omit<Service, 'id'>) => void
  updateService: (id: string, data: Partial<Omit<Service, 'id'>>) => void
  removeService: (id: string) => void

  addProduct:    (p: Omit<Product, 'id'>) => void
  updateProduct: (id: string, data: Partial<Omit<Product, 'id'>>) => void
  removeProduct: (id: string) => void
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      barbers:  [],
      services: [],
      products: [],

      addBarber(b) {
        set({ barbers: [...get().barbers, { ...b, id: `barber_${Date.now()}` }] })
      },
      updateBarber(id, data) {
        set({ barbers: get().barbers.map(b => b.id === id ? { ...b, ...data } : b) })
      },
      removeBarber(id) {
        set({ barbers: get().barbers.filter(b => b.id !== id) })
      },

      addService(s) {
        set({ services: [...get().services, { ...s, id: `svc_${Date.now()}` }] })
      },
      updateService(id, data) {
        set({ services: get().services.map(s => s.id === id ? { ...s, ...data } : s) })
      },
      removeService(id) {
        set({ services: get().services.filter(s => s.id !== id) })
      },

      addProduct(p) {
        set({ products: [...get().products, { ...p, id: `prod_${Date.now()}` }] })
      },
      updateProduct(id, data) {
        set({ products: get().products.map(p => p.id === id ? { ...p, ...data } : p) })
      },
      removeProduct(id) {
        set({ products: get().products.filter(p => p.id !== id) })
      },
    }),
    { name: 'demo_config' }
  )
)
