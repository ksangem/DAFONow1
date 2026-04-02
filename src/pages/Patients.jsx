import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, User } from 'lucide-react'
import { patients } from '../data/mockData'
import './Patients.css'

export default function Patients() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = search
    ? patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase())
      )
    : patients

  return (
    <div className="patients-page animate-in">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Patients</h1>
            <p>{patients.length} patients on file</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Add Patient
          </button>
        </div>
      </div>

      <div className="orders-toolbar">
        <div className="orders-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Patient ID</th>
              <th>DOB / Age</th>
              <th>Diagnosis</th>
              <th>Orders</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} onClick={() => navigate(`/patients/${p.id}`)}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="patients-avatar">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <strong>{p.name}</strong>
                  </div>
                </td>
                <td style={{ color: 'var(--color-gray-500)' }}>{p.id}</td>
                <td>
                  <span>{p.dob}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>Age {p.age}</span>
                </td>
                <td style={{ fontSize: '13px', maxWidth: '200px' }}>{p.diagnosis}</td>
                <td>
                  <span style={{ fontWeight: 600 }}>{p.orders}</span>
                </td>
                <td style={{ color: 'var(--color-gray-500)', fontSize: '13px' }}>
                  {new Date(p.lastOrder).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
