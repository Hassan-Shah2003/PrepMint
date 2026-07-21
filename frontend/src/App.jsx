import { useState } from 'react'
import {RouterProvider} from 'react-router-dom'
import router from './routes/app.routes.jsx'
import { AuthProvider } from './features/auth/context/auth.context.jsx'
import { ToastContainer } from 'react-toastify'
import { InterviewProvider } from './features/interview/context/interview.context.jsx'
function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
