import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ADMIN_EMAIL = 'admin@deeronix.com'

function AdminRouteWithClerk() {
  const { isLoaded, isSignedIn, user } = useUser()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="surface-card rounded-xl px-4 py-6 text-sm" style={{ color: 'var(--text)', opacity: 0.75 }}>
        Checking admin access...
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  const adminEmail = ADMIN_EMAIL.toLowerCase()
  const userEmails = [
    user.primaryEmailAddress?.emailAddress,
    ...(user.emailAddresses?.map((email) => email.emailAddress) ?? []),
  ]
    .filter(Boolean)
    .map((email) => email.toLowerCase())

  const hasAdminAccess = userEmails.includes(adminEmail)

  if (!hasAdminAccess) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

function AdminRoute() {
  const isClerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
  const location = useLocation()

  if (!isClerkEnabled) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <AdminRouteWithClerk />
}

export default AdminRoute
