import toast from 'react-hot-toast'

export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      icon: '✅',
      style: {
        background: 'rgba(42, 36, 31, 0.95)',
        color: '#f5f2ed',
        border: '1px solid rgba(217, 160, 99, 0.5)',
      },
    })
  }

  const showError = (message: string) => {
    toast.error(message, {
      icon: '❌',
      style: {
        background: 'rgba(42, 36, 31, 0.95)',
        color: '#f5f2ed',
        border: '1px solid rgba(231, 76, 60, 0.5)',
      },
    })
  }

  const showLoading = (message: string) => {
    return toast.loading(message, {
      style: {
        background: 'rgba(42, 36, 31, 0.95)',
        color: '#f5f2ed',
        border: '1px solid rgba(229, 176, 71, 0.5)',
      },
    })
  }

  const showInfo = (message: string) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: 'rgba(42, 36, 31, 0.95)',
        color: '#f5f2ed',
        border: '1px solid rgba(217, 160, 99, 0.5)',
      },
    })
  }

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
  }
}

