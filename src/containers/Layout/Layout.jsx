import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { NavBar } from '../../components'

export const Layout = () => {
  return (
    <Box sx={{ height: 1 }}>
      <NavBar />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
