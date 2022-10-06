import { useQuery } from 'react-query'
import Api from '../api'
import useAuthStore, { AuthState, selectAuthState } from '../store/auth'
import { AuthenticatedUser } from '../types/user'

export const AuthService = {
  async getAuthenticatedUser() {
    const authStore = useAuthStore.getState()
    const authState = selectAuthState(authStore)
    let { user } = authStore

    if (authState === AuthState.authenticating) {
      const response = await Api.auth.getMe()
      authStore.authenticate(response.data.data)
      user = useAuthStore.getState().user
    }

    return user
  },

  async login({ email, password }: { email: string; password: string }) {
    const response = await Api.auth.login({ email, password })
    const { token, data: user } = response.data
    const { authenticate } = useAuthStore.getState()
    authenticate(user, token)
  },

  async logout() {
    const { clearAuthentication, setLoggingOut } = useAuthStore.getState()
    try {
      setLoggingOut(true)
      await Api.auth.logout()
    } finally {
      clearAuthentication()
      setLoggingOut(false)
    }
  },
}

export const useAuth = () => {
  const { data: user, isLoading } = useQuery(['auth'], AuthService.getAuthenticatedUser, {
    initialData: useAuthStore.getState().user ?? undefined,
  })

  return { user, isLoading }
}

export const useAuthUser = () => {
  const { data: user } = useQuery(['auth'], AuthService.getAuthenticatedUser)
  return user as AuthenticatedUser
}
