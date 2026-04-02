import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Phone, MapPin } from 'lucide-react'
import { patients, orders } from '../data/mockData'
import './PatientDetail.css'

const statusLabel = {
  submitted: 'Submitted',
  review: 'In Review',
  manufacturing: 'Manufacturing',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = patients.find(p => p.id === id)

  if (!patient) {
    return (
      <div className="patient-detail animate-in">
        <button className="btn btn-ghost" onClick={() => navigate('/patients')}>
          <ArrowLeft size={18} /> Back to Patients
        </button>
        <div className="empty-state">
          <h3>Patient not found</h3>
        </div>
      </div>
    )
  }

  const patientOrders = orders.filter(o => o.patientId === id)

  return (
    <div className="patient-detail animate-in">
      <button className="btn btn-ghost" onClick={() => navigate('/patients')}>
        <ArrowLeft size={18} /> Back to Patients
      </button>

      <div className="pd-header">
        <div className="pd-avatar-lg">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="pd-header-info">
          <h1>{patient.name}</h1>
          <p>{patient.id} — DOB: {patient.dob} (Age {patient.age})</p>
          <p className="pd-diagnosis">{patient.diagnosis}</p>
          <div className="pd-contact">
            <span><Phone size={14} /> {patient.phone}</span>
            <span><MapPin size={14} /> {patient.clinic}</span>
          </div>
        </div>
        <Link to="/orders/new" className="btn btn-primary" state={{ patientId: id }}>
          <Plus size={18} />
          New Order for {patient.name.split(' ')[0]}
        </Link>
      </div>

      <h2 className="pd-section-title">Order History ({patientOrders.length})</h2>

      {patientOrders.length > 0 ? (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {patientOrders.map(o => (
                <tr key={o.id} onClick={() => navigate(`/orders/${o.id}`)}>
                  <td><strong>{o.id}</strong></td>
                  <td>{o.product}</td>
                  <td>
                    <span className={`status-badge status-${o.status}`}>
                      {statusLabel[o.status]}
                    </span>
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
      ) : (
        <div className="card empty-state">
          <h3>No orders yet</h3>
          <p>Create the first order for this patient.</p>
        </div>
      )}
    </div>
  )
}
