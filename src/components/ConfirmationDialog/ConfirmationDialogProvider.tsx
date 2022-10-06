import { useCallback, useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog'
import { ConfirmationDialogContext } from './context'
import { ConfirmationDialogOptions, buildOptions } from './options'

type ConfirmationDialogProviderProps = {
  children: React.ReactNode
  defaultOptions?: Partial<ConfirmationDialogOptions>
}
const ConfirmationDialogProvider: React.FC<ConfirmationDialogProviderProps> = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState<Partial<ConfirmationDialogOptions>>({})
  const [promiseHandler, setPromiseHandler] = useState<{
    resolve?: (val: boolean) => void
    reject?: (reason: unknown) => void
  }>({})

  const confirm = useCallback((options = {}) => {
    return new Promise<boolean>((resolve, reject) => {
      setOptions(options)
      setPromiseHandler({ resolve, reject })
    })
  }, [])

  const handleClose = useCallback(() => {
    setPromiseHandler({})
  }, [])

  const handleCancel = useCallback(() => {
    if (promiseHandler.resolve) {
      promiseHandler.resolve(false)
    }
    handleClose()
  }, [promiseHandler, handleClose])

  const handleConfirm = useCallback(() => {
    if (promiseHandler.resolve) {
      promiseHandler.resolve(true)
    }
    handleClose()
  }, [promiseHandler, handleClose])

  return (
    <>
      <ConfirmationDialogContext.Provider value={confirm}>{children}</ConfirmationDialogContext.Provider>
      <ConfirmationDialog
        open={Boolean(promiseHandler.resolve && promiseHandler.reject)}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        options={buildOptions(defaultOptions, options)}
      />
    </>
  )
}

export default ConfirmationDialogProvider
