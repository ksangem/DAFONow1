import { AlertCircle, FileEdit, Clock, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AwarenessStrip.css'

export default function AwarenessStrip() {
  const [visible, setVisible] = useState(true)
  const [alerts] = useState([
    {
      id: 1,
      type: 'draft',
      icon: FileEdit,
      message: 'You have 3 unsaved drafts',
      action: { label: 'View Drafts', to: '/drafts' },
    },
  ])

  if (!visible || alerts.length === 0) return null

  const alert = alerts[0]
  const Icon = alert.icon

  return (
    <div className={`awareness-strip awareness-strip--${alert.type}`}>
      <div className="awareness-strip-content">
        <Icon size={16} />
        <span>{alert.message}</span>
        {alert.action && (
          <Link to={alert.action.to} className="awareness-strip-action">
            {alert.action.label}
          </Link>
        )}
      </div>
      <button
        className="awareness-strip-close"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
