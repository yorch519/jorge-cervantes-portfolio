import { motion } from 'framer-motion'
import { codeProjects } from '../../data/codeProjects.js'
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
          <p className={styles.label}>02 — Código</p>
          <h2 className={styles.title}>As bajo la manga</h2>
        </motion.header>

        <div className={styles.grid}>
          {codeProjects.map((project) => (
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
              <div className={styles.head}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.stack}>{project.stack}</p>
              </div>
              <p className={styles.desc}>{project.description}</p>
              <div className={styles.links}>
                <a className={styles.link} href={project.repo} target="_blank" rel="noreferrer">
                  repo <span className={styles.arrow}>↗</span>
                </a>
                <a className={styles.link} href={project.demo} target="_blank" rel="noreferrer">
                  demo <span className={styles.arrow}>↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
