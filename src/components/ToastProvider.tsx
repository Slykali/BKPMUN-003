import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(42, 36, 31, 0.95)',
          color: '#f5f2ed',
          border: '1px solid rgba(217, 160, 99, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'Poppins, sans-serif',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#d9a063',
            secondary: '#f5f2ed',
          },
          style: {
            border: '1px solid rgba(217, 160, 99, 0.5)',
          },
        },
        error: {
          iconTheme: {
            primary: '#e74c3c',
            secondary: '#f5f2ed',
          },
        },
        loading: {
          iconTheme: {
            primary: '#e5b047',
            secondary: '#f5f2ed',
          },
        },
      }}
    />
  )
}

export default ToastProvider

