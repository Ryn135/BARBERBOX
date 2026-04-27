# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev        # servidor de desarrollo (Vite)
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # previsualizar build de producción
```

No hay tests configurados actualmente.

## Arquitectura

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Zustand + React Router v7 + Recharts.

### Dos modos de la aplicación

El proyecto tiene dos contextos de datos completamente aislados:

| Ruta | Shell | Datos |
|------|-------|-------|
| `/app/*` | `AppShell` | `localStorage` con claves `barber_*` (app real) |
| `/demo/*` | `DemoShell` | `localStorage` con claves `demo_*` (demo de ejemplo) |

Esto permite que el modo demo nunca contamine los datos reales del cliente.

### Capa de servicios (`src/services/`)

- `api.ts` — capa de acceso a datos real (`AppointmentAPI`, `SalesAPI`). Actualmente usa `localStorage`; cada función está diseñada para ser reemplazada por un `fetch()` al backend sin cambiar los consumidores.
- `demoApi.ts` — versión demo con claves de `localStorage` distintas (`demo_appointments`, `demo_sales`).

### Estado global (`src/store/`)

Tres stores de Zustand con `persist` middleware:

- `appointmentStore` — CRUD de turnos, persiste en `demo_appointments`
- `salesStore` — CRUD de ventas/caja
- `configStore` — barberos, servicios y productos (persiste en `demo_config`)

Los IDs se generan con `Date.now()` como prefijo (`appt_`, `barber_`, `svc_`, `prod_`).

### Páginas principales

- **Turnos** (`/turnos`) — agenda semanal por barbero, reserva y gestión de turnos
- **Finanzas / Dashboard** (`/dashboard`) — gráficos con Recharts, ventas y comisiones
- **POS** (`/pos`) — punto de venta: carrito, productos, servicios, métodos de pago
- **Configuración** (`/settings`) — alta/baja/edición de barberos, servicios y productos

### Tipos centrales (`src/types/index.ts`)

Las entidades principales son `Barber`, `Appointment`, `Service`, `Product`, `CartItem` y `Sale`. `Barber` incluye `workStart`/`workEnd` (formato `"hh:mm"`) y `slotDuration` (30 o 40 minutos). El campo `isService: false` en `Product` es un discriminador de tipo literal.

### Alias de importación

`@/` apunta a `src/`. Configurado en `tsconfig.app.json` y `vite.config.ts`.

### Componentes UI

Los componentes genéricos van en `src/components/ui/`. Usan `clsx` + `tailwind-merge` (helper `cn` en `src/lib/utils.ts`) y Radix UI para primitivos accesibles.
