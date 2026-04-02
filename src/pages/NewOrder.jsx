import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Check, Save, Trash2, User, Package,
  Settings, ClipboardCheck, Send, Search, Plus, AlertCircle
} from 'lucide-react'
import { patients, products } from '../data/mockData'
import './NewOrder.css'

const steps = [
  { num: 1, icon: User, label: 'Patient', desc: 'Start patient order' },
  { num: 2, icon: Package, label: 'Product', desc: 'Select DAFO type' },
  { num: 3, icon: Settings, label: 'Customize', desc: 'Customize specifications' },
  { num: 4, icon: ClipboardCheck, label: 'Review', desc: 'Review your order' },
  { num: 5, icon: Send, label: 'Submit', desc: 'Submit to Cascade' },
]

export default function NewOrder() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)

  // Form state
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientSearch, setPatientSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productFilter, setProductFilter] = useState('all')
  const [customization, setCustomization] = useState({
    trimStyle: 'standard',
    pattern: '',
    closure: 'velcro',
    padding: 'standard',
    laterality: 'bilateral',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredPatients = patientSearch
    ? patients.filter(p =>
        p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(patientSearch.toLowerCase())
      )
    : patients

  const filteredProducts = productFilter === 'all'
    ? products
    : productFilter === 'popular'
    ? products.filter(p => p.popular)
    : products.filter(p => p.category === productFilter)

  const categories = ['all', 'popular', ...new Set(products.map(p => p.category))]

  function handleNext() {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  function handleBack() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  function handleSaveDraft() {
    setAutoSaved(true)
    setTimeout(() => setAutoSaved(false), 3000)
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedPatient !== null
      case 2: return selectedProduct !== null
      case 3: return true
      case 4: return true
      default: return false
    }
  }

  if (submitted) {
    return (
      <div className="new-order animate-in">
        <div className="order-success">
          <div className="order-success-icon">
            <Check size={40} strokeWidth={2.5} />
          </div>
          <h1>Order Submitted Successfully</h1>
          <p>Your order has been submitted to Cascade Dafo for review.</p>
          <div className="order-success-details">
            <div className="order-success-row">
              <span>Order ID</span>
              <strong>ORD-4522</strong>
            </div>
            <div className="order-success-row">
              <span>Job Number</span>
              <strong>J-78902</strong>
            </div>
            <div className="order-success-row">
              <span>Patient</span>
              <strong>{selectedPatient?.name}</strong>
            </div>
            <div className="order-success-row">
              <span>Product</span>
              <strong>{selectedProduct?.name}</strong>
            </div>
            <div className="order-success-row">
              <span>Estimated ETA</span>
              <strong>Apr 22, 2026</strong>
            </div>
          </div>
          <div className="order-success-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/orders/ORD-4521')}>
              View Order
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="new-order animate-in">
      {/* Top bar */}
      <div className="no-topbar">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="no-title">New Order</h1>
        <div className="no-topbar-right">
          {autoSaved && (
            <span className="no-autosave">
              <Check size={14} /> Draft saved
            </span>
          )}
          {currentStep >= 3 && (
            <button className="btn btn-secondary btn-sm" onClick={handleSaveDraft}>
              <Save size={14} />
              Save Draft
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="no-progress">
        {steps.map((step, i) => {
          const isCompleted = step.num < currentStep
          const isCurrent = step.num === currentStep
          const isPending = step.num > currentStep
          const Icon = step.icon

          return (
            <div
              key={step.num}
              className={`no-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''}`}
            >
              <div className="no-step-indicator">
                <div className="no-step-dot">
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
                </div>
                {i < steps.length - 1 && <div className="no-step-line" />}
              </div>
              <div className="no-step-text">
                <span className="no-step-label">{step.label}</span>
                <span className="no-step-desc">{isCurrent ? step.desc : ''}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div className="no-content">
        {/* STEP 1: Patient */}
        {currentStep === 1 && (
          <div className="no-step-content animate-in">
            <div className="no-step-header">
              <h2>Select a Patient</h2>
              <p>Choose an existing patient or create a new one.</p>
            </div>
            <div className="no-patient-search">
              <Search size={18} />
              <input
                type="text"
                className="form-input"
                placeholder="Search by name or patient ID..."
                value={patientSearch}
                onChange={e => setPatientSearch(e.target.value)}
              />
              <button className="btn btn-secondary btn-sm">
                <Plus size={14} /> New Patient
              </button>
            </div>
            <div className="no-patient-list">
              {filteredPatients.map(p => (
                <button
                  key={p.id}
                  className={`no-patient-card ${selectedPatient?.id === p.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPatient(p)}
                >
                  <div className="no-patient-avatar">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="no-patient-info">
                    <span className="no-patient-name">{p.name}</span>
                    <span className="no-patient-meta">{p.id} — DOB: {p.dob}</span>
                    <span className="no-patient-diag">{p.diagnosis}</span>
                  </div>
                  <div className="no-patient-orders">
                    <span>{p.orders} orders</span>
                  </div>
                  {selectedPatient?.id === p.id && (
                    <div className="no-patient-check"><Check size={16} /></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Product */}
        {currentStep === 2 && (
          <div className="no-step-content animate-in">
            <div className="no-step-header">
              <h2>Select DAFO Type</h2>
              <p>Choose the appropriate DAFO product for {selectedPatient?.name}.</p>
            </div>
            <div className="no-product-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`no-filter-btn ${productFilter === cat ? 'active' : ''}`}
                  onClick={() => setProductFilter(cat)}
                >
                  {cat === 'all' ? 'All Products' : cat === 'popular' ? 'Popular' : cat}
                </button>
              ))}
            </div>
            <div className="no-product-grid">
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  className={`no-product-card ${selectedProduct?.id === p.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProduct(p)}
                >
                  <div className="no-product-img">
                    <Package size={32} />
                  </div>
                  <div className="no-product-info">
                    <span className="no-product-name">{p.name}</span>
                    <span className="no-product-desc">{p.description}</span>
                    <span className="no-product-cat">{p.category}</span>
                  </div>
                  {selectedProduct?.id === p.id && (
                    <div className="no-product-check"><Check size={16} /></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Customization */}
        {currentStep === 3 && (
          <div className="no-step-content animate-in">
            <div className="no-step-header">
              <h2>Customize Specifications</h2>
              <p>Configure the {selectedProduct?.name} for {selectedPatient?.name}.</p>
            </div>
            <div className="no-customize-grid">
              <div className="no-customize-form">
                <div className="form-group">
                  <label className="form-label">Trim Style</label>
                  <select
                    className="form-input form-select"
                    value={customization.trimStyle}
                    onChange={e => setCustomization({...customization, trimStyle: e.target.value})}
                  >
                    <option value="standard">Standard Trim</option>
                    <option value="turbo">Turbo Trim</option>
                    <option value="extended">Extended Trim</option>
                    <option value="sport">Sport Trim</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Pattern / Color</label>
                  <div className="no-color-options">
                    {['Blue', 'Pink', 'Green', 'Purple', 'Dinosaur', 'Floral', 'Sports', 'Custom'].map(c => (
                      <button
                        key={c}
                        className={`no-color-btn ${customization.pattern === c ? 'selected' : ''}`}
                        onClick={() => setCustomization({...customization, pattern: c})}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Closure Type</label>
                  <select
                    className="form-input form-select"
                    value={customization.closure}
                    onChange={e => setCustomization({...customization, closure: e.target.value})}
                  >
                    <option value="velcro">Velcro Closure</option>
                    <option value="lace">Lace Closure</option>
                    <option value="boa">BOA Closure</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Padding</label>
                  <select
                    className="form-input form-select"
                    value={customization.padding}
                    onChange={e => setCustomization({...customization, padding: e.target.value})}
                  >
                    <option value="standard">Standard Padding</option>
                    <option value="extra">Extra Padding</option>
                    <option value="minimal">Minimal Padding</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Laterality</label>
                  <div className="no-laterality">
                    {['Left', 'Right', 'Bilateral'].map(l => (
                      <button
                        key={l}
                        className={`no-lat-btn ${customization.laterality === l.toLowerCase() ? 'selected' : ''}`}
                        onClick={() => setCustomization({...customization, laterality: l.toLowerCase()})}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Clinical Notes</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Add any special instructions or clinical notes..."
                    value={customization.notes}
                    onChange={e => setCustomization({...customization, notes: e.target.value})}
                  />
                </div>
              </div>

              {/* Right panel summary */}
              <div className="no-customize-summary">
                <div className="no-summary-card">
                  <h3>Order Summary</h3>
                  <div className="no-summary-section">
                    <span className="no-summary-label">Patient</span>
                    <span className="no-summary-value">{selectedPatient?.name}</span>
                    <span className="no-summary-sub">{selectedPatient?.diagnosis}</span>
                  </div>
                  <div className="no-summary-section">
                    <span className="no-summary-label">Product</span>
                    <span className="no-summary-value">{selectedProduct?.name}</span>
                    <span className="no-summary-sub">{selectedProduct?.description}</span>
                  </div>
                  <div className="no-summary-divider" />
                  <div className="no-summary-section">
                    <span className="no-summary-label">Specifications</span>
                    <div className="no-summary-specs">
                      <div><span>Trim:</span> {customization.trimStyle}</div>
                      <div><span>Pattern:</span> {customization.pattern || '—'}</div>
                      <div><span>Closure:</span> {customization.closure}</div>
                      <div><span>Padding:</span> {customization.padding}</div>
                      <div><span>Laterality:</span> {customization.laterality}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review */}
        {currentStep === 4 && (
          <div className="no-step-content animate-in">
            <div className="no-step-header">
              <h2>Review Your Order</h2>
              <p>Please review all details before submitting to Cascade.</p>
            </div>
            <div className="no-review">
              <div className="no-review-card">
                <div className="no-review-section">
                  <div className="no-review-section-header">
                    <User size={18} />
                    <h3>Patient Information</h3>
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentStep(1)}>Edit</button>
                  </div>
                  <div className="no-review-grid">
                    <div><span>Name</span><strong>{selectedPatient?.name}</strong></div>
                    <div><span>Patient ID</span><strong>{selectedPatient?.id}</strong></div>
                    <div><span>DOB</span><strong>{selectedPatient?.dob}</strong></div>
                    <div><span>Diagnosis</span><strong>{selectedPatient?.diagnosis}</strong></div>
                  </div>
                </div>

                <div className="no-review-divider" />

                <div className="no-review-section">
                  <div className="no-review-section-header">
                    <Package size={18} />
                    <h3>Product</h3>
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentStep(2)}>Edit</button>
                  </div>
                  <div className="no-review-grid">
                    <div><span>DAFO Type</span><strong>{selectedProduct?.name}</strong></div>
                    <div><span>Category</span><strong>{selectedProduct?.category}</strong></div>
                  </div>
                  <p className="no-review-desc">{selectedProduct?.description}</p>
                </div>

                <div className="no-review-divider" />

                <div className="no-review-section">
                  <div className="no-review-section-header">
                    <Settings size={18} />
                    <h3>Specifications</h3>
                    <button className="btn btn-ghost btn-sm" onClick={() => setCurrentStep(3)}>Edit</button>
                  </div>
                  <div className="no-review-grid">
                    <div><span>Trim Style</span><strong>{customization.trimStyle}</strong></div>
                    <div><span>Pattern</span><strong>{customization.pattern || 'Not selected'}</strong></div>
                    <div><span>Closure</span><strong>{customization.closure}</strong></div>
                    <div><span>Padding</span><strong>{customization.padding}</strong></div>
                    <div><span>Laterality</span><strong>{customization.laterality}</strong></div>
                  </div>
                  {customization.notes && (
                    <div className="no-review-notes">
                      <span>Clinical Notes</span>
                      <p>{customization.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="no-review-alert">
                <AlertCircle size={18} />
                <div>
                  <strong>Please verify all details are correct.</strong>
                  <p>Orders cannot be modified after submission. If changes are needed, please contact Cascade support.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Submit */}
        {currentStep === 5 && (
          <div className="no-step-content animate-in">
            <div className="no-submit-page">
              <div className="no-submit-icon">
                <Send size={32} />
              </div>
              <h2>Ready to Submit</h2>
              <p>Your order for <strong>{selectedPatient?.name}</strong> — <strong>{selectedProduct?.name}</strong> is ready to be submitted to Cascade Dafo.</p>
              <div className="no-submit-summary">
                <div><span>Patient:</span> {selectedPatient?.name}</div>
                <div><span>Product:</span> {selectedProduct?.name}</div>
                <div><span>Trim:</span> {customization.trimStyle}</div>
                <div><span>Laterality:</span> {customization.laterality}</div>
                <div><span>Estimated Processing:</span> 10–14 business days</div>
              </div>
              <button className="btn btn-primary btn-lg no-submit-btn" onClick={handleSubmit}>
                <Send size={18} />
                Submit Order to Cascade
              </button>
              <p className="no-submit-note">You'll receive a confirmation email and can track progress in real time.</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer navigation */}
      {currentStep < 5 && (
        <div className="no-footer">
          <div className="no-footer-left">
            {currentStep > 1 && (
              <button className="btn btn-secondary" onClick={handleBack}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
          </div>
          <div className="no-footer-right">
            {currentStep >= 3 && (
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={14} />
                Discard Draft
              </button>
            )}
            <button
              className={`btn ${canProceed() ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleNext}
              disabled={!canProceed()}
              style={!canProceed() ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              {currentStep === 4 ? 'Proceed to Submit' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal animate-in" onClick={e => e.stopPropagation()}>
            <div className="modal-icon modal-icon--danger">
              <Trash2 size={24} />
            </div>
            <h2>Discard this draft?</h2>
            <p>This action cannot be undone. All progress on this order will be lost.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="btn"
                style={{ background: 'var(--color-error)', color: 'white' }}
                onClick={() => navigate('/')}
              >
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
