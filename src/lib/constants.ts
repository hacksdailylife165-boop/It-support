export const TICKET_PRIORITIES = [
  { value: 'LOW', label: 'Low', color: '#10b981' },
  { value: 'MEDIUM', label: 'Medium', color: '#f59e0b' },
  { value: 'HIGH', label: 'High', color: '#ef4444' },
  { value: 'CRITICAL', label: 'Critical', color: '#dc2626' },
];

export const TICKET_STATUSES = [
  { value: 'OPEN', label: 'Open', color: '#6366f1' },
  { value: 'ASSIGNED', label: 'Assigned', color: '#3b82f6' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: '#8b5cf6' },
  { value: 'WAITING_FOR_USER', label: 'Waiting for User', color: '#f59e0b' },
  { value: 'RESOLVED', label: 'Resolved', color: '#10b981' },
  { value: 'CLOSED', label: 'Closed', color: '#6b7280' },
];

export const TICKET_CATEGORIES = [
  'Network Issue',
  'Internet Down',
  'Router Issue',
  'Switch Issue',
  'Printer Issue',
  'Computer Issue',
  'Software Issue',
  'Windows Issue',
  'Email Issue',
  'CCTV Issue',
  'Biometric Issue',
  'Power Issue',
  'Other',
];

export const USER_ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'IT_STAFF', label: 'IT Support Staff' },
  { value: 'BRANCH_STAFF', label: 'Branch Staff' },
];

export const PAGINATION_LIMIT = 20;

export const DEFAULT_SUPER_ADMIN = {
  email: 'roshanzameerkhan02@gmail.com',
  full_name: 'Roshan Zameer Khan',
  phone_number: '03063462822',
  role: 'SUPER_ADMIN',
};
