import { useEffect } from 'react'
import { useFlashcardsStore } from '../store/useFlashcardsStore'

export const useThemeEffect = (): void => {
  const theme = useFlashcardsStore((state) => state.theme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }

    document.documentElement.classList.remove('dark')
  }, [theme])
}
