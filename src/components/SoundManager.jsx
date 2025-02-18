import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function SoundManager({ sound, isVisible }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isVisible && !isPlaying) {
      audioRef.current.volume = 0
      audioRef.current.play()
      controls.start({
        opacity: 1,
        transition: { duration: 2 }
      })
      // Fade in audio
      const fadeIn = setInterval(() => {
        if (audioRef.current.volume < 0.15) {
          audioRef.current.volume += 0.01
        } else {
          clearInterval(fadeIn)
        }
      }, 100)
      setIsPlaying(true)
    } else if (!isVisible && isPlaying) {
      // Fade out audio
      const fadeOut = setInterval(() => {
        if (audioRef.current.volume > 0) {
          audioRef.current.volume -= 0.01
        } else {
          audioRef.current.pause()
          clearInterval(fadeOut)
        }
      }, 100)
      controls.start({
        opacity: 0,
        transition: { duration: 1 }
      })
      setIsPlaying(false)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [isVisible, isPlaying, controls])

  return (
    <motion.div
      className="sound-indicator"
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <audio
        ref={audioRef}
        src={sound}
        loop
        preload="auto"
      />
      <style jsx global>{`
        .sound-indicator {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 30px;
          height: 30px;
          background: var(--color-accent);
          border-radius: 50%;
          opacity: 0.6;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .sound-indicator::before,
        .sound-indicator::after {
          content: '';
          position: absolute;
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          animation: soundWave 2s infinite;
        }

        .sound-indicator::before {
          width: 100%;
          height: 100%;
          animation-delay: 0.3s;
        }

        .sound-indicator::after {
          width: 100%;
          height: 100%;
          animation-delay: 0.6s;
        }

        @keyframes soundWave {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  )
}