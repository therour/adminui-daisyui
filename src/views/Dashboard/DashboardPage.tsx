import { useAuthUser } from '../../services/auth.service'

const DashboardPage = () => {
  const authUser = useAuthUser()
  return <div>Hi, {authUser.name}</div>
}

export default DashboardPage
