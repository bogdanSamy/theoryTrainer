import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { useThemeEffect } from './hooks/useThemeEffect'

const App = () => {
  useThemeEffect()

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
