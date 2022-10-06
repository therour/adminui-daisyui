import { Button } from 'react-daisyui'
import FormInput from '../components/forms/FormInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { AuthService } from '../services/auth.service'
import { handleValidationError } from '../common/utils'

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})

function LoginPage() {
  const { handleSubmit, register, formState, setError } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit((values) => {
    const payload = { email: values.email, password: values.password }
    return AuthService.login(payload).catch(handleValidationError(setError))
  })

  const { errors } = formState

  return (
    <div className=" flex min-h-screen items-start justify-center bg-base-200 pt-20">
      <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3 rounded-lg bg-base-100 p-4 sm:shadow-md">
        <FormInput
          label="E-Mail Address"
          placeholder="E-Mail Address"
          {...register('email')}
          errorMessage={errors?.email?.message}
          isError={Boolean(errors.email)}
        />
        <FormInput
          label="Password"
          placeholder="Password"
          type="password"
          errorMessage={errors?.password?.message}
          isError={Boolean(errors.password)}
          {...register('password')}
        />
        <Button type="submit" color="primary" loading={formState.isSubmitting} className="mt-4">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
