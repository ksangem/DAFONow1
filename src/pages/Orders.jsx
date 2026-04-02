import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Filter, Search, Download } from 'lucide-react'
import { orders } from '../data/mockData'
import './Orders.css'

const statusLabel = {
  submitted: 'Submitted',
  review: 'In Review',
  manufacturing: 'Manufacturing',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

const statusFilters = ['all', 'submitted', 'review', 'manufacturing', 'shipped', 'delivered']

export default function Orders() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return o.id.toLowerCase().includes(q) ||
        o.jobNumber.toLowerCase().includes(q) ||
        o.patient.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="orders-page animate-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Orders</h1>
            <p>{orders.length} total orders</p>
          </div>
          <Link to="/orders/new" className="btn btn-primary">
            <Plus size={18} />
            New Order
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-toolbar">
        <div className="orders-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="orders-filters">
          {statusFilters.map(s => (
            <button
              key={s}
              className={`no-filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? 'All' : statusLabel[s]}
              {s !== 'all' && (
                <span className="orders-filter-count">
                  {orders.filter(o => o.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order / Job #</th>
              <th>Patient</th>
              <th>Product</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} onClick={() => navigate(`/orders/${o.id}`)}>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--color-gray-800)' }}>{o.id}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>{o.jobNumber}</span>
                </td>
                <td>{o.patient}</td>
                <td><span style={{ fontWeight: 500 }}>{o.product}</span></td>
                <td>
                  <span className={`status-badge status-${o.status}`}>
                    {statusLabel[o.status]}
                  </span>
                </td>
                <td>
                  {o.priority === 'rush' ? (
                    <span className="orders-rush">Rush</span>
                  ) : (
                    <span style={{ color: 'var(--color-gray-400)', fontSize: '13px' }}>Standard</span>
                  )}
                </td>
                <td style={{ color: 'var(--color-gray-500)', fontSize: '13px' }}>
                  {new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
  )
}
