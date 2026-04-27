import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Sale, CartItem } from '@/types'
import { useConfigStore } from './configStore'

interface SalesStore {
  sales:      Sale[]
  load:       () => void
  addSale:    (items: CartItem[], method: Sale['method'], barberId: string, barberName: string, commissionRate: number) => Sale
  removeSale: (id: string) => void
}

export const useSalesStore = create<SalesStore>()(
  persist(
    (set, get) => ({
      sales: [],

      load() { /* data loaded from persist */ },

      addSale(items, method, barberId, barberName, commissionRate) {
        const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0)
        const commission = subtotal * commissionRate
        const sale: Sale = {
          id: `sale_${Date.now()}`,
          date: new Date().toISOString(),
          barberId,
          barberName,
          items,
          subtotal,
          commission,
          net: subtotal - commission,
          method,
        }
        set({ sales: [sale, ...get().sales] })

        // Descontar stock
        const { products, updateProduct } = useConfigStore.getState()
        items.forEach(item => {
          if (item.type === 'product') {
            const p = products.find(p => p.id === item.id)
            if (p) updateProduct(p.id, { stock: Math.max(0, p.stock - item.quantity) })
          }
        })

        return sale
      },

      removeSale(id) {
        set({ sales: get().sales.filter(s => s.id !== id) })
      },
    }),
    { name: 'demo_sales' }
  )
)
