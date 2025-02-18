import { motion, useTransform, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Chapter.module.scss'
import SoundManager from './SoundManager'

export default function Chapter({ index, title, content, image, theme, total, sound }) {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.section
      className={`${styles.chapter} ${styles[theme]}`}
      data-chapter={`0${index + 1}/0${total}`}
    >
      <motion.div 
        className={styles.content}
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <h2>
          <span>Chapter {String(index + 1).padStart(2, '0')}</span>
          {title}
        </h2>
        <p>{content}</p>
      </motion.div>

      <motion.div 
        className={styles.imageContainer}
        initial={{ scale: 1.1 }}
        animate={inView ? { scale: 1 } : {}}
        style={{ y, opacity }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
        />
      </motion.div>
      <SoundManager sound={sound} isVisible={inView} />
    </motion.section>
  )
}