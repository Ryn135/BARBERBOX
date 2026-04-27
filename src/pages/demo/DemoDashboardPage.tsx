/**
 * Demo dashboard — carga datos de seed en claves de localStorage separadas.
 * No toca los datos reales de la app.
 */
import { useEffect } from 'react'
import { create } from 'zustand'
import { DemoSalesAPI } from '@/services/demoApi'
import { generateSeedSales, BARBERS } from '@/data/seed'
import type { Sale, CartItem } from '@/types'
import { useSalesStore as useRealSalesStore } from '@/store/salesStore'
import { DashboardPage } from '@/pages/DashboardPage'

// Mini store that swaps the real sales store data with demo data
const useDemoSales = create<{ ready: boolean; inject: () => void }>((set) => ({
  ready: false,
  inject() {
    let all = DemoSalesAPI.getAll()
    if (all.length === 0) {
      all = generateSeedSales()
      DemoSalesAPI.saveAll(all)
    }
    // Temporarily replace real store's sales with demo data
    useRealSalesStore.setState({ sales: all })
    set({ ready: true })
  },
}))

export function DemoDashboardPage() {
  const { inject } = useDemoSales()
  useEffect(() => { inject() }, [inject])
  return <DashboardPage />
}

// Also export a demo addSale that writes to demo keys
export function makeDemoSale(
  items: CartItem[],
  method: Sale['method'],
  barberId: string
): Sale {
  const barber = BARBERS.find((b) => b.id === barberId) ?? BARBERS[0]
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const commission = subtotal * barber.commissionRate
  const sale: Sale = {
    id: `demo_sale_${Date.now()}`,
    date: new Date().toISOString(),
    barberId: barber.id, barberName: barber.name,
    items, subtotal, commission, net: subtotal - commission, method,
  }
  const all = [...DemoSalesAPI.getAll(), sale]
  DemoSalesAPI.saveAll(all)
  useRealSalesStore.setState({ sales: all })
  return sale
}
