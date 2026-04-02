import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, User, MapPin, Copy, ExternalLink } from 'lucide-react'
import { orders, patients } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './OrderDetail.css'

const statusLabel = {
  submitted: 'Submitted',
  review: 'In Review',
  manufacturing: 'Manufacturing',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="order-detail animate-in">
        <button className="btn btn-ghost" onClick={() => navigate('/orders')}>
          <ArrowLeft size={18} /> Back to Orders
        </button>
        <div className="empty-state">
          <h3>Order not found</h3>
          <p>The order {id} could not be found.</p>
        </div>
      </div>
    )
  }

  const patient = patients.find(p => p.id === order.patientId)

  return (
    <div className="order-detail animate-in">
      <button className="btn btn-ghost" onClick={() => navigate('/orders')}>
        <ArrowLeft size={18} /> Back to Orders
      </button>

      <div className="od-header">
        <div>
          <div className="od-header-row">
            <h1>{order.id}</h1>
            <span className={`status-badge status-${order.status}`}>
              {statusLabel[order.status]}
            </span>
            {order.priority === 'rush' && (
              <span className="orders-rush">Rush</span>
            )}
          </div>
          <p className="od-header-sub">Job #{order.jobNumber} — Placed {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="od-grid">
        {/* Main */}
        <div className="od-main">
          {/* Tracking */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: 'var(--space-5)' }}>Order Tracking</h2>
            <TrackingTimeline currentStatus={order.status} />
            {order.tracking && (
              <div className="od-tracking-number">
                <span>Tracking Number:</span>
                <strong>{order.tracking}</strong>
                <button className="btn btn-ghost btn-sm"><Copy size={14} /></button>
              </div>
            )}
          </div>

          {/* Customizations */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>Specifications</h2>
            <div className="od-specs">
              {order.customizations.map((c, i) => (
                <span key={i} className="od-spec-tag">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="od-sidebar">
          {/* Patient */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} /> Patient
            </h2>
            {patient && (
              <div className="od-patient">
                <div className="od-patient-avatar">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <strong>{patient.name}</strong>
                  <span>{patient.id} — DOB: {patient.dob}</span>
                  <span>{patient.diagnosis}</span>
                </div>
              </div>
            )}
          </div>

          {/* Product */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={16} /> Product
            </h2>
            <div className="od-product">
              <div className="od-product-icon">
                <Package size={24} />
              </div>
              <div>
                <strong>{order.product}</strong>
                <span>Estimated: {new Date(order.eta).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Need help */}
          <div className="card od-help-card">
            <h3>Need help with this order?</h3>
            <p>Contact Cascade Dafo support for questions or modifications.</p>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
