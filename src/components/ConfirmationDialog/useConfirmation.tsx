import { useCallback, useContext, useEffect, useRef } from 'react'
import type { ConfirmationDialogOptions } from './options'
import { ConfirmationDialogContext, ConfirmationFunction } from './context'

const useConfirmation = (options: Partial<ConfirmationDialogOptions> = {}) => {
  const confirmation = useContext(ConfirmationDialogContext) as ConfirmationFunction
  const hookOptionsRef = useRef(options)
  useEffect(() => {
    hookOptionsRef.current = options
  }, [options])

  return useCallback(
    (options: Partial<ConfirmationDialogOptions> = {}) => {
      return confirmation({ ...hookOptionsRef.current, ...options })
    },
    [confirmation],
  )
}

export default useConfirmation
