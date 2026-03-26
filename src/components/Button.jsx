import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const variantStyles = {
  primary: {
    backgroundColor: 'var(--accent)',
    color: '#111111',
    borderColor: 'var(--border)',
  },
  secondary: {
    backgroundColor: 'var(--card)',
    color: 'var(--text)',
    borderColor: 'var(--border)',
  },
  icon: {
    backgroundColor: 'var(--card)',
    color: 'var(--text)',
    borderColor: 'var(--border)',
  },
}

const variantClasses = {
  primary: 'h-11 px-4 py-2.5',
  secondary: 'h-11 px-4 py-2.5',
  icon: 'h-10 w-10 rounded-full p-0',
}

const baseClasses =
  'button-base inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50'

const MAX_RIPPLES = 3
const RIPPLE_LIFETIME_MS = 600
const MotionButton = motion.button

const getCanHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

const getRipplePoint = (event, targetRect) => {
  if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
    return {
      x: event.clientX - targetRect.left,
      y: event.clientY - targetRect.top,
    }
  }

  return {
    x: targetRect.width / 2,
    y: targetRect.height / 2,
  }
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    className = '',
    type = 'button',
    children,
    style,
    disabled = false,
    onPointerDown,
    onClick,
    ...props
  },
  ref,
) {
  const { isDark } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const rippleIdRef = useRef(0)
  const [ripples, setRipples] = useState([])
  const [canHover, setCanHover] = useState(getCanHover)
  const safeVariant = variantStyles[variant] ? variant : 'primary'

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const syncCanHover = (event) => setCanHover(event.matches)

    mediaQuery.addEventListener('change', syncCanHover)

    return () => {
      mediaQuery.removeEventListener('change', syncCanHover)
    }
  }, [])

  const createRipple = (event) => {
    if (disabled || prefersReducedMotion) {
      return
    }

    const targetRect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(targetRect.width, targetRect.height) * 1.7
    const point = getRipplePoint(event, targetRect)
    const id = rippleIdRef.current++

    setRipples((currentRipples) => {
      const nextRipples = [...currentRipples, { id, size, ...point }]
      return nextRipples.slice(-MAX_RIPPLES)
    })

    window.setTimeout(() => {
      setRipples((currentRipples) =>
        currentRipples.filter((ripple) => ripple.id !== id),
      )
    }, RIPPLE_LIFETIME_MS)
  }

  const hoverAnimation = useMemo(() => {
    if (!canHover || disabled || prefersReducedMotion) {
      return undefined
    }

    if (isDark) {
      return {
        y: -1,
        boxShadow:
          '0 0 0 1px var(--accent), 0 0 16px 0 var(--accent), 0 6px 16px -10px var(--accent)',
      }
    }

    return {
      y: -3,
      boxShadow: '0 12px 24px -14px rgba(26, 26, 26, 0.45)',
    }
  }, [canHover, disabled, prefersReducedMotion, isDark])

  const tapAnimation =
    disabled || prefersReducedMotion
      ? undefined
      : {
          scale: 0.97,
        }

  const handlePointerDown = (event) => {
    createRipple(event)
    onPointerDown?.(event)
  }

  const handleClick = (event) => {
    if (event.detail === 0) {
      createRipple(event)
    }

    onClick?.(event)
  }

  return (
    <MotionButton
      ref={ref}
      type={type}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={`${baseClasses} ${variantClasses[safeVariant]} ${className}`}
      style={{ ...variantStyles[safeVariant], ...style }}
      {...props}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="button-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          aria-hidden="true"
        />
      ))}
    </MotionButton>
  )
})

export default Button
