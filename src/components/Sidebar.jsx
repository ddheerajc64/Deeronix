import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Home', to: '/', icon: 'H' },
  { label: 'Videos', to: '/videos', icon: 'V' },
  { label: 'Updates', to: '/updates', icon: 'U' },
  { label: 'About', to: '/about', icon: 'A' },
]

function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div
        className="sticky top-16 h-[calc(100vh-4rem)] border-r px-4 py-6"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
          <p
            className="px-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--text)', opacity: 0.65 }}
          >
            Discover
          </p>

          <nav className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={({ isActive }) => ({
                  color: isActive ? '#111111' : 'var(--text)',
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  opacity: isActive ? 1 : 0.85,
                  boxShadow: isActive ? '0 10px 22px -16px rgba(0,0,0,0.45)' : 'none',
                })}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[11px] font-bold">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
