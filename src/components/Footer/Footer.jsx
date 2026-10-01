import { motion } from 'framer-motion'
import { contact } from '../../data/contact.js'
import styles from './Footer.module.css'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <motion.div
        className={styles.wrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.label}>04 — Contacto</p>
        <h2 className={styles.title}>¿Trabajamos juntos?</h2>

        <div className={styles.links}>
          <a className={styles.link} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className={styles.link} href={contact.github} target="_blank" rel="noreferrer">
            GitHub <span className={styles.arrow}>↗</span>
          </a>
          <a className={styles.link} href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span className={styles.arrow}>↗</span>
          </a>
        </div>

        <p className={styles.copyright}>© 2026 Jorge Cervantes</p>
      </motion.div>
    </footer>
  )
}
