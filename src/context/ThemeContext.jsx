import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'

const ThemeContext = createContext(undefined)

const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return LIGHT_THEME
  }

  return window.matchMedia(MEDIA_QUERY).matches ? DARK_THEME : LIGHT_THEME
}

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  const theme = selectedTheme ?? systemTheme

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY)
    const syncSystemTheme = (event) => {
      setSystemTheme(event.matches ? DARK_THEME : LIGHT_THEME)
    }

    mediaQuery.addEventListener('change', syncSystemTheme)

    return () => {
      mediaQuery.removeEventListener('change', syncSystemTheme)
    }
  }, [])

  const setTheme = useCallback((nextTheme) => {
    if (nextTheme === LIGHT_THEME || nextTheme === DARK_THEME) {
      setSelectedTheme(nextTheme)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setSelectedTheme((currentTheme) => {
      const activeTheme = currentTheme ?? systemTheme
      return activeTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME
    })
  }, [systemTheme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === DARK_THEME,
      setTheme,
      toggleTheme,
      systemTheme,
    }),
    [theme, setTheme, toggleTheme, systemTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
