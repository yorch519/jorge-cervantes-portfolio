import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { codeProjects } from '../../data/codeProjects.js'
import Lightbox from '../Lightbox/Lightbox.jsx'
import styles from './ProyectosCodigo.module.css'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const TONE = {
  orange: 'var(--accent)',
  coral: 'var(--accent-warm)',
  teal: 'var(--accent-cool)',
}

function toMediaList(media) {
  if (!media) return []
  return Array.isArray(media) ? media : [media]
}

function Card({ project }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const timerRef = useRef(null)
  const reduced = useReducedMotion()

  const mediaList = toMediaList(project.media)
  const repo = project.repo && project.repo !== '#'
  const demo = project.demo && project.demo !== '#'

  const startCycle = () => {
    if (mediaList.length < 2 || reduced) return
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % mediaList.length)
    }, 3000)
  }

  const stopCycle = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setActive(0)
  }

  useEffect(() => stopCycle, [])

  const openLightbox = () => setOpen(true)
  const close = () => setOpen(false)
  const prev = () => setActive((i) => (i - 1 + mediaList.length) % mediaList.length)
  const next = () => setActive((i) => (i + 1) % mediaList.length)

  return (
    <>
      <motion.article
        className={`${project.featured ? styles.featured : styles.card} ${mediaList.length ? styles.clickable : ''}`}
        style={{ '--tone': TONE[project.tone] }}
        initial="hidden"
        whileInView="visible"
        whileHover={{ y: -4 }}
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
        transition={{ duration: 0.5 }}
        onMouseEnter={startCycle}
        onMouseLeave={stopCycle}
        onClick={mediaList.length ? openLightbox : undefined}
      >
        <div className={`${styles.preview} ${mediaList.length ? styles.previewFilled : ''}`}>
          {mediaList.length ? (
            mediaList[active]?.type === 'video' ? (
              <video
                className={styles.previewMedia}
                src={mediaList[active].src}
                poster={mediaList[active].poster}
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img className={styles.previewMedia} src={mediaList[active].src} alt={project.title} />
            )
          ) : (
            <span className={styles.previewLabel}>{project.stack}</span>
          )}
        </div>
        <div className={styles.body}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.desc}>{project.description}</p>
          {(repo || demo) && (
            <div className={styles.links}>
              {repo && (
                <a className={styles.link} href={project.repo} target="_blank" rel="noreferrer">
                  repo <span className={styles.arrow}>↗</span>
                </a>
              )}
              {demo && (
                <a className={styles.link} href={project.demo} target="_blank" rel="noreferrer">
                  demo <span className={styles.arrow}>↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.article>

      {open && (
        <Lightbox items={mediaList} index={active} title={project.title} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}

export default function ProyectosCodigo() {
  return (
    <section className={styles.section} id="codigo">
      <div className={styles.wrap}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.label}>03 — Extensión</p>
          <h2 className={styles.title}>As bajo la manga</h2>
        </motion.header>

        <div className={styles.grid}>
          {codeProjects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
