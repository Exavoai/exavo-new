// Mock API layer for the client portal
// This provides realistic data structures and can be easily replaced with real API calls

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface KPIData {
  totalSpending: {
    amount: number;
    currency: string;
    trend: number;
    chartData: number[];
  };
  activeTools: {
    count: number;
    trend: number;
  };
  runningAutomations: {
    count: number;
    trend: number;
  };
}

export interface UsageData {
  labels: string[];
  apiCalls: number[];
  automations: number[];
  assistants: number[];
}

export interface Ticket {
  id: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  service: string;
  status: 'In Progress' | 'Open' | 'Pending' | 'Resolved';
  created: string;
  updated: string;
}

export interface Order {
  id: string;
  service: string;
  type: 'Subscription' | 'One-time';
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Completed' | 'Review' | 'Pending';
  amount: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive';
  value: string;
  tools: number;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  source: string;
  status: 'Hot' | 'Warm' | 'Cold';
  score: number;
  date: string;
}

export interface AITool {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Paused';
  usage: string;
  lastUsed: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Pending';
  joined: string;
}

export interface Subscription {
  id: number;
  name: string;
  plan: string;
  price: string;
  nextBilling: string;
  status: 'Active' | 'Expiring Soon';
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Your AI Content Generator Pro subscription has been renewed',
    type: 'success',
    read: false,
    timestamp: '2 hours ago',
    link: '/client/orders',
  },
  {
    id: '2',
    title: 'Support Ticket Updated',
    message: 'Your ticket #TKT-001 status changed to In Progress',
    type: 'info',
    read: false,
    timestamp: '5 hours ago',
    link: '/client/tickets',
  },
  {
    id: '3',
    title: 'Payment Due Soon',
    message: 'Your subscription renewal is due in 3 days',
    type: 'warning',
    read: true,
    timestamp: '1 day ago',
    link: '/client/subscriptions',
  },
];

const mockKPIData: KPIData = {
  totalSpending: {
    amount: 12450,
    currency: 'USD',
    trend: 12.5,
    chartData: [3200, 4100, 3800, 4500, 5200, 4800, 5100, 5800, 6200, 5900, 6400, 7200],
  },
  activeTools: {
    count: 8,
    trend: 25,
  },
  runningAutomations: {
    count: 12,
    trend: 33,
  },
};

const mockUsageData: UsageData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  apiCalls: [12500, 15000, 18000, 16500, 19000, 21000, 23000, 25000, 27000, 29000, 31000, 33000],
  automations: [450, 520, 580, 630, 720, 810, 890, 950, 1020, 1100, 1180, 1250],
  assistants: [85, 92, 105, 118, 135, 150, 165, 180, 195, 210, 225, 240],
};

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'API Integration Issue with Chatbot',
    priority: 'High',
    service: 'AI Chatbot Pro',
    status: 'In Progress',
    created: '2025-11-14',
    updated: '2025-11-15',
  },
  {
    id: 'TKT-002',
    subject: 'Billing Question - Subscription Renewal',
    priority: 'Medium',
    service: 'Subscription Management',
    status: 'Open',
    created: '2025-11-13',
    updated: '2025-11-13',
  },
  {
    id: 'TKT-003',
    subject: 'Feature Request - Export Data',
    priority: 'Low',
    service: 'Analytics Dashboard',
    status: 'Pending',
    created: '2025-11-12',
    updated: '2025-11-14',
  },
  {
    id: 'TKT-004',
    subject: 'Login Issue - Can\'t Access Dashboard',
    priority: 'High',
    service: 'Portal Access',
    status: 'Resolved',
    created: '2025-11-10',
    updated: '2025-11-11',
  },
  {
    id: 'TKT-005',
    subject: 'Performance Issue - Slow Response Time',
    priority: 'Medium',
    service: 'AI Processing',
    status: 'Open',
    created: '2025-11-09',
    updated: '2025-11-10',
  },
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    service: 'AI Content Generator Pro',
    type: 'Subscription',
    startDate: '2025-11-01',
    endDate: '2025-12-01',
    status: 'Ongoing',
    amount: '$99.00',
  },
  {
    id: 'ORD-002',
    service: 'Predictive Analytics Suite',
    type: 'One-time',
    startDate: '2025-10-15',
    endDate: '2025-11-15',
    status: 'Completed',
    amount: '$299.00',
  },
  {
    id: 'ORD-003',
    service: 'Marketing Automation Basic',
    type: 'Subscription',
    startDate: '2025-11-10',
    endDate: '2025-12-10',
    status: 'Review',
    amount: '$49.00',
  },
  {
    id: 'ORD-004',
    service: 'Custom AI Model Training',
    type: 'One-time',
    startDate: '2025-10-01',
    endDate: '2025-11-01',
    status: 'Completed',
    amount: '$1,500.00',
  },
  {
    id: 'ORD-005',
    service: 'Workflow Automation Pro',
    type: 'Subscription',
    startDate: '2025-11-05',
    endDate: '2025-12-05',
    status: 'Pending',
    amount: '$149.00',
  },
];

// API Functions
export const mockApi = {
  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await delay(300);
    return mockNotifications;
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    await delay(200);
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) notification.read = true;
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await delay(200);
    mockNotifications.forEach(n => n.read = true);
  },

  // Dashboard KPIs
  getKPIData: async (): Promise<KPIData> => {
    await delay(500);
    return mockKPIData;
  },

  getUsageData: async (): Promise<UsageData> => {
    await delay(400);
    return mockUsageData;
  },

  // Tickets
  getTickets: async (limit?: number): Promise<Ticket[]> => {
    await delay(300);
    return limit ? mockTickets.slice(0, limit) : mockTickets;
  },

  // Orders
  getOrders: async (limit?: number): Promise<Order[]> => {
    await delay(300);
    return limit ? mockOrders.slice(0, limit) : mockOrders;
  },

  // CRM - Clients
  getClients: async (): Promise<Client[]> => {
    await delay(400);
    return [
      {
        id: 1,
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        status: 'Active',
        value: '$50,000',
        tools: 5,
      },
      {
        id: 2,
        name: 'TechStart Inc',
        email: 'hello@techstart.io',
        phone: '+1 (555) 987-6543',
        location: 'San Francisco, USA',
        status: 'Active',
        value: '$35,000',
        tools: 3,
      },
      {
        id: 3,
        name: 'Global Solutions',
        email: 'info@globalsolutions.com',
        phone: '+1 (555) 456-7890',
        location: 'London, UK',
        status: 'Inactive',
        value: '$25,000',
        tools: 2,
      },
    ];
  },

  // CRM - Leads
  getLeads: async (): Promise<Lead[]> => {
    await delay(400);
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@startup.com',
        company: 'StartupXYZ',
        source: 'Website',
        status: 'Hot',
        score: 95,
        date: '2025-11-14',
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'm.chen@enterprise.com',
        company: 'Enterprise Corp',
        source: 'Referral',
        status: 'Warm',
        score: 78,
        date: '2025-11-13',
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily@smallbiz.com',
        company: 'Small Business LLC',
        source: 'LinkedIn',
        status: 'Cold',
        score: 45,
        date: '2025-11-12',
      },
    ];
  },

  // AI Tools
  getAITools: async (): Promise<AITool[]> => {
    await delay(400);
    return [
      {
        id: 1,
        name: 'AI Content Generator',
        type: 'Content Creation',
        status: 'Active',
        usage: '1,234 requests',
        lastUsed: '2 hours ago',
      },
      {
        id: 2,
        name: 'Sentiment Analyzer',
        type: 'Analytics',
        status: 'Active',
        usage: '856 requests',
        lastUsed: '5 hours ago',
      },
      {
        id: 3,
        name: 'Image Recognition AI',
        type: 'Computer Vision',
        status: 'Paused',
        usage: '423 requests',
        lastUsed: '1 day ago',
      },
    ];
  },

  // Team
  getTeamMembers: async (): Promise<TeamMember[]> => {
    await delay(400);
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@company.com',
        role: 'Admin',
        status: 'Active',
        joined: '2025-01-15',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@company.com',
        role: 'Member',
        status: 'Active',
        joined: '2025-03-20',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@company.com',
        role: 'Viewer',
        status: 'Pending',
        joined: '2025-11-10',
      },
    ];
  },

  // Subscriptions
  getSubscriptions: async (): Promise<Subscription[]> => {
    await delay(400);
    return [
      {
        id: 1,
        name: 'AI Content Generator Pro',
        plan: 'Premium',
        price: '$99/month',
        nextBilling: '2025-12-01',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Predictive Analytics Suite',
        plan: 'Enterprise',
        price: '$299/month',
        nextBilling: '2025-12-15',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Marketing Automation',
        plan: 'Starter',
        price: '$49/month',
        nextBilling: '2025-11-20',
        status: 'Expiring Soon',
      },
    ];
  },

  // Files
  getFiles: async (): Promise<FileItem[]> => {
    await delay(400);
    return [
      { id: '1', name: 'Documents', type: 'folder', modified: '2025-11-10' },
      { id: '2', name: 'Images', type: 'folder', modified: '2025-11-12' },
      { id: '3', name: 'Project_Proposal.pdf', type: 'file', size: '2.4 MB', modified: '2025-11-15' },
      { id: '4', name: 'Analytics_Report.xlsx', type: 'file', size: '1.8 MB', modified: '2025-11-14' },
      { id: '5', name: 'Meeting_Notes.docx', type: 'file', size: '156 KB', modified: '2025-11-13' },
    ];
  },
};

// Helper function to simulate API delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
