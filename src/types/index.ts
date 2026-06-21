export type UserRole = 'SUPER_ADMIN' | 'IT_STAFF' | 'BRANCH_STAFF';
export type TicketStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'WAITING_FOR_USER' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TicketCategory = 
  | 'NETWORK_ISSUE'
  | 'INTERNET_DOWN'
  | 'ROUTER_ISSUE'
  | 'SWITCH_ISSUE'
  | 'PRINTER_ISSUE'
  | 'COMPUTER_ISSUE'
  | 'SOFTWARE_ISSUE'
  | 'WINDOWS_ISSUE'
  | 'EMAIL_ISSUE'
  | 'CCTV_ISSUE'
  | 'BIOMETRIC_ISSUE'
  | 'POWER_ISSUE'
  | 'OTHER';

export interface Branch {
  id: string;
  branch_name: string;
  branch_code: string;
  region: string;
  manager_name: string;
  manager_email?: string;
  manager_phone?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  auth_id?: string;
  email: string;
  full_name: string;
  phone_number?: string;
  role: UserRole;
  branch_id?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface ITStaff extends User {
  specialization?: string;
  total_resolved_tickets: number;
  average_resolution_time?: number;
  is_available: boolean;
  max_concurrent_tickets: number;
}

export interface TicketCategory {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface Ticket {
  id: string;
  ticket_number: string;
  branch_id: string;
  created_by_user_id: string;
  assigned_to_user_id?: string;
  category_id: string;
  priority: TicketPriority;
  subject: string;
  description: string;
  status: TicketStatus;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
  assigned_at?: string;
  resolved_at?: string;
  closed_at?: string;
}

export interface TicketAttachment {
  id: string;
  ticket_id: string;
  file_name: string;
  file_path: string;
  file_size?: number;
  file_type?: string;
  uploaded_by_user_id: string;
  uploaded_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  comment_text: string;
  is_internal: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  activity_type: string;
  ticket_id?: string;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  ticket_id?: string;
  title: string;
  message: string;
  notification_type?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface DashboardStats {
  total_tickets: number;
  open_tickets: number;
  assigned_tickets: number;
  in_progress_tickets: number;
  resolved_tickets: number;
  closed_tickets: number;
  critical_tickets: number;
  active_engineers: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
}
