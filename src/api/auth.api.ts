import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AuthenticatedUser } from '../types/user'

export default (axios: AxiosInstance) => ({
  getMe(config?: AxiosRequestConfig) {
    return axios.get<{ data: AuthenticatedUser }>('/v1/auth/me', config)
  },
  login(payload: { email: string; password: string }, config?: AxiosRequestConfig) {
    return axios.post<{ data: AuthenticatedUser; token: string }>(
      '/v1/auth/login',
      {
        email: payload.email,
        password: payload.password,
      },
      config,
    )
  },
})
