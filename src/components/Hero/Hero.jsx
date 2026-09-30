import { contact } from '../../data/contact.js'
import ModelCanvas from './ModelCanvas.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.viewport} aria-hidden="true">
        <ModelCanvas />
      </div>

      <div className={styles.hud}>
        <p className={styles.kicker}>Productor Multimedia</p>
        <h1 className={styles.title}>Jorge Cervantes</h1>
        <p className={styles.location}>Ciudad Obregón, Sonora, México</p>
        <p className={styles.about}>
          Entre arte visual, 3D y código. Produzco renders, video y aplicaciones web
          con foco en el resultado, no en la teoría.
        </p>
        <a className={styles.cta} href={`mailto:${contact.email}`}>
          Contáctame
        </a>
      </div>

      <a className={styles.scroll} href="#especialidad" aria-label="Desplázate hacia abajo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
