import { useEffect } from 'react'
import { generateSeedSales, BARBERS } from '@/data/seed'
import type { Sale, CartItem } from '@/types'
import { useSalesStore } from '@/store/salesStore'
import { DashboardPage } from '@/pages/DashboardPage'

const DEMO_KEY = 'demo_sales_plain'

function getDemoSales(): Sale[] {
  try {
    const raw = localStorage.getItem(DEMO_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveDemoSales(sales: Sale[]) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(sales))
}

export function DemoDashboardPage() {
  useEffect(() => {
    let sales = getDemoSales()
    if (sales.length === 0) {
      sales = generateSeedSales()
      saveDemoSales(sales)
    }
    useSalesStore.setState({ sales })
  }, [])

  return <DashboardPage />
}

export function makeDemoSale(
  items: CartItem[],
  method: Sale['method'],
  barberId: string
): Sale {
  const barber = BARBERS.find((b) => b.id === barberId) ?? BARBERS[0]
  const subtotal   = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const commission = subtotal * barber.commissionRate
  const sale: Sale = {
    id: `demo_sale_${Date.now()}`,
    date: new Date().toISOString(),
    barberId: barber.id,
    barberName: barber.name,
    items,
    subtotal,
    commission,
    net: subtotal - commission,
    method,
  }
  const all = [...getDemoSales(), sale]
  saveDemoSales(all)
  useSalesStore.setState({ sales: all })
  return sale
}
