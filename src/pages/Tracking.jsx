import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck, Package } from 'lucide-react'
import { orders } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './Tracking.css'

const statusLabel = {
  submitted: 'Submitted',
  review: 'In Review',
  manufacturing: 'Manufacturing',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

export default function Tracking() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('active')

  const activeOrders = orders.filter(o => o.status !== 'delivered')
  const deliveredOrders = orders.filter(o => o.status === 'delivered')
  const displayed = filter === 'active' ? activeOrders : deliveredOrders

  return (
    <div className="tracking-page animate-in">
      <div className="page-header">
        <div>
          <h1>Order Tracking</h1>
          <p>Track the status of all your orders in real time</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({activeOrders.length})
        </button>
        <button
          className={`tab ${filter === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilter('delivered')}
        >
          Delivered ({deliveredOrders.length})
        </button>
      </div>

      <div className="tracking-list">
        {displayed.map(o => (
          <div
            key={o.id}
            className="card tracking-card"
            onClick={() => navigate(`/orders/${o.id}`)}
          >
            <div className="tracking-card-header">
              <div className="tracking-card-left">
                <div className="tracking-card-icon">
                  <Package size={20} />
                </div>
                <div>
                  <div className="tracking-card-title">
                    <strong>{o.id}</strong>
                    <span className={`status-badge status-${o.status}`}>
                      {statusLabel[o.status]}
                    </span>
                    {o.priority === 'rush' && (
                      <span className="orders-rush">Rush</span>
                    )}
                  </div>
                  <p className="tracking-card-sub">
                    {o.patient} — {o.product} — {o.jobNumber}
                  </p>
                  <p className="tracking-card-eta">
                    ETA: {new Date(o.eta).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <div className="tracking-card-timeline">
              <TrackingTimeline currentStatus={o.status} compact />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
