import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Character } from '../../../types'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants'
import Stack from '@mui/material/Stack'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate()
  const { name, birthYear, gender, id } = character

  const handleClick = () => {
    navigate(`${ROUTES.characters}/${id}`)
  }
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { backgroundColor: (theme) => theme.palette.neutral.light }
      }}
      onClick={handleClick}
      data-testid={`character-${id}-card`}
    >
      <CardContent>
        <Typography variant="headerM">{name}</Typography>
        <Stack direction="row" gap={1}>
          <Typography variant="paragraphM" color="text.secondary">
            Birth Year:
          </Typography>
          <Typography variant="paragraphM">{birthYear}</Typography>
        </Stack>
        <Stack direction="row" gap={1}>
          <Typography variant="paragraphM" color="text.secondary">
            Gender:
          </Typography>
          <Typography variant="paragraphM">{gender}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
