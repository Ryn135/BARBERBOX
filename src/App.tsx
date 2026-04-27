import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Landing
import { Hero }      from '@/components/sections/Hero'
import { Modules }   from '@/components/sections/Modules'
import { TechStack } from '@/components/sections/TechStack'
import { Roadmap }   from '@/components/sections/Roadmap'
import { Footer }    from '@/components/sections/Footer'

// App real
import { AppShell }      from '@/components/layout/AppShell'
import { TurnosPage }    from '@/pages/TurnosPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { POSPage }       from '@/pages/POSPage'
import { SettingsPage }  from '@/pages/SettingsPage'

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
    <BrowserRouter basename="/BARBERBOX">
      <Routes>
        {/* Landing */}
        <Route path="/" element={
          <ErrorBoundary fallbackPath="/">
            <LandingPage />
          </ErrorBoundary>
        } />

        {/* App real — datos de la barbería */}
        <Route path="/app" element={
          <ErrorBoundary fallbackPath="/">
            <AppShell />
          </ErrorBoundary>
        }>
          <Route index element={<Navigate to="/app/turnos" replace />} />
          <Route path="turnos" element={
            <ErrorBoundary fallbackPath="/app/turnos">
              <TurnosPage />
            </ErrorBoundary>
          } />
          <Route path="dashboard" element={
            <ErrorBoundary fallbackPath="/app/turnos">
              <DashboardPage />
            </ErrorBoundary>
          } />
          <Route path="pos" element={
            <ErrorBoundary fallbackPath="/app/turnos">
              <POSPage />
            </ErrorBoundary>
          } />
          <Route path="settings" element={
            <ErrorBoundary fallbackPath="/app/turnos">
              <SettingsPage />
            </ErrorBoundary>
          } />
        </Route>

        {/* Demo — datos de ejemplo aislados */}
        <Route path="/demo" element={
          <ErrorBoundary fallbackPath="/">
            <DemoShell />
          </ErrorBoundary>
        }>
          <Route index element={<Navigate to="/demo/turnos" replace />} />
          <Route path="turnos" element={
            <ErrorBoundary fallbackPath="/demo/turnos">
              <DemoTurnosPage />
            </ErrorBoundary>
          } />
          <Route path="dashboard" element={
            <ErrorBoundary fallbackPath="/demo/turnos">
              <DemoDashboardPage />
            </ErrorBoundary>
          } />
          <Route path="pos" element={
            <ErrorBoundary fallbackPath="/demo/turnos">
              <DemoPOSPage />
            </ErrorBoundary>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
