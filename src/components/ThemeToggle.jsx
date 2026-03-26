import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const MotionButton = motion.button
const MotionSpan = motion.span

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M20 14.13A8 8 0 1 1 9.87 4 6.3 6.3 0 0 0 20 14.13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <MotionButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        backgroundColor: 'var(--card)',
        color: 'var(--text)',
        borderColor: 'var(--border)',
        boxShadow: '0 8px 20px -16px rgba(0,0,0,0.5)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <MotionSpan
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -25, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 25, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-flex"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </MotionSpan>
      </AnimatePresence>
    </MotionButton>
  )
}

export default ThemeToggle
