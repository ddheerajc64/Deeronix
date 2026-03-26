import { useEffect, useState } from 'react'
import FeaturedVideoCard from '../components/FeaturedVideoCard.jsx'
import { getApiUrl } from '../lib/api.js'

function Videos() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadPosts = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(getApiUrl('/api/posts?limit=9'), {
          signal: controller.signal,
          credentials: 'include',
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch videos (${response.status})`)
        }

        const payload = await response.json()
        setPosts(Array.isArray(payload.data) ? payload.data : [])
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Failed to load videos.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
    return () => controller.abort()
  }, [])

  const featured = posts[0]

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <section className="surface-card rounded-[1.5rem] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
          Video Library
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
          Watch featured and latest uploads
        </h1>
      </section>

      <FeaturedVideoCard
        title={featured?.title || 'No featured video yet'}
        thumbnail={featured?.image}
        description={featured?.description}
        onPlay={() => {
          if (featured?.videoUrl) {
            window.open(featured.videoUrl, '_blank', 'noopener,noreferrer')
          }
        }}
      />

      {isLoading ? (
        <section className="surface-card rounded-[1.2rem] p-5 text-sm">Loading videos...</section>
      ) : null}

      {!isLoading && error ? (
        <section className="surface-card rounded-[1.2rem] p-5 text-sm" style={{ color: '#ef4444' }}>
          {error}
        </section>
      ) : null}

      {!isLoading && !error ? (
        posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id || post.title}
                className="surface-card overflow-hidden rounded-[1.2rem]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <h3 className="line-clamp-2 text-lg font-semibold" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm muted-text">{post.description}</p>
                  {post.videoUrl ? (
                    <a
                      href={post.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-semibold underline decoration-2 underline-offset-4"
                      style={{ color: 'var(--text)' }}
                    >
                      Watch on YouTube
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="surface-card rounded-[1.2rem] p-5 text-sm muted-text">
            No videos available yet.
          </section>
        )
      ) : null}
    </div>
  )
}

export default Videos
