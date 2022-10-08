import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import FormInput from '../../../components/forms/FormInput'

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1),
    new_password: z.string().min(8),
    new_password_confirmation: z.string().min(1),
  })
  .superRefine(({ new_password, new_password_confirmation }, ctx) => {
    if (new_password_confirmation && new_password_confirmation !== new_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password did not match',
        path: ['new_password_confirmation'],
      })
    }
  })

const ChangePasswordCard = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  })

  const { errors } = formState

  return (
    <Card className="bg-base-100 shadow-sm">
      <Card.Body>
        <Card.Title>Change Password</Card.Title>
        <form onSubmit={handleSubmit(console.log)} className="mt-6 flex flex-col gap-4">
          <FormInput
            label="Current Password"
            type="password"
            autoComplete="current-password"
            {...register('current_password')}
            isError={Boolean(errors.current_password)}
            errorMessage={errors.current_password?.message}
          />
          <FormInput
            label="New Password"
            type="password"
            autoComplete="new-password"
            {...register('new_password')}
            isError={Boolean(errors.new_password)}
            errorMessage={errors.new_password?.message}
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            autoComplete="off"
            {...register('new_password_confirmation')}
            isError={Boolean(errors.new_password_confirmation)}
            errorMessage={errors.new_password_confirmation?.message}
          />
          <Card.Actions className="mt-4 justify-end">
            <Button color="primary" disabled={!formState.isDirty || !formState.isValid}>
              Change Password
            </Button>
          </Card.Actions>
        </form>
      </Card.Body>
    </Card>
  )
}

export default ChangePasswordCard
