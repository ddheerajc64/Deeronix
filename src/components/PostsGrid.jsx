function formatDate(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return String(dateValue)
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const fallbackPosts = [
  {
    id: 'post-1',
    title: 'Building Better Video Workflows',
    date: '2026-03-18',
    image:
      'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'post-2',
    title: 'What Is New In Deeronix This Month',
    date: '2026-03-12',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'post-3',
    title: 'Creator Tips: Faster Editing With Templates',
    date: '2026-03-05',
    image:
      'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80',
  },
]

function PostsGrid({ posts = fallbackPosts }) {
  return (
    <section className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--text)' }}>
          Latest Posts
        </h2>
        <span
          className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
        >
          Refreshed
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id || post.id || post.title}
            className="group overflow-hidden rounded-[1.2rem] border transition-transform duration-300 hover:-translate-y-1 lg:block lg:min-h-[22rem]"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              boxShadow: '0 18px 38px -28px rgba(0,0,0,0.48)',
            }}
          >
            <div className="flex items-center gap-4 p-3 lg:block lg:p-0">
              <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl lg:h-52 lg:w-full lg:rounded-none">
                <img
                  src={
                    post.image ||
                    'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 lg:p-5">
                <p
                  className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: 'var(--muted)' }}
                >
                  {post.category || 'general'}
                </p>
                <h3
                  className="line-clamp-2 text-base font-semibold leading-snug lg:text-lg"
                  style={{ color: 'var(--text)' }}
                >
                  {post.title}
                </h3>
                <p
                  className="mt-2 text-xs font-medium uppercase tracking-[0.14em] lg:text-sm"
                  style={{ color: 'var(--text)', opacity: 0.62 }}
                >
                  {formatDate(post.createdAt || post.date)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PostsGrid
