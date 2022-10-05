import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth.service'

const LOGIN_PATH = '/login'
const HOME_PATH = '/'

type Props = {
  private?: boolean
  guest?: boolean
}

const AuthenticationRoute = (props: Props) => {
  const { isLoading, user } = useAuth()
  const location = useLocation()

  if ((props.private || props.guest) && isLoading) {
    return <div>Authenticating...</div>
  }

  if (props.private && !user) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} replace />
  }

  if (props.guest && user) {
    if (location.pathname === LOGIN_PATH) {
      const locationState = location.state as { from: Location } | undefined
      return <Navigate to={locationState?.from.pathname ?? HOME_PATH} replace />
    }

    return <Navigate to={HOME_PATH} replace />
  }

  return <Outlet />
}

export default AuthenticationRoute
