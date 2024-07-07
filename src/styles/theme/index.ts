import type { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import palette from './palette'
import typography from './typography'
import settings from './settings'

const themeOptions: ThemeOptions = {
  ...settings,
  palette,
  typography
}

const theme = createTheme(themeOptions)

export { palette, typography, settings }
export default theme
