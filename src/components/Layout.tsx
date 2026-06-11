import { Link, NavLink, Outlet } from 'react-router-dom'
import { useFlashcardsStore } from '../store/useFlashcardsStore'

const linkClass =
  'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-200/60 dark:hover:bg-slate-800/70'

export const Layout = () => {
  const theme = useFlashcardsStore((state) => state.theme)
  const toggleTheme = useFlashcardsStore((state) => state.toggleTheme)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link className="text-lg font-semibold" to="/">
            Theory Trainer
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink className={linkClass} to="/">
              Dashboard
            </NavLink>
            <NavLink className={linkClass} to="/topics">
              Topics
            </NavLink>
            <NavLink className={linkClass} to="/study/random">
              Random
            </NavLink>
            <NavLink className={linkClass} to="/study/weak">
              Weak Areas
            </NavLink>
            <NavLink className={linkClass} to="/search">
              Search
            </NavLink>
            <NavLink className={linkClass} to="/stats">
              Stats
            </NavLink>
            <button
              className="ml-2 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
              onClick={toggleTheme}
              type="button"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
