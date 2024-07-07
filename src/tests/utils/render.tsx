import React, { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/'
import {
  queries,
  render as rtlRender,
  RenderOptions
} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { theme } from '../../styles'

type WrapperProps = {
  children?: ReactNode
}

export const render = (ui: ReactElement, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions } as RenderOptions<
    typeof queries
  >)
}
