import { motion } from 'framer-motion'
import { specialtyProjects } from '../../data/specialtyProjects.js'
import styles from './ProyectosEspecialidad.module.css'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const TONE = {
  orange: 'var(--accent)',
  coral: 'var(--accent-warm)',
  teal: 'var(--accent-cool)',
}

export default function ProyectosEspecialidad() {
  return (
    <section className={styles.section} id="especialidad">
      <div className={styles.wrap}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.label}>02 — Especialidad</p>
          <h2 className={styles.title}>Render · Video · Animación</h2>
        </motion.header>

        <div className={styles.grid}>
          {specialtyProjects.map((project) => {
            const [file, ...rest] = project.meta.split(' · ')
            return (
              <motion.article
                key={project.id}
                className={project.featured ? styles.featured : styles.card}
                style={{ '--tone': TONE[project.tone] }}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.preview}>
                  <span className={styles.previewLabel}>{file}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.desc}>{project.description}</p>
                  <p className={styles.meta}>
                    <span className={styles.metaAccent}>{file}</span>
                    {rest.length > 0 ? ` · ${rest.join(' · ')}` : ''}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
