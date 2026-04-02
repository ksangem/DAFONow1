import { Link, useNavigate } from 'react-router-dom'
import {
  Plus, ArrowRight, Clock, ShoppingCart, FileEdit, Truck,
  TrendingUp, Package, Users, AlertCircle
} from 'lucide-react'
import { orders, drafts, patients } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './Dashboard.css'

export default function Dashboard({ onSearchOpen }) {
  const navigate = useNavigate()

  const activeOrders = orders.filter(o => !['delivered'].includes(o.status))
  const recentOrders = orders.slice(0, 4)

  const statusLabel = {
    submitted: 'Submitted',
    review: 'In Review',
    manufacturing: 'Manufacturing',
    shipped: 'Shipped',
    delivered: 'Delivered',
  }

  return (
    <div className="dashboard animate-in">
      {/* Welcome header */}
      <div className="dash-welcome">
        <div>
          <h1 className="dash-welcome-title">Good morning, Dr. Lin</h1>
          <p className="dash-welcome-sub">
            Here's what's happening with your orders today.
          </p>
        </div>
        <Link to="/orders/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          New Order
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid-4 dash-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon--orders">
            <ShoppingCart size={20} />
          </div>
          <span className="stat-label">Active Orders</span>
          <span className="stat-value">{activeOrders.length}</span>
          <span className="stat-sub">2 submitted this week</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--drafts">
            <FileEdit size={20} />
          </div>
          <span className="stat-label">Drafts</span>
          <span className="stat-value">{drafts.length}</span>
          <span className="stat-sub">1 ready to submit</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--tracking">
            <Truck size={20} />
          </div>
          <span className="stat-label">In Transit</span>
          <span className="stat-value">{orders.filter(o => o.status === 'shipped').length}</span>
          <span className="stat-sub">ETA: Mar 28</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon--patients">
            <Users size={20} />
          </div>
          <span className="stat-label">Patients</span>
          <span className="stat-value">{patients.length}</span>
          <span className="stat-sub">{patients.filter(p => p.orders > 3).length} repeat patients</span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="dash-grid">
        {/* Left column */}
        <div className="dash-main">
          {/* Resume drafts */}
          {drafts.length > 0 && (
            <div className="card dash-drafts-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FileEdit size={18} />
                  Resume where you left off
                </h2>
                <Link to="/drafts" className="btn btn-ghost btn-sm">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              <div className="dash-drafts-list">
                {drafts.map(d => (
                  <button
                    key={d.id}
                    className="dash-draft-item"
                    onClick={() => navigate('/orders/new', { state: { draftId: d.id } })}
                  >
                    <div className="dash-draft-info">
                      <span className="dash-draft-patient">{d.patient}</span>
                      <span className="dash-draft-meta">
                        {d.product || 'Product not selected'} — Step {d.step} of 5
                      </span>
                    </div>
                    <div className="dash-draft-progress">
                      <div className="dash-draft-bar">
                        <div className="dash-draft-fill" style={{ width: `${d.progress}%` }} />
                      </div>
                      <span className="dash-draft-pct">{d.progress}%</span>
                    </div>
                    <div className="dash-draft-time">
                      <Clock size={12} />
                      {new Date(d.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <ArrowRight size={16} className="dash-draft-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent orders */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <ShoppingCart size={18} />
                Recent Orders
              </h2>
              <Link to="/orders" className="btn btn-ghost btn-sm">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Patient</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} onClick={() => navigate(`/orders/${o.id}`)}>
                    <td>
                      <span style={{ fontWeight: 600 }}>{o.id}</span>
                      <br />
                      <span style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>{o.jobNumber}</span>
                    </td>
                    <td>{o.patient}</td>
                    <td>{o.product}</td>
                    <td>
                      <span className={`status-badge status-${o.status}`}>
                        {statusLabel[o.status]}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-gray-500)', fontSize: '13px' }}>
                      {new Date(o.eta).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="dash-aside">
          {/* Tracking spotlight */}
          <div className="card dash-tracking-card">
            <div className="card-header">
              <h2 className="card-title">
                <Truck size={18} />
                Order Tracking
              </h2>
            </div>
            {activeOrders.slice(0, 2).map(o => (
              <div key={o.id} className="dash-track-item" onClick={() => navigate(`/orders/${o.id}`)}>
                <div className="dash-track-header">
                  <span className="dash-track-id">{o.id}</span>
                  <span className={`status-badge status-${o.status}`}>
                    {statusLabel[o.status]}
                  </span>
                </div>
                <span className="dash-track-patient">{o.patient} — {o.product}</span>
                <TrackingTimeline currentStatus={o.status} compact />
              </div>
            ))}
            <Link to="/tracking" className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
              View All Tracking <ArrowRight size={14} />
            </Link>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h2>
            <div className="dash-quick-actions">
              <Link to="/orders/new" className="dash-qa">
                <div className="dash-qa-icon"><Plus size={18} /></div>
                <span>New Order</span>
              </Link>
              <button className="dash-qa" onClick={onSearchOpen}>
                <div className="dash-qa-icon"><Package size={18} /></div>
                <span>Find Order</span>
              </button>
              <Link to="/patients" className="dash-qa">
                <div className="dash-qa-icon"><Users size={18} /></div>
                <span>Patients</span>
              </Link>
              <Link to="/help" className="dash-qa">
                <div className="dash-qa-icon"><AlertCircle size={18} /></div>
                <span>Get Help</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
