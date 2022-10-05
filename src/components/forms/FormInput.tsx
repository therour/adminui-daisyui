import type { InputProps } from 'react-daisyui'
import { forwardRef, useId } from 'react'
import { Input } from 'react-daisyui'
import { WarningCircle } from 'phosphor-react'

interface FormInputProps extends InputProps {
  label?: string
  id?: string
  isError?: boolean
  errorMessage?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, id, isError, errorMessage, ...props },
  ref,
) {
  const randomId = useId()

  if (isError) {
    props.color = 'error'
  }

  return (
    <div className="form-control w-full">
      {Boolean(label) && (
        <div className="label">
          <label htmlFor={id ?? randomId} className="label-text">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}
      <Input {...props} ref={ref} id={id ?? randomId} />
      {Boolean(errorMessage && isError) && (
        <span className="error-helper">
          <WarningCircle weight="bold" size={14} className="mr-2" /> {errorMessage}
        </span>
      )}
    </div>
  )
})

export default FormInput
