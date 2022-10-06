import { CircleNotch } from 'phosphor-react'
import { Modal } from 'react-daisyui'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth.service'
import useAuthStore, { AuthState, selectAuthState } from '../store/auth'

const LOGIN_PATH = '/login'
const HOME_PATH = '/'

type Props = {
  private?: boolean
  guest?: boolean
}

const AuthenticationRoute = (props: Props) => {
  const { isLoading, user } = useAuth()
  const location = useLocation()
  const authState = useAuthStore(selectAuthState)

  if ((props.private || props.guest) && isLoading) {
    return (
      <Modal open={true} className="mb-auto mt-32 max-w-[200px] text-center">
        <Modal.Body>
          <CircleNotch className="inline-block animate-spin" weight="bold" size={32} />
          <div className="mt-4">Getting User Data...</div>
        </Modal.Body>
      </Modal>
    )
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

  return (
    <>
      <Outlet />
      <Modal open={authState === AuthState.loggingout} className="mb-auto mt-32 max-w-[200px] text-center">
        <Modal.Body>
          <CircleNotch className="inline-block animate-spin" weight="bold" size={32} />
          <div className="mt-4">Logging Out...</div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthenticationRoute
