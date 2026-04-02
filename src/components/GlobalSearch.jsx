import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, User, ShoppingCart, FileEdit, Clock } from 'lucide-react'
import { patients, orders, drafts } from '../data/mockData'
import './GlobalSearch.css'

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) onClose() // toggle
      }
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const q = query.toLowerCase()

  const matchedPatients = q
    ? patients.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    : []

  const matchedOrders = q
    ? orders.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.jobNumber.toLowerCase().includes(q) ||
        o.patient.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
      )
    : []

  const matchedDrafts = q
    ? drafts.filter(d => d.patient.toLowerCase().includes(q) || d.id.toLowerCase().includes(q))
    : []

  const recentItems = !q ? [
    { type: 'patient', label: 'Emma Thompson', sub: 'P-1001', to: '/patients/P-1001' },
    { type: 'order', label: 'ORD-4521', sub: 'DAFO 3.5 — Manufacturing', to: '/orders/ORD-4521' },
    { type: 'draft', label: 'DRF-301', sub: 'DAFO 3.5 — Step 3', to: '/drafts' },
  ] : []

  const hasResults = matchedPatients.length || matchedOrders.length || matchedDrafts.length
  const showRecent = !q && recentItems.length > 0

  function handleNavigate(to) {
    navigate(to)
    onClose()
  }

  return (
    <div className="gs-overlay" onClick={onClose}>
      <div className="gs-modal animate-in" onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div className="gs-input-wrap">
          <Search size={20} className="gs-input-icon" />
          <input
            ref={inputRef}
            className="gs-input"
            type="text"
            placeholder="Search patient, order, or job #"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="gs-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="gs-results">
          {showRecent && (
            <div className="gs-group">
              <div className="gs-group-label">
                <Clock size={14} />
                Recent
              </div>
              {recentItems.map((item, i) => (
                <button key={i} className="gs-item" onClick={() => handleNavigate(item.to)}>
                  <span className="gs-item-icon">
                    {item.type === 'patient' && <User size={16} />}
                    {item.type === 'order' && <ShoppingCart size={16} />}
                    {item.type === 'draft' && <FileEdit size={16} />}
                  </span>
                  <span className="gs-item-label">{item.label}</span>
                  <span className="gs-item-sub">{item.sub}</span>
                </button>
              ))}
            </div>
          )}

          {q && matchedPatients.length > 0 && (
            <div className="gs-group">
              <div className="gs-group-label">
                <User size={14} />
                Patients
              </div>
              {matchedPatients.map(p => (
                <button key={p.id} className="gs-item" onClick={() => handleNavigate(`/patients/${p.id}`)}>
                  <span className="gs-item-icon"><User size={16} /></span>
                  <span className="gs-item-label">{p.name}</span>
                  <span className="gs-item-sub">{p.id} — {p.diagnosis}</span>
                </button>
              ))}
            </div>
          )}

          {q && matchedOrders.length > 0 && (
            <div className="gs-group">
              <div className="gs-group-label">
                <ShoppingCart size={14} />
                Orders
              </div>
              {matchedOrders.map(o => (
                <button key={o.id} className="gs-item" onClick={() => handleNavigate(`/orders/${o.id}`)}>
                  <span className="gs-item-icon"><ShoppingCart size={16} /></span>
                  <span className="gs-item-label">{o.id}</span>
                  <span className="gs-item-sub">{o.patient} — {o.product} — {o.status}</span>
                </button>
              ))}
            </div>
          )}

          {q && matchedDrafts.length > 0 && (
            <div className="gs-group">
              <div className="gs-group-label">
                <FileEdit size={14} />
                Drafts
              </div>
              {matchedDrafts.map(d => (
                <button key={d.id} className="gs-item" onClick={() => handleNavigate('/drafts')}>
                  <span className="gs-item-icon"><FileEdit size={16} /></span>
                  <span className="gs-item-label">{d.id}</span>
                  <span className="gs-item-sub">{d.patient} — Step {d.step}</span>
                </button>
              ))}
            </div>
          )}

          {q && !hasResults && (
            <div className="gs-empty">
              <p>No results for "{query}"</p>
              <span>Try searching by patient name, order ID, or job number</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
