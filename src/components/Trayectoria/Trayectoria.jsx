import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience, education } from '../../data/trayectoria.js'
import styles from './Trayectoria.module.css'

const TABS = [
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'educacion', label: 'Educación' },
]

export default function Trayectoria() {
  const [active, setActive] = useState('experiencia')
  const items = active === 'experiencia' ? experience : education

  return (
    <section className={styles.section} id="trayectoria">
      <div className={styles.wrap}>
        <header className={styles.header}>
          <p className={styles.label}>01 — Trayectoria</p>
          <h2 className={styles.title}>Experiencia & Educación</h2>
        </header>

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
              className={styles.list}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemHead}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <span className={styles.itemDates}>{item.dates}</span>
                  </div>
                  <p className={styles.itemPlace}>{item.place}</p>
                  <p className={styles.itemDesc}>{item.description}</p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
