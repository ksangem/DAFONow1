import { useNavigate } from 'react-router-dom'
import { FileEdit, Clock, ArrowRight, Trash2, AlertCircle } from 'lucide-react'
import { drafts } from '../data/mockData'
import { useState } from 'react'
import './Drafts.css'

export default function Drafts() {
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState(null)
  const [draftList, setDraftList] = useState(drafts)

  function handleDelete() {
    setDraftList(draftList.filter(d => d.id !== deleteId))
    setDeleteId(null)
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now - d
    const hours = Math.floor(diff / 3600000)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  return (
    <div className="drafts-page animate-in">
      <div className="page-header">
        <div>
          <h1>Drafts</h1>
          <p>{draftList.length} saved drafts — resume where you left off</p>
        </div>
      </div>

      {draftList.length === 0 ? (
        <div className="card empty-state">
          <FileEdit size={48} />
          <h3>No drafts</h3>
          <p>Drafts are auto-saved as you create orders. Start a new order to begin.</p>
        </div>
      ) : (
        <div className="drafts-list">
          {draftList.map(d => (
            <div key={d.id} className="card drafts-card">
              <div className="drafts-card-top">
                <div className="drafts-card-icon">
                  <FileEdit size={20} />
                </div>
                <div className="drafts-card-info">
                  <h3>{d.patient}</h3>
                  <p>{d.product || 'Product not yet selected'} — Step {d.step} of 5</p>
                  <div className="drafts-card-time">
                    <Clock size={12} />
                    Last edited {formatDate(d.lastEdited)}
                  </div>
                </div>
                <div className="drafts-card-progress-wrap">
                  <div className="drafts-progress-circle">
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-gray-200)" strokeWidth="3" />
                      <circle
                        cx="24" cy="24" r="20" fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${d.progress * 1.256} 125.6`}
                        transform="rotate(-90 24 24)"
                      />
                    </svg>
                    <span className="drafts-progress-text">{d.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="drafts-card-actions">
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--color-gray-400)' }}
                  onClick={() => setDeleteId(d.id)}
                >
                  <Trash2 size={14} />
                  Discard
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate('/orders/new', { state: { draftId: d.id } })}
                >
                  Resume
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal animate-in" onClick={e => e.stopPropagation()}>
            <div className="modal-icon modal-icon--danger">
              <Trash2 size={24} />
            </div>
            <h2>Discard this draft?</h2>
            <p>This action cannot be undone. All progress will be lost.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button
                className="btn"
                style={{ background: 'var(--color-error)', color: 'white' }}
                onClick={handleDelete}
              >
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
