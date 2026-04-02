import {
  HelpCircle, Phone, Mail, MessageSquare, FileText,
  ChevronRight, ExternalLink, BookOpen, Video
} from 'lucide-react'
import './Help.css'

const faqs = [
  { q: 'How do I track my order?', a: 'Navigate to the Tracking tab in the left sidebar, or click on any order to view its real-time status.' },
  { q: 'Can I modify an order after submission?', a: 'Orders cannot be modified after submission through DAFONow. Please contact Cascade support for any changes needed.' },
  { q: 'How do I save a draft?', a: 'Drafts are automatically saved starting at Step 3 of the order process. You can also click "Save Draft" at any time during Steps 3-5.' },
  { q: 'What is the typical turnaround time?', a: 'Standard orders typically take 10-14 business days. Rush orders are prioritized and may arrive sooner.' },
  { q: 'How do I reorder for an existing patient?', a: 'Go to the Patients tab, find your patient, and click "New Order" from their profile. Their information will be pre-filled.' },
]

export default function Help() {
  return (
    <div className="help-page animate-in">
      <div className="page-header">
        <h1>Help & Support</h1>
        <p>Get help with DAFONow or contact Cascade Dafo support</p>
      </div>

      {/* Contact cards */}
      <div className="grid-3 help-contacts">
        <div className="card help-contact-card">
          <div className="help-contact-icon">
            <Phone size={24} />
          </div>
          <h3>Phone Support</h3>
          <p>Mon–Fri, 8am–5pm PST</p>
          <a href="tel:+18005472024" className="help-contact-link">
            (800) 547-2024
          </a>
        </div>
        <div className="card help-contact-card">
          <div className="help-contact-icon">
            <Mail size={24} />
          </div>
          <h3>Email Support</h3>
          <p>Response within 24 hours</p>
          <a href="mailto:support@cascadedafo.com" className="help-contact-link">
            support@cascadedafo.com
          </a>
        </div>
        <div className="card help-contact-card">
          <div className="help-contact-icon">
            <MessageSquare size={24} />
          </div>
          <h3>Live Chat</h3>
          <p>Available during business hours</p>
          <button className="help-contact-link">
            Start Chat
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="card help-faq">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-5)' }}>
          <HelpCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
          Frequently Asked Questions
        </h2>
        <div className="help-faq-list">
          {faqs.map((faq, i) => (
            <details key={i} className="help-faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="grid-2" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card help-resource">
          <BookOpen size={20} className="help-resource-icon" />
          <h3>Product Catalog</h3>
          <p>Browse the full DAFO product line with specifications and ordering guides.</p>
          <button className="btn btn-ghost btn-sm">
            View Catalog <ExternalLink size={14} />
          </button>
        </div>
        <div className="card help-resource">
          <Video size={20} className="help-resource-icon" />
          <h3>Video Tutorials</h3>
          <p>Learn how to use DAFONow with step-by-step video guides.</p>
          <button className="btn btn-ghost btn-sm">
            Watch Videos <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
