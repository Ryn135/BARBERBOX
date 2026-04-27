import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Landing
import { Hero }      from '@/components/sections/Hero'
import { Modules }   from '@/components/sections/Modules'
import { TechStack } from '@/components/sections/TechStack'
import { Roadmap }   from '@/components/sections/Roadmap'
import { Footer }    from '@/components/sections/Footer'

// App real
import { AppShell }     from '@/components/layout/AppShell'
import { TurnosPage }   from '@/pages/TurnosPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { POSPage }      from '@/pages/POSPage'
import { SettingsPage } from '@/pages/SettingsPage'

// Demo (datos de ejemplo, aislados)
import { DemoShell }         from '@/components/layout/DemoShell'
import { DemoTurnosPage }    from '@/pages/demo/DemoTurnosPage'
import { DemoDashboardPage } from '@/pages/demo/DemoDashboardPage'
import { DemoPOSPage }       from '@/pages/demo/DemoPOSPage'

function LandingPage() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Modules />
      <TechStack />
      <Roadmap />
      <Footer />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* App real — datos de la barbería */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/turnos" replace />} />
          <Route path="turnos"    element={<TurnosPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pos"       element={<POSPage />} />
          <Route path="settings"  element={<SettingsPage />} />
        </Route>

        {/* Demo — datos de ejemplo aislados */}
        <Route path="/demo" element={<DemoShell />}>
          <Route index element={<Navigate to="/demo/turnos" replace />} />
          <Route path="turnos"    element={<DemoTurnosPage />} />
          <Route path="dashboard" element={<DemoDashboardPage />} />
          <Route path="pos"       element={<DemoPOSPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
