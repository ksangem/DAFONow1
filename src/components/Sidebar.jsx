import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileEdit,
  Truck,
  HelpCircle,
  Plus,
  ChevronRight,
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/drafts', icon: FileEdit, label: 'Drafts', badge: 3 },
  { to: '/tracking', icon: Truck, label: 'Tracking' },
  { to: '/help', icon: HelpCircle, label: 'Help' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#1E6B4E"/>
            <path d="M8 9h4v10H8V9zm8 0h4v10h-4V9z" fill="white" opacity="0.9"/>
            <path d="M12 12h4v4h-4v-4z" fill="#D4A574"/>
          </svg>
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">DAFONow</span>
          <span className="sidebar-logo-sub">by Cascade Dafo</span>
        </div>
      </div>

      {/* New Order CTA */}
      <NavLink to="/orders/new" className="sidebar-new-order">
        <Plus size={18} strokeWidth={2.5} />
        <span>New Order</span>
      </NavLink>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
                <ChevronRight size={14} className="sidebar-nav-arrow" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">DR</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Dr. Rebecca Lin</span>
            <span className="sidebar-user-role">Portland Pediatric Orthotics</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
