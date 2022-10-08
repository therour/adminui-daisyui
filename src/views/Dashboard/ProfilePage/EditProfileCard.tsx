import { Button, Card } from 'react-daisyui'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/forms/FormInput'
import { useAuthUser } from '../../../services/auth.service'

const EditProfileCard = () => {
  const user = useAuthUser()

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: user.name,
    },
  })
  return (
    <Card className="bg-base-100 shadow-sm">
      <Card.Body>
        <Card.Title>Edit Profile</Card.Title>
        <form onSubmit={handleSubmit(console.log)} className="mt-6 flex flex-col gap-4">
          <FormInput label="E-Mail Address" value={user.email} disabled />
          <FormInput label="Name" {...register('name')} />
          <Card.Actions className="mt-4 justify-end">
            <Button color="primary" disabled={!formState.isDirty}>
              Save Changes
            </Button>
          </Card.Actions>
        </form>
      </Card.Body>
    </Card>
  )
}

export default EditProfileCard
