import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import PostsGrid from '../components/PostsGrid.jsx'
import FeaturedVideoCard from '../components/FeaturedVideoCard.jsx'
import { getApiUrl } from '../lib/api.js'
import Button from '../components/Button.jsx'

function Home() {
  const [posts, setPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true)
        setPostsError('')

        const response = await fetch(getApiUrl('/api/posts'), {
          method: 'GET',
          signal: controller.signal,
          credentials: 'include',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch posts (${response.status})`)
        }

        const payload = await response.json()
        const nextPosts = Array.isArray(payload.data) ? payload.data : []
        setPosts(nextPosts)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setPostsError(error.message || 'Failed to load posts.')
          setPosts([])
        }
      } finally {
        setIsLoadingPosts(false)
      }
    }

    fetchPosts()

    return () => controller.abort()
  }, [])

  const featuredPost = posts[0] || null

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <Hero subtitle="Discover videos, track updates, and manage everything in one polished Deeronix workspace." />

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="surface-card rounded-[1.3rem] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
            Quick Actions
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text)' }}>
            Manage your content pipeline
          </h2>
          <p className="mt-2 text-sm sm:text-base muted-text">
            Jump into your dashboard, upload new assets, or review the latest site updates.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/admin/dashboard">
              <Button variant="primary">Open Dashboard</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/updates">
              <Button variant="secondary">View Updates</Button>
            </Link>
          </div>
        </div>

        <div className="surface-card rounded-[1.3rem] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
            Live Status
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {posts.length}
              </p>
              <p className="text-xs uppercase tracking-[0.14em] muted-text">Published Posts</p>
            </div>
            <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {isLoadingPosts ? '...' : postsError ? 'Issue' : 'Online'}
              </p>
              <p className="text-xs uppercase tracking-[0.14em] muted-text">Feed Sync</p>
            </div>
          </div>
        </div>
      </section>

      {isLoadingPosts ? (
        <section
          className="surface-card rounded-[1.2rem] p-6 text-sm"
          style={{ color: 'var(--text)' }}
        >
          Loading posts...
        </section>
      ) : null}

      {!isLoadingPosts && postsError ? (
        <section
          className="surface-card rounded-[1.2rem] p-6 text-sm"
          style={{ color: '#ef4444' }}
        >
          Unable to load posts: {postsError}
        </section>
      ) : null}

      {!isLoadingPosts && !postsError ? (
        <>
          <FeaturedVideoCard
            title={featuredPost?.title || 'No featured video yet'}
            thumbnail={featuredPost?.image}
            description={
              featuredPost?.description ||
              'Publish your first content from the admin dashboard to highlight it here.'
            }
            to="/videos"
            onPlay={() => {
              if (featuredPost?.videoUrl) {
                window.open(featuredPost.videoUrl, '_blank', 'noopener,noreferrer')
              }
            }}
          />

          {posts.length > 0 ? (
            <PostsGrid posts={posts} />
          ) : (
            <section
              className="surface-card rounded-[1.2rem] p-6 text-sm"
              style={{ color: 'var(--text)' }}
            >
              No posts available yet.
            </section>
          )}
        </>
      ) : null}
    </div>
  )
}

export default Home
