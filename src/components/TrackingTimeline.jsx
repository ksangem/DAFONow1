import { Check } from 'lucide-react'
import { trackingSteps } from '../data/mockData'
import './TrackingTimeline.css'

const statusOrder = ['submitted', 'review', 'manufacturing', 'shipped', 'delivered']

export default function TrackingTimeline({ currentStatus, compact = false }) {
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className={`tracking-timeline ${compact ? 'compact' : ''}`}>
      {trackingSteps.map((step, i) => {
        const isCompleted = i < currentIndex
        const isCurrent = i === currentIndex
        const isPending = i > currentIndex

        return (
          <div
            key={step.key}
            className={`tl-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''}`}
          >
            <div className="tl-indicator">
              <div className="tl-dot">
                {isCompleted && <Check size={12} strokeWidth={3} />}
                {isCurrent && <div className="tl-pulse" />}
              </div>
              {i < trackingSteps.length - 1 && <div className="tl-line" />}
            </div>
            {!compact && (
              <div className="tl-content">
                <span className="tl-label">{step.label}</span>
                <span className="tl-desc">{step.description}</span>
              </div>
            )}
            {compact && <span className="tl-label-compact">{step.label}</span>}
          </div>
        )
      })}
    </div>
  )
}
