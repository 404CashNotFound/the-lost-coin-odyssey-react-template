import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { chapters } from '@/data/story'
import Chapter from '@/components/Chapter'
import ScrollProgress from '@/components/ScrollProgress'
import styles from './Home.module.scss'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  return (
    <main className={styles.container} ref={containerRef}>
      <ScrollProgress progress={scrollYProgress} />
      
      {chapters.map((chapter, index) => (
        <Chapter 
          key={index}
          index={index}
          total={chapters.length}
          {...chapter}
        />
      ))}
    </main>
  )
}