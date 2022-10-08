import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import queryClient from '../common/query-client'
import TempLocalStorage from '../common/TempLocalStorage'
import { AuthenticatedUser } from '../types/user'

const USER_STORAGE_KEY = 'u'
const USER_STORAGE_TTL = 60_000 // 1 minutes
const TOKEN_STORAGE_KEY = 'authToken'

export enum AuthState {
  unauthenticated = 'unauthenticated',
  authenticating = 'authenticating',
  authenticated = 'authenticated',
  loggingout = 'loggingout',
}

export type AuthStoreState = {
  token: string
  user: AuthenticatedUser | null
  loggingOut: boolean
  authenticate: (user: AuthenticatedUser, token?: string) => void
  clearAuthentication: VoidFunction
  setLoggingOut: (loggingOut: boolean) => void
}

const getUserFromLocalStorage = () => {
  const userJSON = TempLocalStorage.getItem(USER_STORAGE_KEY)
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return user as AuthenticatedUser
  }
  return null
}

export const selectAuthState = (state: AuthStoreState) => {
  if (state.loggingOut) return AuthState.loggingout
  if (state.token && state.user) return AuthState.authenticated
  if (state.token && !state.user) return AuthState.authenticating
  return AuthState.unauthenticated
}

const useAuthStore = create<AuthStoreState>()(
  subscribeWithSelector((set) => {
    const user = getUserFromLocalStorage()
    const token = localStorage.getItem(TOKEN_STORAGE_KEY) ?? ''

    return {
      token,
      user,
      loggingOut: false,
      authenticate(user: AuthenticatedUser, token?: string) {
        if (token) {
          set({ user, token })
        } else {
          set({ user })
        }
      },
      clearAuthentication() {
        set({ user: null, token: '' })
      },
      setLoggingOut(loggingOut) {
        set({ loggingOut })
      },
    }
  }),
)

useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    if (user) {
      TempLocalStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user), USER_STORAGE_TTL) // 60 second
    } else {
      TempLocalStorage.removeItem(USER_STORAGE_KEY)
    }
  },
)

useAuthStore.subscribe(
  (state) => state.token,
  (token) => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  },
)

useAuthStore.subscribe(
  (state) => state.token,
  () => {
    queryClient.invalidateQueries(['auth'])
  },
)

export default useAuthStore
