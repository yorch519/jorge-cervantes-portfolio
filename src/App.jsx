import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero/Hero.jsx'
import ProyectosEspecialidad from './components/ProyectosEspecialidad/ProyectosEspecialidad.jsx'
import ProyectosCodigo from './components/ProyectosCodigo/ProyectosCodigo.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="app">
        <Hero />
        <ProyectosEspecialidad />
        <ProyectosCodigo />
        <Footer />
      </main>
    </MotionConfig>
  )
}
