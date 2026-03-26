import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import Button from './Button.jsx'

const MotionNav = motion.nav

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Videos', to: '/videos' },
  { label: 'Updates', to: '/updates' },
  { label: 'About', to: '/about' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isClerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-lg font-bold tracking-tight"
          style={{ color: 'var(--text)' }}
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--accent)] text-sm font-extrabold text-[#111111]">
            D
            <span className="absolute inset-0 bg-gradient-to-br from-white/35 to-transparent opacity-80" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold sm:text-lg">Deeronix</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
              Creator Hub
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className="rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={({ isActive }) => ({
                color: isActive ? '#111111' : 'var(--text)',
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                opacity: isActive ? 1 : 0.84,
                boxShadow: isActive ? '0 10px 22px -16px rgba(0,0,0,0.5)' : 'none',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden items-center gap-2 sm:flex">
            {isClerkEnabled ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="secondary" className="h-10 px-4">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <NavLink
                    to="/admin/dashboard"
                    className="rounded-xl border px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{
                      borderColor: 'var(--accent)',
                      backgroundColor: 'var(--accent)',
                      color: '#111111',
                    }}
                  >
                    Dashboard
                  </NavLink>
                  <div className="accent-ring rounded-full p-0.5">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: {
                            width: '36px',
                            height: '36px',
                          },
                        },
                      }}
                    />
                  </div>
                </SignedIn>
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded-xl border px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--text)',
                }}
              >
                Login
              </NavLink>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            style={{
              color: 'var(--text)',
              borderColor: 'var(--border)',
              backgroundColor: 'var(--card)',
            }}
          >
            <span className="sr-only">Menu</span>
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <MotionNav
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t lg:hidden"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <ul className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                    style={({ isActive }) => ({
                      color: isActive ? '#111111' : 'var(--text)',
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                      opacity: isActive ? 1 : 0.88,
                    })}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 border-t px-4 pb-4 pt-3" style={{ borderColor: 'var(--border)' }}>
              {isClerkEnabled ? (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="secondary" className="h-10 px-4">
                        Login
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <NavLink
                      to="/admin/dashboard"
                      className="rounded-xl border px-3 py-2 text-sm font-semibold"
                      style={{
                        borderColor: 'var(--accent)',
                        backgroundColor: 'var(--accent)',
                        color: '#111111',
                      }}
                    >
                      Dashboard
                    </NavLink>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="rounded-xl border px-3 py-2 text-sm font-semibold"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--text)',
                  }}
                >
                  Login
                </NavLink>
              )}
            </div>
          </MotionNav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
