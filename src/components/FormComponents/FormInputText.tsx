import type { InputProps } from '@mui/material/Input'
import React, { ChangeEvent, ReactNode } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { WithSx } from '../../types'
import { InputText } from '../../components'
import { InputBaseComponentProps } from '@mui/material'

export type FormInputTextProps<T extends FieldValues> = WithSx<{
  label?: string | ReactNode
  isDisabled?: boolean
  fullWidth?: boolean
  helperText?: string | null
  InputProps?: InputProps
  inputProps?: InputBaseComponentProps
  onBlurTransform?: (value: string) => string
  hiddenLabel?: boolean
  multiline?: boolean
  required?: boolean
  transform?: (
    event: ChangeEvent<HTMLInputElement>
  ) => ChangeEvent<HTMLInputElement>
  adornment?: string
  minRows?: number
}> &
  UseControllerProps<T>

export const FormInputText = <T extends FieldValues>({
  label,
  isDisabled,
  InputProps,
  inputProps,
  helperText,
  hiddenLabel,
  multiline,
  fullWidth,
  required,
  transform,
  onBlurTransform,
  adornment,
  minRows,
  sx,
  ...props
}: FormInputTextProps<T>) => {
  return (
    <Controller
      {...props}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
      }) => {
        return (
          <InputText
            error={error?.message}
            helperText={helperText}
            name={props.name}
            isDisabled={isDisabled}
            transform={transform}
            onBlurTransform={onBlurTransform}
            onChange={onChange}
            minRows={minRows}
            onBlur={onBlur}
            adornment={adornment}
            InputProps={InputProps}
            inputProps={inputProps}
            value={value || ''}
            hiddenLabel={hiddenLabel}
            multiline={multiline}
            fullWidth={fullWidth}
            label={label}
            required={required}
            sx={sx}
            fieldRef={ref}
          />
        )
      }}
    />
  )
}
