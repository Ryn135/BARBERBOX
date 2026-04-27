import { Hero }       from './components/sections/Hero'
import { Features }   from './components/sections/Features'
import { Modules }    from './components/sections/Modules'
import { HowItWorks } from './components/sections/HowItWorks'
import { CTA }        from './components/sections/CTA'
import { Footer }     from './components/sections/Footer'

export default function App() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <Hero />
      <Features />
      <Modules />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
