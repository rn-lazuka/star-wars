import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { ChangeEvent, ReactNode, Ref } from 'react'
import type { InputProps } from '@mui/material/Input'
import { WithSx } from '../../types'
import ErrorIcon from '@mui/icons-material/Error'
import { convertSxToArray } from '../../utils'
import { InputBaseComponentProps, TextFieldProps } from '@mui/material'

type InputTextProps = Omit<TextFieldProps, 'error'> &
  WithSx<{
    error?: string
    helperText?: string | null
    name: string
    isDisabled?: boolean
    transform?: (
      event: ChangeEvent<HTMLInputElement>
    ) => ChangeEvent<HTMLInputElement>
    onBlurTransform?: (value: string) => string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    minRows?: number
    value: string
    onBlur?: () => void
    adornment?: string
    InputProps?: InputProps
    inputProps?: InputBaseComponentProps
    hiddenLabel?: boolean
    multiline?: boolean
    fullWidth?: boolean
    label?: string | ReactNode
    required?: boolean
    fieldRef?: Ref<HTMLElement>
  }>

export const InputText = ({
  error,
  helperText = null,
  name,
  isDisabled,
  transform,
  onBlurTransform,
  onChange,
  minRows,
  value,
  onBlur,
  InputProps,
  inputProps,
  hiddenLabel = false,
  multiline = false,
  fullWidth = true,
  label,
  required,
  fieldRef,
  sx = [],
  ...props
}: InputTextProps) => {
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    transform ? onChange(transform(event)) : onChange(event)
  }

  const onBlurProxy = () => {
    onBlurTransform
      ? onChange({
          target: { value: value ? onBlurTransform(value.trim()) : value }
        } as ChangeEvent<HTMLInputElement>)
      : onChange({
          target: { value: value && value?.trim ? value.trim() : value }
        } as ChangeEvent<HTMLInputElement>)
    onBlur && onBlur()
  }
  return (
    <TextField
      helperText={error || helperText}
      error={!!error}
      inputProps={{
        'data-testid': `${name}TextInput`,
        ...inputProps
      }}
      disabled={isDisabled}
      onChange={change}
      minRows={minRows}
      onBlur={onBlurProxy}
      value={value}
      InputProps={{
        endAdornment: error && (
          <InputAdornment
            position="end"
            sx={{
              position: 'absolute',
              right: ({ spacing }) => spacing(1),
              top: '50%'
            }}
          >
            <ErrorIcon
              sx={{
                color: (theme) => theme.palette.error.main,
                pointerEvents: 'none'
              }}
            />
          </InputAdornment>
        ),
        ...InputProps
      }}
      hiddenLabel={hiddenLabel}
      multiline={multiline}
      fullWidth={fullWidth}
      label={label}
      variant="filled"
      required={required}
      inputRef={fieldRef}
      sx={[
        { '& .MuiInputBase-multiline': { px: 2 }, '& textarea': { px: 0 } },
        // !!error && {
        //   '& .MuiInputBase-root': { backgroundColor: `rgba(186, 27, 27, .08)` }
        // },
        ...convertSxToArray(sx)
      ]}
      {...props}
    />
  )
}
