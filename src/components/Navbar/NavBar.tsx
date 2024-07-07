import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { pages } from '../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'

export const NavBar = () => {
  const navigate = useNavigate()
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const location = useLocation()
  const routeMatch = `${location.pathname.split('/')[1]}` || '/'

  const handleClick = (route: string) => {
    navigate(route)
  }
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        px: isXs ? 2 : 3,
        borderBottom: 'solid 1px #000000',
        backgroundColor: theme.palette.background.paper
      })}
    >
      {pages.map((page) => {
        return (
          <Button
            key={page.name}
            onClick={() => handleClick(page.path)}
            sx={[
              (theme) => ({
                px: 1,
                py: 2.5,
                color: theme.palette.text.primary
              }),
              routeMatch === page.path && {
                color: (theme) => theme.palette.primary.main
              }
            ]}
          >
            <Typography variant="labelMSB">{page.name}</Typography>
          </Button>
        )
      })}
    </Box>
  )
}
