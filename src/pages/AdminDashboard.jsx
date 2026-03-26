import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PostForm from '../components/PostForm.jsx'

const MotionSection = motion.section

function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <MotionSection
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="surface-card rounded-[1.5rem] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
              Admin Workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
              Publish and manage Deeronix content
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base muted-text">
              Upload visuals, attach YouTube links, and keep your audience feed active with high quality updates.
            </p>
          </div>
          <Link
            to="/"
            className="rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#111111',
              borderColor: 'var(--border)',
            }}
          >
            Back to Home
          </Link>
        </div>
      </MotionSection>

      <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
        <PostForm />

        <aside className="surface-card h-fit rounded-[1.5rem] p-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Publishing Tips
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 muted-text">
            <li>Use clear thumbnails with high contrast text.</li>
            <li>Keep titles concise and specific to the value.</li>
            <li>Prefer short descriptions with one strong CTA.</li>
            <li>Use categories consistently for cleaner feeds.</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default AdminDashboard
