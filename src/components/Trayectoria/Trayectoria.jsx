import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience, education } from '../../data/trayectoria.js'
import Lightbox from '../Lightbox/Lightbox.jsx'
import styles from './Trayectoria.module.css'

const TABS = [
  { id: 'experiencia', label: 'Experiencia', Icon: BriefcaseIcon },
  { id: 'educacion', label: 'Educación', Icon: GraduationIcon },
]

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function toMediaList(media) {
  if (!media) return []
  return Array.isArray(media) ? media : [media]
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
  const [lightbox, setLightbox] = useState(null)

  const items = active === 'experiencia' ? experience : education
  const Icon = active === 'experiencia' ? BriefcaseIcon : GraduationIcon

  const openGallery = (media, title) => setLightbox({ items: media, title, index: 0 })
  const close = () => setLightbox(null)
  const prev = () => setLightbox((s) => s && { ...s, index: (s.index - 1 + s.items.length) % s.items.length })
  const next = () => setLightbox((s) => s && { ...s, index: (s.index + 1) % s.items.length })

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
                {items.map((item) => {
                  const mediaList = toMediaList(item.media)
                  const first = mediaList[0]
                  const thumbSrc = first?.type === 'video' ? first.poster : first?.src

                  return (
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
                        {item.highlights?.length > 0 && (
                          <ul className={styles.highlights}>
                            {item.highlights.map((highlight) => (
                              <li key={highlight} className={styles.highlight}>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {mediaList.length > 0 && thumbSrc && (
                        <button
                          className={styles.thumb}
                          onClick={() => openGallery(mediaList, item.title)}
                          aria-label={`Ver galería de ${item.title}`}
                        >
                          <img src={thumbSrc} alt={item.title} />
                        </button>
                      )}
                    </li>
                  )
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          title={lightbox.title}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
