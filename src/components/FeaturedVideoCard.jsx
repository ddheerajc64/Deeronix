import { motion } from 'framer-motion'
import Button from './Button.jsx'
import { Link } from 'react-router-dom'

const MotionButton = motion.button

function FeaturedVideoCard({
  title = 'Featured Video',
  description = 'A quick spotlight on the most important release this week.',
  thumbnail = 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
  to = '/videos',
  onPlay,
}) {
  return (
    <article
      className="overflow-hidden rounded-[1.4rem] border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="group relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        <MotionButton
          type="button"
          onClick={onPlay}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.04 }}
          className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--text)',
            borderColor: 'var(--border)',
          }}
          aria-label={`Play ${title}`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M8 6v12l10-6-10-6z" fill="currentColor" />
          </svg>
        </MotionButton>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
          <span className="rounded-full border border-white/45 bg-black/35 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            Featured
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            4 min watch
          </span>
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <h3
          className="line-clamp-2 text-lg font-semibold leading-snug"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-6" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
        <Link to={to}>
          <Button variant="secondary">Watch Now</Button>
        </Link>
      </div>
    </article>
  )
}

export default FeaturedVideoCard
