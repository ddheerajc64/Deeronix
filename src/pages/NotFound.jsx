import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-3xl items-center justify-center">
      <section className="surface-card rounded-[1.5rem] p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">404</p>
        <h1 className="mt-2 text-4xl font-bold" style={{ color: 'var(--text)' }}>
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 muted-text">
          The page you are trying to open does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary">Go back home</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound
