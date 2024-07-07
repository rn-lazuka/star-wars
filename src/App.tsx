import { ThemeProvider } from '@mui/material/'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { globalStyles, theme } from './styles'
import { Layout } from './containers'
import { ROUTES } from './constants'
import Character from './pages/Character/Character'
import Main from './pages/Main/Main'

function App() {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Router>
        <Routes>
          <Route path={ROUTES.main} element={<Layout />}>
            <Route index element={<Main />} />
            <Route
              path={`${ROUTES.main}${ROUTES.characters}/:id`}
              element={<Character />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
