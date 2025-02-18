import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .imageContainer')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          damping: 30,
          mass: 0.5,
          stiffness: 400
        }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          damping: 35,
          mass: 0.8,
          stiffness: 300
        }}
      />

      <style jsx global>{`
        body {
          cursor: none;
        }

        .cursor-dot {
          position: fixed;
          z-index: 9999;
          pointer-events: none;
          width: 10px;
          height: 10px;
          background: var(--color-accent);
          border-radius: 50%;
          mix-blend-mode: difference;
        }

        .cursor-ring {
          position: fixed;
          z-index: 9998;
          pointer-events: none;
          width: 40px;
          height: 40px;
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          opacity: 0.5;
          mix-blend-mode: difference;
        }
      `}</style>
    </>
  )
}