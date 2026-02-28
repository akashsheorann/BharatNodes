export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Server {
  id: string;
  user_id: string;
  name: string;
  plan: string;
  status: 'active' | 'pending' | 'suspended';
  ip_address: string;
  location: string;
  specs: {
    cpu: number;
    ram: number;
    storage: number;
    bandwidth: number;
  };
  created_at: string;
  expires_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
}
