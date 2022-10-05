import create from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import queryClient from '../common/query-client'
import TempLocalStorage from '../common/tempLocalStorage'
import { AuthenticatedUser } from '../types/user'

const USER_STORAGE_KEY = 'u'
const USER_STORAGE_TTL = 15_000 // 15 seconds
const TOKEN_PERSIST_KEY = 'auth'

export type AuthState = {
  token: string
  authenticating: boolean
  user: AuthenticatedUser | null
  authenticate: (user: AuthenticatedUser, token?: string) => void
  clearAuthentication: VoidFunction
}

const getUserFromLocalStorage = () => {
  const userJSON = TempLocalStorage.getItem(USER_STORAGE_KEY)
  if (userJSON) {
    const user = JSON.parse(userJSON)
    queryClient.setQueryData(['auth'], user)
    return user
  }
  return null
}

const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        token: '',
        authenticating: false,
        user: getUserFromLocalStorage(),
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
      }),
      {
        name: TOKEN_PERSIST_KEY,
        partialize: (state) => ({ token: state.token } as AuthState),
      },
    ),
  ),
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
  () => {
    queryClient.resetQueries(['auth'])
  },
)

export default useAuthStore
