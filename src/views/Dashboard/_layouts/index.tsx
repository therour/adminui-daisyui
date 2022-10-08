import { Bell, SignOut, User } from 'phosphor-react'
import { useCallback, useState } from 'react'
import { Button } from 'react-daisyui'
import { NavLink, Outlet } from 'react-router-dom'
import { useConfirmation } from '../../../components/ConfirmationDialog'
import { AuthService, useAuthUser } from '../../../services/auth.service'
import SidebarNavigation from './SidebarNavigation'

const Layout = () => {
  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-20 flex h-[56px] justify-between bg-base-100 px-4 shadow-sm">
        <div className="brand h-full text-lg font-bold leading-[56px] tracking-widest">
          Smart<span className="text-primary">CRM</span>
        </div>
        <HeaderNav />
      </header>
      <div className="flex min-h-screen bg-base-200 pt-[56px] pl-[64px]">
        <nav className="fixed top-[56px] bottom-0 left-0 z-10 flex w-[64px] flex-col items-center gap-3 bg-base-100 pt-8 pb-12 shadow-sm">
          <SidebarNavigation />
        </nav>
        <main className="h-full w-full px-5 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const HeaderNav = () => {
  const user = useAuthUser()

  const [loggingOut, setLoggingOut] = useState(false)
  const logoutConfirmation = useConfirmation()
  const handleLogout = useCallback(async () => {
    const ok = await logoutConfirmation({
      title: 'Are you sure you want to logout?',
      confirmationButtonColor: 'error',
      cancellationText: 'Cancel',
      confirmationText: 'Logout',
    })
    if (ok) {
      setLoggingOut(true)
      try {
        await AuthService.logout()
      } finally {
        setLoggingOut(false)
      }
    }
  }, [logoutConfirmation])

  return (
    <div className="flex h-full flex-row-reverse items-center gap-3">
      <Button color="ghost" shape="square" size="sm" disabled={loggingOut} onClick={handleLogout}>
        <SignOut weight="bold" size={24} />
      </Button>
      <div className="my-auto text-sm">{user.email}</div>
      <NavLink to="/profile" className="btn btn-ghost btn-square btn-sm">
        <User weight="bold" size={24} />
      </NavLink>
      <Button color="ghost" shape="square" size="sm">
        <Bell weight="bold" size={24} />
      </Button>
    </div>
  )
}

export default Layout
