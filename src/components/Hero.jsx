import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import Button from './Button.jsx'
import { Link } from 'react-router-dom'

const MotionDiv = motion.div
const MotionSpan = motion.span
const MotionHeading = motion.h1
const MotionParagraph = motion.p

function Hero({
  title = 'Welcome to Deeronix',
  subtitle = 'A focused creator workspace for publishing videos, tracking updates, and running your content flow with clarity.',
}) {
  const { isDark } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  const gradientLayer = isDark
    ? 'linear-gradient(120deg, rgba(0, 245, 255, 0.26) 0%, rgba(11, 15, 20, 0.96) 48%, rgba(0, 245, 255, 0.18) 100%)'
    : 'linear-gradient(120deg, rgba(255, 214, 10, 0.58) 0%, rgba(255, 248, 231, 0.96) 48%, rgba(255, 214, 10, 0.34) 100%)'

  const accentHalo = isDark
    ? 'radial-gradient(circle at 20% 20%, rgba(0,245,255,0.42) 0%, transparent 58%)'
    : 'radial-gradient(circle at 20% 20%, rgba(255,214,10,0.62) 0%, transparent 58%)'

  return (
    <section
      className="relative overflow-hidden rounded-[1.75rem] border p-8 sm:p-10 lg:p-14"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <MotionDiv
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: gradientLayer,
          backgroundSize: '220% 220%',
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <MotionDiv
        className="absolute -right-10 -top-10 -z-10 h-44 w-44 rounded-full blur-3xl"
        style={{
          backgroundColor: 'var(--accent)',
          opacity: isDark ? 0.22 : 0.3,
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -14, 0],
                y: [0, 12, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 -z-10" style={{ backgroundImage: accentHalo }} />

      <MotionSpan
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]"
        style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
      >
        New Content Platform
      </MotionSpan>

      <MotionHeading
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        style={{ color: 'var(--text)' }}
      >
        {title}
      </MotionHeading>

      <MotionParagraph
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        className="mt-4 max-w-2xl text-base leading-7 sm:text-lg"
        style={{ color: 'var(--muted)' }}
      >
        {subtitle}
      </MotionParagraph>

      <MotionDiv
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        <Link to="/videos">
          <Button variant="primary">Explore Videos</Button>
        </Link>
        <Link to="/updates">
          <Button variant="secondary">Latest Updates</Button>
        </Link>
      </MotionDiv>
    </section>
  )
}

export default Hero
