import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

function Layout() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
        <div
          className="absolute -left-24 -top-16 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
        />
        <div
          className="absolute right-0 top-8 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
        />
      </div>

      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] lg:grid lg:grid-cols-[18rem_1fr]">
        <Sidebar />

        <main className="min-w-0 px-4 pb-8 pt-6 sm:px-6 lg:px-10 lg:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
