import { Tooltip } from 'react-daisyui'
import { useAuthUser } from '../../services/auth.service'

const DashboardPage = () => {
  const authUser = useAuthUser()
  return (
    <div>
      Hi,{' '}
      <Tooltip message={authUser.email} className="tooltip-right" open={true}>
        {authUser.name}
      </Tooltip>
    </div>
  )
}

export default DashboardPage
