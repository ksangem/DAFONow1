import { Search, Bell, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { notifications } from '../data/mockData'
import './Header.css'

export default function Header({ onSearchOpen }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef(null)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="app-header">
      {/* Search trigger */}
      <button className="header-search" onClick={onSearchOpen}>
        <Search size={18} />
        <span>Search patient, order, or job #</span>
        <kbd className="header-search-kbd">Ctrl+K</kbd>
      </button>

      <div className="header-right">
        {/* Notifications */}
        <div className="header-notif-wrap" ref={notifRef}>
          <button
            className="header-icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="header-notif-badge">{unreadCount}</span>
            )}
          </button>

          {notifOpen && (
            <div className="header-notif-dropdown animate-in">
              <div className="header-notif-header">
                <span className="header-notif-title">Notifications</span>
                <button className="header-notif-mark">Mark all read</button>
              </div>
              <div className="header-notif-list">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`header-notif-item ${!n.read ? 'unread' : ''}`}
                  >
                    <div className="header-notif-dot" />
                    <div className="header-notif-content">
                      <p>{n.message}</p>
                      <span className="header-notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
