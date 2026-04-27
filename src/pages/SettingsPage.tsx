import { useState } from 'react'
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react'
import { useConfigStore } from '@/store/configStore'

import type { Barber, Service, Product } from '@/types'
import { cn } from '@/lib/utils'

const fmt = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

// ─── Reusable inline-edit row ────────────────────────────────────────────────

function EditableRow({
  onSave,
  onCancel,
  saving,
  children,
}: {
  label?: string
  onSave: () => void
  onCancel: () => void
  saving?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5">
      <div className="flex-1 flex flex-wrap gap-2">{children}</div>
      <div className="flex gap-1 flex-shrink-0">
        <button onClick={onSave} disabled={saving} className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded text-white/60 hover:text-white disabled:opacity-30 transition-colors">
          <Check size={13} />
        </button>
        <button onClick={onCancel} disabled={saving} className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-white/30 hover:text-white/60 disabled:opacity-30 transition-colors">
          <X size={13} />
        </button>
      </div>
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', className }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30',
        className
      )}
    />
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
        <h2 className="text-sm font-bold uppercase tracking-widest">{title}</h2>
        <span className="text-white/30 text-xs font-mono">{count} registros</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

// ─── Barberos ─────────────────────────────────────────────────────────────────

function BarbersSection() {
  const { barbers, addBarber, updateBarber, removeBarber } = useConfigStore()
  const [adding, setAdding]   = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', commissionRate: '50', workStart: '10:00', workEnd: '20:00', slotDuration: '40' })
  const [editForm, setEditForm] = useState({ name: '', commissionRate: '50', workStart: '10:00', workEnd: '20:00', slotDuration: '40' })

  const handleAdd = () => {
    if (!form.name.trim()) return
    setSaving(true)
    setError('')
    try {
      addBarber({ name: form.name.trim(), commissionRate: Number(form.commissionRate) / 100, color: '#ffffff', workStart: form.workStart, workEnd: form.workEnd, slotDuration: Number(form.slotDuration) })
      setForm({ name: '', commissionRate: '50', workStart: '10:00', workEnd: '20:00', slotDuration: '40' })
      setAdding(false)
    } catch (e: any) {
      setError(e.message ?? 'Error al guardar')
    }
    setSaving(false)
  }

  const startEdit = (b: Barber) => {
    setEditing(b.id)
    setEditForm({ name: b.name, commissionRate: String(Math.round(b.commissionRate * 100)), workStart: b.workStart ?? '10:00', workEnd: b.workEnd ?? '20:00', slotDuration: String(b.slotDuration ?? 40) })
  }

  const handleUpdate = (id: string) => {
    setSaving(true)
    setError('')
    try {
      updateBarber(id, { name: editForm.name.trim(), commissionRate: Number(editForm.commissionRate) / 100, workStart: editForm.workStart, workEnd: editForm.workEnd, slotDuration: Number(editForm.slotDuration) })
      setEditing(null)
    } catch (e: any) {
      setError(e.message ?? 'Error al guardar')
    }
    setSaving(false)
  }

  return (
    <Section title="Barberos" count={barbers.length}>
      {barbers.length === 0 && !adding && (
        <p className="text-white/20 text-sm py-3">Sin barberos. Agregá el primero.</p>
      )}

      {barbers.map((b) =>
        editing === b.id ? (
          <EditableRow key={b.id} onSave={() => handleUpdate(b.id)} onCancel={() => setEditing(null)} saving={saving}>
            <Input value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} placeholder="Nombre" className="w-36" />
            <div className="flex items-center gap-1">
              <Input value={editForm.commissionRate} onChange={(v) => setEditForm({ ...editForm, commissionRate: v })} type="number" className="w-16" />
              <span className="text-white/30 text-xs">%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/30 text-xs">Entrada</span>
              <Input value={editForm.workStart} onChange={(v) => setEditForm({ ...editForm, workStart: v })} type="time" className="w-28" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/30 text-xs">Salida</span>
              <Input value={editForm.workEnd} onChange={(v) => setEditForm({ ...editForm, workEnd: v })} type="time" className="w-28" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/30 text-xs">Turno</span>
              <Input value={editForm.slotDuration} onChange={(v) => setEditForm({ ...editForm, slotDuration: v })} type="number" className="w-16" />
              <span className="text-white/30 text-xs">min</span>
            </div>
          </EditableRow>
        ) : (
          <div key={b.id} className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-white text-sm font-medium">{b.name}</p>
              <p className="text-white/30 text-xs">
                Comisión: {Math.round(b.commissionRate * 100)}%
                {b.workStart && b.workEnd && ` · ${b.workStart} – ${b.workEnd}`}
                {b.slotDuration && ` · ${b.slotDuration} min/turno`}
              </p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(b)} className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-white/30 hover:text-white/60 transition-colors">
                <Pencil size={12} />
              </button>
              <button onClick={() => removeBarber(b.id)} className="w-7 h-7 flex items-center justify-center hover:bg-red-500/10 rounded text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        )
      )}

      {error && <p className="text-red-400 text-xs py-1">{error}</p>}

      {adding ? (
        <EditableRow onSave={handleAdd} onCancel={() => { setAdding(false); setError('') }} saving={saving}>
          <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nombre del barbero" className="w-36" />
          <div className="flex items-center gap-1">
            <Input value={form.commissionRate} onChange={(v) => setForm({ ...form, commissionRate: v })} type="number" placeholder="50" className="w-16" />
            <span className="text-white/30 text-xs">%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/30 text-xs">Entrada</span>
            <Input value={form.workStart} onChange={(v) => setForm({ ...form, workStart: v })} type="time" className="w-28" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/30 text-xs">Salida</span>
            <Input value={form.workEnd} onChange={(v) => setForm({ ...form, workEnd: v })} type="time" className="w-28" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/30 text-xs">Turno</span>
            <Input value={form.slotDuration} onChange={(v) => setForm({ ...form, slotDuration: v })} type="number" placeholder="40" className="w-16" />
            <span className="text-white/30 text-xs">min</span>
          </div>
        </EditableRow>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-3 flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors">
          <Plus size={14} /> Agregar barbero
        </button>
      )}
    </Section>
  )
}

// ─── Servicios ────────────────────────────────────────────────────────────────

function ServicesSection() {
  const { services, addService, updateService, removeService } = useConfigStore()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', price: '' })
  const [editForm, setEditForm] = useState({ name: '', price: '' })

  const handleAdd = () => {
    if (!form.name.trim() || !form.price) return
    addService({ name: form.name.trim(), price: Number(form.price), durationMin: 40, isService: true })
    setForm({ name: '', price: '' })
    setAdding(false)
  }

  const startEdit = (s: Service) => {
    setEditing(s.id)
    setEditForm({ name: s.name, price: String(s.price) })
  }

  const handleUpdate = (id: string) => {
    updateService(id, { name: editForm.name.trim(), price: Number(editForm.price) })
    setEditing(null)
  }

  return (
    <Section title="Servicios" count={services.length}>
      {services.length === 0 && !adding && (
        <p className="text-white/20 text-sm py-3">Sin servicios. Agregá el primero.</p>
      )}

      {services.map((s) =>
        editing === s.id ? (
          <EditableRow key={s.id} label={s.name} onSave={() => handleUpdate(s.id)} onCancel={() => setEditing(null)}>
            <Input value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} placeholder="Nombre del servicio" className="w-48" />
            <div className="flex items-center gap-1">
              <span className="text-white/30 text-xs">$</span>
              <Input value={editForm.price} onChange={(v) => setEditForm({ ...editForm, price: v })} type="number" placeholder="Precio" className="w-24" />
            </div>
          </EditableRow>
        ) : (
          <div key={s.id} className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-white text-sm font-medium">{s.name}</p>
              <p className="text-white/30 text-xs">{fmt(s.price)} · 40 min</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(s)} className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-white/30 hover:text-white/60 transition-colors">
                <Pencil size={12} />
              </button>
              <button onClick={() => removeService(s.id)} className="w-7 h-7 flex items-center justify-center hover:bg-red-500/10 rounded text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        )
      )}

      {adding ? (
        <EditableRow label="Nuevo" onSave={handleAdd} onCancel={() => setAdding(false)}>
          <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nombre del servicio" className="w-48" />
          <div className="flex items-center gap-1">
            <span className="text-white/30 text-xs">$</span>
            <Input value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" placeholder="Precio" className="w-24" />
          </div>
        </EditableRow>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-3 flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors">
          <Plus size={14} /> Agregar servicio
        </button>
      )}
    </Section>
  )
}

// ─── Productos ────────────────────────────────────────────────────────────────

function ProductsSection() {
  const { products, addProduct, updateProduct, removeProduct } = useConfigStore()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', price: '', stock: '', minStock: '5' })
  const [editForm, setEditForm] = useState({ name: '', price: '', stock: '', minStock: '5' })

  const handleAdd = () => {
    if (!form.name.trim() || !form.price) return
    addProduct({ name: form.name.trim(), price: Number(form.price), stock: Number(form.stock || 0), minStock: Number(form.minStock || 5), isService: false })
    setForm({ name: '', price: '', stock: '', minStock: '5' })
    setAdding(false)
  }

  const startEdit = (p: Product) => {
    setEditing(p.id)
    setEditForm({ name: p.name, price: String(p.price), stock: String(p.stock), minStock: String(p.minStock) })
  }

  const handleUpdate = (id: string) => {
    updateProduct(id, { name: editForm.name.trim(), price: Number(editForm.price), stock: Number(editForm.stock), minStock: Number(editForm.minStock) })
    setEditing(null)
  }

  return (
    <Section title="Productos" count={products.length}>
      {products.length === 0 && !adding && (
        <p className="text-white/20 text-sm py-3">Sin productos. Agregá el primero.</p>
      )}

      {products.map((p) =>
        editing === p.id ? (
          <EditableRow key={p.id} label={p.name} onSave={() => handleUpdate(p.id)} onCancel={() => setEditing(null)}>
            <Input value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} placeholder="Nombre" className="w-40" />
            <div className="flex items-center gap-1"><span className="text-white/30 text-xs">$</span>
              <Input value={editForm.price} onChange={(v) => setEditForm({ ...editForm, price: v })} type="number" className="w-24" /></div>
            <div className="flex items-center gap-1"><span className="text-white/30 text-xs">Stock</span>
              <Input value={editForm.stock} onChange={(v) => setEditForm({ ...editForm, stock: v })} type="number" className="w-16" /></div>
            <div className="flex items-center gap-1"><span className="text-white/30 text-xs">Mín</span>
              <Input value={editForm.minStock} onChange={(v) => setEditForm({ ...editForm, minStock: v })} type="number" className="w-16" /></div>
          </EditableRow>
        ) : (
          <div key={p.id} className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-white text-sm font-medium">{p.name}</p>
              <p className={cn('text-xs', p.stock <= p.minStock ? 'text-red-400' : 'text-white/30')}>
                {fmt(p.price)} · Stock: {p.stock} (mín {p.minStock})
              </p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(p)} className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-white/30 hover:text-white/60 transition-colors">
                <Pencil size={12} />
              </button>
              <button onClick={() => removeProduct(p.id)} className="w-7 h-7 flex items-center justify-center hover:bg-red-500/10 rounded text-white/20 hover:text-red-400 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        )
      )}

      {adding ? (
        <EditableRow label="Nuevo" onSave={handleAdd} onCancel={() => setAdding(false)}>
          <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nombre del producto" className="w-40" />
          <div className="flex items-center gap-1"><span className="text-white/30 text-xs">$</span>
            <Input value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" placeholder="Precio" className="w-24" /></div>
          <div className="flex items-center gap-1"><span className="text-white/30 text-xs">Stock</span>
            <Input value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} type="number" placeholder="0" className="w-16" /></div>
          <div className="flex items-center gap-1"><span className="text-white/30 text-xs">Mín</span>
            <Input value={form.minStock} onChange={(v) => setForm({ ...form, minStock: v })} type="number" placeholder="5" className="w-16" /></div>
        </EditableRow>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-3 flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors">
          <Plus size={14} /> Agregar producto
        </button>
      )}
    </Section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-black uppercase tracking-tight">Configuración</h1>
        <p className="text-white/30 text-sm mt-0.5">Barberos, servicios y productos de tu barbería</p>
      </div>
      <BarbersSection />
      <ServicesSection />
      <ProductsSection />
    </div>
  )
}
