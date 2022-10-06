import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import queryClient from './common/query-client'
import { ConfirmationDialogProvider } from './components/ConfirmationDialog'
import router from './router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmationDialogProvider>
        <RouterProvider router={router} />
      </ConfirmationDialogProvider>
    </QueryClientProvider>
  )
}

export default App
