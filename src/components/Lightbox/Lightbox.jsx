import { useEffect } from 'react'
import styles from './Lightbox.module.css'

export default function Lightbox({ items, index, title, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  if (!items?.length) return null
  const item = items[index]

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={title || 'Galería'}>
      <button className={styles.close} onClick={onClose} aria-label="Cerrar">
        ✕
      </button>

      {items.length > 1 && (
        <>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}

      <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video className={styles.media} src={item.src} poster={item.poster} controls autoPlay muted loop playsInline />
        ) : item.type === 'youtube' ? (
          <iframe
            className={styles.media}
            src={`https://www.youtube.com/embed/${item.videoId}`}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img className={styles.media} src={item.src} alt={title || ''} />
        )}

        {items.length > 1 && <div className={styles.counter}>{index + 1} / {items.length}</div>}
      </div>
    </div>
  )
}
