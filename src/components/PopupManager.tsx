import { useState, useEffect } from 'react'
import Modal from './Modal'

const PopupManager = () => {
  const [showSaveDate, setShowSaveDate] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  useEffect(() => {
    // Check if popups were dismissed in this session
    const savedDateDismissed = localStorage.getItem('saveDateDismissed')
    const announcementDismissed = localStorage.getItem('announcementDismissed')

    // Show save date popup after 2 seconds if not dismissed
    if (!savedDateDismissed) {
      const timer = setTimeout(() => {
        setShowSaveDate(true)
      }, 2000)
      return () => clearTimeout(timer)
    }

    // Show announcement after save date is closed (if not dismissed)
    if (savedDateDismissed && !announcementDismissed) {
      const timer = setTimeout(() => {
        setShowAnnouncement(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseSaveDate = () => {
    setShowSaveDate(false)
    localStorage.setItem('saveDateDismissed', 'true')
  }

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false)
    localStorage.setItem('announcementDismissed', 'true')
  }

  return (
    <>
      <Modal
        isOpen={showSaveDate}
        onClose={handleCloseSaveDate}
        type="save-date"
        title="Mark your calendars for BKPMUN!"
        date="customizable"
      />
      <Modal
        isOpen={showAnnouncement}
        onClose={handleCloseAnnouncement}
        type="announcement"
        title="Important Announcement"
        content="customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable"
      />
    </>
  )
}

export default PopupManager

