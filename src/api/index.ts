import Axios from 'axios'
import useAuthStore from '../store/auth'
import authApi from './auth.api'
import { isError, isValidationError } from './utils'

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = Object.assign(config.headers || {}, {
      Authorization: `Bearer ${token}`,
    })
  }
  return config
})

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (Axios.isAxiosError(err) && err.response?.status === 401) {
      useAuthStore.getState().clearAuthentication()
      return
    }
    throw err
  },
)

const Api = {
  auth: authApi(axios),
  isError,
  isValidationError,
}

export default Api
