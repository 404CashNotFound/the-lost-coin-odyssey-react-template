import { MotionConfig } from 'framer-motion'
import Home from '@/pages/Home'
import CustomCursor from '@/components/CustomCursor'
import '@/styles/global.scss'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      <Home />
    </MotionConfig>
  )
}
