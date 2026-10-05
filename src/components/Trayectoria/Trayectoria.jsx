import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience, education } from '../../data/trayectoria.js'
import styles from './Trayectoria.module.css'

const TABS = [
  { id: 'experiencia', label: 'Experiencia', Icon: BriefcaseIcon },
  { id: 'educacion', label: 'Educación', Icon: GraduationIcon },
]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function BriefcaseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function GraduationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

export default function Trayectoria() {
  const [active, setActive] = useState('experiencia')
  const items = active === 'experiencia' ? experience : education
  const Icon = active === 'experiencia' ? BriefcaseIcon : GraduationIcon

  return (
    <section className={styles.section} id="trayectoria">
      <div className={styles.wrap}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.label}>01 — Trayectoria</p>
          <h2 className={styles.title}>Experiencia & Educación</h2>
        </motion.header>

        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.tabs} role="tablist" aria-label="Experiencia y educación">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls="trayectoria-panel"
                className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActive(tab.id)}
              >
                <tab.Icon />
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className={styles.panel}
            id="trayectoria-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
          >
            <AnimatePresence mode="wait">
              <motion.ul
                key={active}
                className={styles.timeline}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <span className={styles.badge}>
                      {item.logo ? (
                        <img className={styles.logo} src={item.logo} alt={item.place} />
                      ) : (
                        <Icon />
                      )}
                    </span>
                    <div className={styles.info}>
                      <p className={styles.dates}>{item.dates}</p>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <p className={styles.itemPlace}>{item.place}</p>
                      <p className={styles.itemDesc}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
