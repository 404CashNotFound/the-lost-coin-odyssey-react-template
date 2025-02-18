import { motion } from 'framer-motion'

export default function ScrollProgress({ progress }) {
  return (
    <motion.div 
      className="scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-accent)',
        transformOrigin: '0%',
        scaleX: progress,
        zIndex: 1000
      }}
    />
  )
}