import type { FieldValues, UseFormSetError } from 'react-hook-form'
import Api from '../api'

export function handleValidationError<T extends FieldValues>(setError: UseFormSetError<T>) {
  return (err: unknown) => {
    if (Api.isValidationError(err)) {
      Object.keys(err.response.data.errors).forEach((key, index) => {
        setError(key as never, { message: err.response.data.errors[key as never][0] }, { shouldFocus: index === 0 })
      })
      return
    }
    throw err
  }
}
