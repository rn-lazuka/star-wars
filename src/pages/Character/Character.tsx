import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getCharacter } from '../../utils'
import { Character, CharacterForm } from '../../types'
import { CharacterFormView } from '../../components'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const Character = () => {
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [character, setCharacter] = useState<Character | undefined>(undefined)

  const { control, setValue, handleSubmit } = useForm<CharacterForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: character,
    shouldFocusError: true
  })

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return
      const data = await getCharacter(id)
      setCharacter(data)
      setValue('name', data.name)
      setValue('birthYear', data.birthYear)
      setValue('gender', data.gender)
    }
    fetchCharacter()
  }, [id, setValue])

  if (!character) return <div>Loading...</div>

  return (
    <Box sx={{ maxWidth: 500 }}>
      {isEditing ? (
        <CharacterFormView
          control={control}
          setCharacter={setCharacter}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Paper sx={{ p: 3, borderRadius: '30px' }}>
          <Stack direction="column" gap={1}>
            <Typography variant="headerM">{character.name}</Typography>
            <Stack direction="row" gap={1}>
              <Typography variant="paragraphM" color="text.secondary">
                Birth Year:
              </Typography>
              <Typography variant="paragraphM">
                {character.birthYear}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <Typography variant="paragraphM" color="text.secondary">
                Gender:
              </Typography>
              <Typography variant="paragraphM">{character.gender}</Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              data-testid="EditCharacterInfoButton"
            >
              edit
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  )
}

export default Character
