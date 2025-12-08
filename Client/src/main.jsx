import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index'
import { Provider } from "react-redux"
import { store } from './redux/store'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        theme="light"
      />

      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
