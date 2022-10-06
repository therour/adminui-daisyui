import type { ComponentColor } from 'react-daisyui/dist/types'

export type ConfirmationDialogOptions = {
  title: string
  description: string
  confirmationText: string
  cancellationText: string
  confirmationButtonColor: ComponentColor
  allowClose?: boolean
  cancelOnClose?: boolean
  maxWidth?: string
}
export const DEFAULT_OPTIONS: ConfirmationDialogOptions = {
  title: 'Are you sure?',
  description: '',
  confirmationText: 'Yes',
  cancellationText: 'Cancel',
  confirmationButtonColor: 'primary',
  allowClose: true,
  cancelOnClose: true,
  maxWidth: '420px',
}

export const buildOptions = (
  defaultOptions: Partial<ConfirmationDialogOptions>,
  options: Partial<ConfirmationDialogOptions>,
): ConfirmationDialogOptions => ({
  ...DEFAULT_OPTIONS,
  ...defaultOptions,
  ...options,
})
