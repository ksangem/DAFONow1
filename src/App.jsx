import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import NewOrder from './pages/NewOrder'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Drafts from './pages/Drafts'
import Tracking from './pages/Tracking'
import Help from './pages/Help'
import './App.css'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Layout searchOpen={searchOpen} setSearchOpen={setSearchOpen}>
      <Routes>
        <Route path="/" element={<Dashboard onSearchOpen={() => setSearchOpen(true)} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/new" element={<NewOrder />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
