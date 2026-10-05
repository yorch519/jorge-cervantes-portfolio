import { useState } from 'react'
import { contact } from '../../data/contact.js'
import ModelCanvas from './ModelCanvas.jsx'
import styles from './Hero.module.css'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.9h.06c.61-1.16 2.1-2.38 4.33-2.38 4.63 0 5.49 3.05 5.49 7.01V22h-4.6v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V22H7.8V8z" />
    </svg>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contact.email)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = contact.email
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.viewport}>
        <ModelCanvas />
      </div>

      <div className={styles.hud}>
        <p className={styles.kicker}>Estudiante de Ing. en Producción Multimedia</p>

        {contact.photo ? (
          <img className={styles.avatar} src={contact.photo} alt="Jorge E. Cervantes" />
        ) : (
          <div className={styles.avatarPlaceholder}>JC</div>
        )}

        <h1 className={styles.title}>Jorge E. Cervantes</h1>
        <p className={styles.location}>
          <svg className={styles.pin} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-7-5.3-7-11a7 7 0 1 1 14 0c0 5.7-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Ciudad Obregón, Sonora, México
        </p>
        <p className={styles.availability}>
          <span className={styles.dot} />
          Disponible para prácticas
        </p>
        <p className={styles.about}>
          Me muevo entre el <span className={styles.kw}>desarrollo web</span> y la{' '}
          <span className={styles.kwCool}>producción visual</span>, combinando código,
          modelado 3D y diseño sonoro para crear experiencias digitales.
        </p>

        <div className={styles.icons}>
          <button
            className={styles.iconBtn}
            onClick={copyEmail}
            aria-label={`Copiar correo ${contact.email}`}
          >
            <MailIcon />
            <span className={styles.iconLabel}>{copied ? 'Copiado' : 'Email'}</span>
          </button>

          <a
            className={styles.iconLink}
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
            <span className={styles.iconLabel}>LinkedIn</span>
          </a>
        </div>
      </div>

      <a className={styles.scroll} href="#trayectoria" aria-label="Desplázate hacia abajo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}
