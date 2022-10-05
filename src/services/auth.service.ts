import { useQuery } from 'react-query'
import Api from '../api'
import useAuthStore from '../store/auth'
import { AuthenticatedUser } from '../types/user'
import shallow from 'zustand/shallow'

export const AuthService = {
  async getAuthenticatedUser() {
    let { user } = useAuthStore.getState()
    const { token, authenticate } = useAuthStore.getState()

    if (token && user === null) {
      const response = await Api.auth.getMe()
      authenticate(response.data.data)
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
}

export const useAuth = () => {
  const { data: user, isLoading } = useQuery(['auth'], AuthService.getAuthenticatedUser)
  const token = useAuthStore((state) => state.token)

  return { user, isLoading: Boolean(token && !user) && isLoading }
}

export const useAuthUser = () => {
  const { data: user } = useQuery(['auth'], AuthService.getAuthenticatedUser)
  return user as AuthenticatedUser
}
