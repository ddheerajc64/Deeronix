import { SignIn } from '@clerk/clerk-react'

function Login() {
  const isClerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

  return (
    <section className="mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-6xl gap-5 px-4 py-8 lg:grid-cols-[1.05fr_1fr]">
      <div className="surface-card relative overflow-hidden rounded-[1.6rem] p-7 sm:p-8">
        <div
          className="absolute -right-8 top-[-20px] h-44 w-44 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.26 }}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
          Secure Access
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl" style={{ color: 'var(--text)' }}>
          Welcome back
        </h1>
        <p className="mt-3 max-w-md text-sm sm:text-base muted-text">
          Sign in to publish posts, upload assets, and manage your Deeronix dashboard.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] muted-text">
              Fast Publishing
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
              Add video updates in minutes.
            </p>
          </div>
          <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] muted-text">
              Managed Media
            </p>
            <p className="mt-1 text-sm" style={{ color: 'var(--text)' }}>
              Upload and organize visuals with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="surface-card flex items-center justify-center rounded-[1.6rem] p-4 sm:p-6">
        {isClerkEnabled ? (
          <SignIn
            path="/login"
            routing="path"
            forceRedirectUrl="/admin/dashboard"
            appearance={{
              variables: {
                colorPrimary: 'var(--accent)',
                colorBackground: 'transparent',
                colorText: 'var(--text)',
                colorInputBackground: 'var(--bg)',
                colorInputText: 'var(--text)',
                borderRadius: '14px',
              },
              elements: {
                rootBox: {
                  width: '100%',
                },
                card: {
                  border: '1px solid var(--border)',
                  boxShadow: 'none',
                  width: '100%',
                  maxWidth: '440px',
                  background: 'transparent',
                },
                formButtonPrimary: {
                  color: '#111111',
                },
                footerActionLink: {
                  color: 'var(--accent)',
                },
              },
            }}
          />
        ) : (
          <div className="w-full max-w-md rounded-xl border p-5 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
            Login is temporarily unavailable because Clerk is not configured.
            Add <code className="ml-1">VITE_CLERK_PUBLISHABLE_KEY</code> to enable authentication.
          </div>
        )}
      </div>
    </section>
  )
}

export default Login
