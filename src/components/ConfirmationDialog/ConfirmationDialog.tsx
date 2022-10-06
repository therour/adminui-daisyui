import { Button, Modal } from 'react-daisyui'
import type { ConfirmationDialogOptions } from './options'

type ConfirmationDialogProps = {
  options: ConfirmationDialogOptions
  open: boolean
  onClose: VoidFunction
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

const ConfirmationDialog = ({ options, open, onClose, onCancel, onConfirm }: ConfirmationDialogProps) => {
  const {
    title,
    description,
    confirmationText,
    cancellationText,
    allowClose,
    cancelOnClose,
    confirmationButtonColor,
    maxWidth,
  } = options
  return (
    <Modal
      open={open}
      onClickBackdrop={allowClose ? (cancelOnClose ? onCancel : onClose) : undefined}
      className="mb-auto mt-32"
      style={{ maxWidth }}
    >
      {Boolean(title) && <Modal.Header className="text-center font-bold">{title}</Modal.Header>}
      {Boolean(description) && <Modal.Body className="text-center text-sm">{description}</Modal.Body>}
      <Modal.Actions className="justify-center">
        <Button color="ghost" onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color={confirmationButtonColor} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmationDialog
