import { createContext } from 'react'
import type { ConfirmationDialogOptions } from './options'

export type ConfirmationFunction = (options: Partial<ConfirmationDialogOptions>) => Promise<boolean>
export const ConfirmationDialogContext = createContext<ConfirmationFunction | null>(null)
