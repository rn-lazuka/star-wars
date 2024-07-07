import React from 'react'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import Button from '@mui/material/Button'
import { FormInputText } from '../../FormComponents/FormInputText'
import { Character, CharacterForm } from '../../../types'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

interface CharacterFormViewProps {
  setCharacter: React.Dispatch<React.SetStateAction<Character | undefined>>
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  control: Control<CharacterForm>
  handleSubmit: UseFormHandleSubmit<CharacterForm>
}

export const CharacterFormView = ({
  setCharacter,
  handleSubmit,
  control,
  setIsEditing
}: CharacterFormViewProps) => {
  const onSubmit = (data: CharacterForm) => {
    setCharacter((prevState) => ({ ...prevState!, ...data }))
    setIsEditing(false)
  }

  return (
    <Paper sx={{ p: 3, borderRadius: '30px' }}>
      <Stack direction="column" gap={1}>
        <FormInputText
          control={control}
          name="name"
          label="Name"
          rules={{
            required: { value: true, message: 'Please enter a name' }
          }}
        />
        <FormInputText
          control={control}
          name="birthYear"
          label="Birth Year"
          rules={{
            required: { value: true, message: 'Please enter a date' }
          }}
        />
        <FormInputText
          control={control}
          name="gender"
          label="Gender"
          rules={{
            required: { value: true, message: 'Please enter a gender' }
          }}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          data-testid="submitCharacterFormButton"
        >
          Save
        </Button>
      </Stack>
    </Paper>
  )
}
