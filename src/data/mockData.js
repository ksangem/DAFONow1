// Mock data for DAFONow prototype

export const patients = [
  { id: 'P-1001', name: 'Emma Thompson', dob: '03/15/2018', age: 8, diagnosis: 'Cerebral Palsy - Spastic Diplegia', lastOrder: '2026-02-15', orders: 4, phone: '(503) 555-0142', clinic: 'Portland Pediatric Orthotics' },
  { id: 'P-1002', name: 'Liam Chen', dob: '07/22/2020', age: 5, diagnosis: 'Idiopathic Toe Walking', lastOrder: '2026-03-01', orders: 2, phone: '(206) 555-0198', clinic: 'Seattle Children\'s Rehab' },
  { id: 'P-1003', name: 'Sophia Rodriguez', dob: '11/08/2016', age: 9, diagnosis: 'AFO - Post Surgical', lastOrder: '2026-01-20', orders: 6, phone: '(503) 555-0167', clinic: 'Portland Pediatric Orthotics' },
  { id: 'P-1004', name: 'Noah Williams', dob: '05/30/2019', age: 6, diagnosis: 'Hypotonia', lastOrder: '2026-03-10', orders: 3, phone: '(425) 555-0134', clinic: 'Eastside Orthotics & Prosthetics' },
  { id: 'P-1005', name: 'Olivia Martinez', dob: '09/14/2017', age: 8, diagnosis: 'Metatarsus Adductus', lastOrder: '2026-02-28', orders: 1, phone: '(360) 555-0156', clinic: 'Vancouver Foot & Ankle' },
  { id: 'P-1006', name: 'Aiden Park', dob: '01/25/2021', age: 5, diagnosis: 'Clubfoot - Post Ponseti', lastOrder: '2026-03-20', orders: 2, phone: '(503) 555-0189', clinic: 'Portland Pediatric Orthotics' },
];

export const orders = [
  { id: 'ORD-4521', jobNumber: 'J-78901', patient: 'Emma Thompson', patientId: 'P-1001', product: 'DAFO 3.5', status: 'manufacturing', date: '2026-03-15', eta: '2026-04-05', customizations: ['Turbo trim', 'Pink pattern', 'Velcro closure'], priority: 'standard' },
  { id: 'ORD-4520', jobNumber: 'J-78900', patient: 'Liam Chen', patientId: 'P-1002', product: 'DAFO 4', status: 'shipped', date: '2026-03-10', eta: '2026-03-28', tracking: 'UPS1234567890', customizations: ['Standard trim', 'Blue pattern'], priority: 'rush' },
  { id: 'ORD-4519', jobNumber: 'J-78899', patient: 'Sophia Rodriguez', patientId: 'P-1003', product: 'DAFO 2', status: 'delivered', date: '2026-02-20', eta: '2026-03-15', customizations: ['Extended trim', 'Purple pattern', 'Extra padding'], priority: 'standard' },
  { id: 'ORD-4518', jobNumber: 'J-78898', patient: 'Noah Williams', patientId: 'P-1004', product: 'DAFO 3.5', status: 'review', date: '2026-03-25', eta: '2026-04-15', customizations: ['Turbo trim', 'Green pattern'], priority: 'standard' },
  { id: 'ORD-4517', jobNumber: 'J-78897', patient: 'Olivia Martinez', patientId: 'P-1005', product: 'DAFO Tami2', status: 'submitted', date: '2026-03-28', eta: '2026-04-20', customizations: ['Standard trim', 'Floral pattern'], priority: 'rush' },
  { id: 'ORD-4516', jobNumber: 'J-78896', patient: 'Aiden Park', patientId: 'P-1006', product: 'DAFO 9', status: 'manufacturing', date: '2026-03-18', eta: '2026-04-08', customizations: ['Sport trim', 'Dinosaur pattern'], priority: 'standard' },
];

export const drafts = [
  { id: 'DRF-301', patient: 'Emma Thompson', patientId: 'P-1001', product: 'DAFO 3.5', step: 3, lastEdited: '2026-03-30T14:30:00', progress: 60 },
  { id: 'DRF-302', patient: 'New Patient', patientId: null, product: null, step: 1, lastEdited: '2026-03-29T09:15:00', progress: 20 },
  { id: 'DRF-303', patient: 'Sophia Rodriguez', patientId: 'P-1003', product: 'DAFO 4', step: 4, lastEdited: '2026-03-28T16:45:00', progress: 80 },
];

export const products = [
  { id: 'dafo-2', name: 'DAFO 2', description: 'Flexible supramalleolar orthosis for mild to moderate involvement', image: null, category: 'Supramalleolar', popular: true },
  { id: 'dafo-3', name: 'DAFO 3', description: 'Hinged AFO with posterior leaf spring for moderate involvement', image: null, category: 'Hinged AFO', popular: false },
  { id: 'dafo-3.5', name: 'DAFO 3.5', description: 'Wrap-around hinged AFO for moderate to significant involvement', image: null, category: 'Hinged AFO', popular: true },
  { id: 'dafo-4', name: 'DAFO 4', description: 'Solid ankle AFO for significant involvement and tone management', image: null, category: 'Solid AFO', popular: true },
  { id: 'dafo-9', name: 'DAFO 9', description: 'Dynamic AFO for active patients with mild involvement', image: null, category: 'Dynamic AFO', popular: false },
  { id: 'dafo-tami2', name: 'DAFO Tami2', description: 'Floor reaction orthosis for crouch gait management', image: null, category: 'Floor Reaction', popular: false },
  { id: 'dafo-fa', name: 'DAFO FA', description: 'Foot alignment orthosis for flexible foot deformities', image: null, category: 'Foot Alignment', popular: true },
  { id: 'jt-brace', name: 'JumpStart Trampoline', description: 'Lightweight, low-profile SMO for mild involvement', image: null, category: 'SMO', popular: false },
];

export const trackingSteps = [
  { key: 'submitted', label: 'Submitted', description: 'Order received by Cascade' },
  { key: 'review', label: 'In Review', description: 'Clinical review in progress' },
  { key: 'manufacturing', label: 'Manufacturing', description: 'DAFO being fabricated' },
  { key: 'shipped', label: 'Shipped', description: 'On its way to you' },
  { key: 'delivered', label: 'Delivered', description: 'Order delivered' },
];

export const notifications = [
  { id: 1, type: 'order', message: 'Order ORD-4521 moved to Manufacturing', time: '2 hours ago', read: false },
  { id: 2, type: 'draft', message: 'Draft DRF-301 auto-saved', time: '5 hours ago', read: false },
  { id: 3, type: 'shipping', message: 'Order ORD-4520 has shipped — tracking available', time: '1 day ago', read: true },
  { id: 4, type: 'order', message: 'Order ORD-4519 delivered successfully', time: '2 days ago', read: true },
];
