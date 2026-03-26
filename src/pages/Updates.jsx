import { useEffect, useState } from 'react'
import { getApiUrl } from '../lib/api.js'

const formatDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Recently'
  }

  return date.toLocaleDateString()
}

function Updates() {
  const [updates, setUpdates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadUpdates = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(getApiUrl('/api/posts?limit=12'), {
          signal: controller.signal,
          credentials: 'include',
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch updates (${response.status})`)
        }

        const payload = await response.json()
        setUpdates(Array.isArray(payload.data) ? payload.data : [])
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Failed to load updates.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUpdates()
    return () => controller.abort()
  }, [])

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <section className="surface-card rounded-[1.5rem] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
          Product Updates
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
          What changed in Deeronix
        </h1>
        <p className="mt-2 text-sm sm:text-base muted-text">
          Track the latest content and release notes from the team.
        </p>
      </section>

      {isLoading ? (
        <section className="surface-card rounded-[1.2rem] p-5 text-sm">Loading updates...</section>
      ) : null}

      {!isLoading && error ? (
        <section className="surface-card rounded-[1.2rem] p-5 text-sm" style={{ color: '#ef4444' }}>
          {error}
        </section>
      ) : null}

      {!isLoading && !error ? (
        updates.length > 0 ? (
          <div className="space-y-4">
            {updates.map((post) => (
              <article
                key={post._id}
                className="surface-card rounded-[1.2rem] p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </h2>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] muted-text">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 muted-text">{post.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <section className="surface-card rounded-[1.2rem] p-5 text-sm muted-text">
            No updates yet.
          </section>
        )
      ) : null}
    </div>
  )
}

export default Updates
