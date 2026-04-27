import { useState } from 'react'
import { Plus, Minus, Trash2, Check, Printer } from 'lucide-react'
import { SERVICES, PRODUCTS, BARBERS } from '@/data/seed'
import { makeDemoSale } from './DemoDashboardPage'
import type { CartItem, Sale } from '@/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type PaymentMethod = Sale['method']
const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export function DemoPOSPage() {
  const [cart, setCart]       = useState<CartItem[]>([])
  const [barberId, setBarberId] = useState(BARBERS[0].id)
  const [method, setMethod]   = useState<PaymentMethod>('CASH')
  const [receipt, setReceipt] = useState<Sale | null>(null)
  const [tab, setTab]         = useState<'services' | 'products'>('services')

  const addItem = (id: string, name: string, price: number, type: 'service' | 'product') =>
    setCart((prev) => {
      const ex = prev.find((i) => i.id === id)
      if (ex) return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { id, name, price, quantity: 1, type }]
    })

  const updateQty = (id: string, delta: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0))

  const barber     = BARBERS.find((b) => b.id === barberId)!
  const subtotal   = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const commission = subtotal * barber.commissionRate

  const handleCheckout = () => {
    if (!cart.length) return
    const sale = makeDemoSale(cart, method, barberId)
    setReceipt(sale)
    setCart([])
  }

  if (receipt) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-[#0a0a0a] border border-white/15 rounded-lg w-full max-w-sm p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <Check size={22} className="text-green-400" />
          </div>
          <h2 className="text-white font-black text-xl uppercase tracking-tight mb-1">Venta demo</h2>
          <p className="text-white/30 text-sm mb-6">{format(new Date(receipt.date), "d MMM yyyy · HH:mm", { locale: es })}</p>
          <div className="text-left space-y-2 mb-6 border border-white/10 rounded p-4">
            {receipt.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-white/60">{item.name} × {item.quantity}</span>
                <span className="text-white">{fmt(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 mt-2 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-white/30">Comisión ({Math.round(barber.commissionRate * 100)}%)</span><span className="text-white/50">-{fmt(receipt.commission)}</span></div>
              <div className="flex justify-between font-bold"><span className="text-white">Neto barbería</span><span className="text-white text-lg">{fmt(receipt.net)}</span></div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-white/15 text-white/40 text-sm rounded"><Printer size={14} /> Imprimir</button>
            <button onClick={() => setReceipt(null)} className="flex-1 py-2.5 bg-white text-black text-sm font-semibold rounded">Nueva venta</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden border-r border-white/10">
        <div className="h-14 border-b border-white/10 flex items-center px-6 gap-6 flex-shrink-0">
          <h1 className="text-sm font-black uppercase tracking-tight">POS (Demo)</h1>
          <div className="flex gap-1 bg-white/5 border border-white/10 rounded p-1">
            {(['services', 'products'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn('px-3 py-1 text-xs rounded transition-colors', tab === t ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white')}>
                {t === 'services' ? 'Servicios' : 'Productos'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(tab === 'services' ? SERVICES : PRODUCTS).map((item) => {
              const inCart = cart.find((c) => c.id === item.id)
              return (
                <button key={item.id} onClick={() => addItem(item.id, item.name, item.price, item.isService ? 'service' : 'product')}
                  className={cn('border rounded-lg p-4 text-left transition-all hover:border-white/30 hover:bg-white/5', inCart ? 'border-white/30 bg-white/5' : 'border-white/10')}>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white/50 text-xs mt-1">{fmt(item.price)}</p>
                  {inCart && <span className="mt-2 inline-block text-xs bg-white text-black px-2 py-0.5 rounded-full font-semibold">× {inCart.quantity}</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-80 flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <label className="text-white/30 text-xs uppercase tracking-widest block mb-2">Barbero</label>
          <select value={barberId} onChange={(e) => setBarberId(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none">
            {BARBERS.map((b) => <option key={b.id} value={b.id} className="bg-black">{b.name}</option>)}
          </select>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/20"><p className="text-sm">Carrito vacío</p></div>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/5">
                  <div className="flex-1 min-w-0"><p className="text-white text-sm truncate">{item.name}</p><p className="text-white/30 text-xs">{fmt(item.price)} × {item.quantity}</p></div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white border border-white/10 rounded"><Minus size={10} /></button>
                    <span className="w-6 text-center text-white text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white border border-white/10 rounded"><Plus size={10} /></button>
                    <button onClick={() => setCart(cart.filter((i) => i.id !== item.id))} className="w-6 h-6 flex items-center justify-center text-red-400/50 hover:text-red-400 ml-1"><Trash2 size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/50"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="flex justify-between text-white/30"><span>Comisión ({Math.round(barber.commissionRate * 100)}%)</span><span>-{fmt(commission)}</span></div>
            <div className="flex justify-between text-white font-bold text-base"><span>Total</span><span>{fmt(subtotal)}</span></div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {([['CASH', 'Efectivo'], ['TRANSFER', 'Transfer'], ['CARD', 'Tarjeta']] as [PaymentMethod, string][]).map(([m, label]) => (
              <button key={m} onClick={() => setMethod(m)} className={cn('py-2 text-xs rounded border transition-colors', method === m ? 'bg-white text-black border-white font-semibold' : 'border-white/15 text-white/40 hover:text-white')}>{label}</button>
            ))}
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full py-3 bg-white text-black font-bold text-sm rounded hover:bg-white/90 disabled:opacity-30">
            Cobrar {cart.length > 0 && fmt(subtotal)}
          </button>
        </div>
      </div>
    </div>
  )
}
