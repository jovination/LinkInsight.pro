// Enhanced API service with mock functionality that simulates a backend

import { toast } from "sonner";

// In a real app, this would come from environment variables
const BASE_URL = "https://api.example.com"; 

// Simulated database for development
const mockDatabase = {
  links: [
    { id: '1', url: 'https://example.com/homepage', status: 'healthy' as const, responseTime: '0.8s', lastChecked: '2 hours ago' },
    { id: '2', url: 'https://example.com/about', status: 'healthy' as const, responseTime: '1.2s', lastChecked: '2 hours ago' },
    { id: '3', url: 'https://example.com/products', status: 'broken' as const, responseTime: '-', lastChecked: '2 hours ago' },
    { id: '4', url: 'https://example.com/blog', status: 'healthy' as const, responseTime: '1.5s', lastChecked: '2 hours ago' },
    { id: '5', url: 'https://example.com/contact', status: 'healthy' as const, responseTime: '0.9s', lastChecked: '2 hours ago' },
    { id: '6', url: 'https://example.com/services', status: 'healthy' as const, responseTime: '1.1s', lastChecked: '3 hours ago' },
    { id: '7', url: 'https://example.com/resources', status: 'redirected' as const, responseTime: '1.7s', lastChecked: '3 hours ago' },
    { id: '8', url: 'https://example.com/support', status: 'healthy' as const, responseTime: '0.7s', lastChecked: '3 hours ago' },
  ],
  users: [
    { id: '1', name: 'Test User', email: 'test@example.com', plan: 'pro' as const }
  ],
  notifications: [
    { id: '1', message: 'Your subscription will renew in 7 days', read: false, date: '2023-07-01T10:30:00Z' },
    { id: '2', message: 'New feature available: Bulk link checking', read: true, date: '2023-06-28T14:15:00Z' },
    { id: '3', message: 'Your weekly report is ready', read: false, date: '2023-06-25T09:00:00Z' },
  ],
  invoices: [
    { id: '1', amount: 19.99, date: '2023-06-01', status: 'paid', description: 'Pro Plan - Monthly' },
    { id: '2', amount: 19.99, date: '2023-05-01', status: 'paid', description: 'Pro Plan - Monthly' },
    { id: '3', amount: 19.99, date: '2023-04-01', status: 'paid', description: 'Pro Plan - Monthly' },
  ],
  stats: {
    totalLinks: 8,
    brokenLinks: 1,
    healthyLinks: 6,
    redirectedLinks: 1,
    avgLoadTime: '1.1s',
    totalScans: 1248,
    responseTime: '1.2s',
    issuesFixed: 42,
    healthScore: 96
  }
};

// Interface definitions
export interface APIError {
  message: string;
  status?: number;
}

export interface LinkData {
  id: string;
  url: string;
  status: "healthy" | "broken" | "redirected";
  responseTime?: string;
  lastChecked: string;
}

export interface UserStats {
  totalLinks: number;
  brokenLinks: number;
  healthyLinks: number;
  redirectedLinks: number;
  avgLoadTime: string;
  totalScans: number;
  responseTime: string;
  issuesFixed: number;
  healthScore: number;
}

export interface NotificationData {
  id: string;
  message: string;
  read: boolean;
  date: string;
}

export interface InvoiceData {
  id: string;
  amount: number;
  date: string;
  status: string;
  description: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
}

// New interfaces for the link analysis feature
export interface LinkAnalysisResult {
  url: string;
  status: "healthy" | "broken" | "redirected";
  responseTime?: string;
  lastChecked: string;
  statusCode?: number;
  title?: string;
  metadata?: {
    description?: string;
    keywords?: string[];
  };
  brokenLinks?: string[];
  redirectLinks?: string[];
}

// Utility to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoint implementations
export const apiService = {
  // Authentication
  login: async (email: string, password: string): Promise<{ token: string; user: UserData }> => {
    await delay(800); // Simulate network latency
    
    if (email === 'test@example.com' && password === 'password') {
      const user = mockDatabase.users[0];
      const token = 'mock-jwt-token';
      
      // Store auth in localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { token, user };
    } else {
      throw { message: 'Invalid email or password', status: 401 };
    }
  },
  
  register: async (name: string, email: string, password: string): Promise<{ token: string; user: UserData }> => {
    await delay(1000);
    
    // Check if user already exists
    if (email === 'test@example.com') {
      throw { message: 'User already exists', status: 409 };
    }
    
    // Create new user
    const newUser: UserData = { 
      id: `${mockDatabase.users.length + 1}`,
      name,
      email,
      plan: 'free'
    };
    
    mockDatabase.users.push(newUser);
    const token = 'mock-jwt-token';
    
    // Store auth
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { token, user: newUser };
  },
  
  logout: async (): Promise<void> => {
    await delay(300);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: (): UserData | null => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },
  
  // Link management
  getLinks: async (): Promise<LinkData[]> => {
    await delay(800);
    return [...mockDatabase.links] as LinkData[];
  },
  
  createLink: async (url: string): Promise<LinkData> => {
    await delay(1000);
    
    // Validate URL
    try {
      new URL(url);
    } catch {
      throw { message: 'Invalid URL format', status: 400 };
    }
    
    // Create new link with random status
    const statuses: ("healthy" | "broken" | "redirected")[] = ['healthy', 'broken', 'redirected'];
    const randomStatus = statuses[Math.floor(Math.random() * 3)];
    const responseTime = randomStatus !== 'broken' ? `${(Math.random() * 2 + 0.5).toFixed(1)}s` : '-';
    
    const newLink: LinkData = {
      id: `${mockDatabase.links.length + 1}`,
      url,
      status: randomStatus,
      responseTime,
      lastChecked: 'just now'
    };
    
    mockDatabase.links.push(newLink as any);
    
    // Update stats
    if (randomStatus === 'healthy') mockDatabase.stats.healthyLinks++;
    if (randomStatus === 'broken') mockDatabase.stats.brokenLinks++;
    if (randomStatus === 'redirected') mockDatabase.stats.redirectedLinks++;
    mockDatabase.stats.totalLinks++;
    
    return newLink;
  },
  
  deleteLink: async (id: string): Promise<void> => {
    await delay(600);
    
    const linkIndex = mockDatabase.links.findIndex(link => link.id === id);
    
    if (linkIndex === -1) {
      throw { message: 'Link not found', status: 404 };
    }
    
    // Update stats based on the status of the link being deleted
    const linkStatus = mockDatabase.links[linkIndex].status;
    if (linkStatus === 'healthy') mockDatabase.stats.healthyLinks--;
    if (linkStatus === 'broken') mockDatabase.stats.brokenLinks--;
    if (linkStatus === 'redirected') mockDatabase.stats.redirectedLinks--;
    mockDatabase.stats.totalLinks--;
    
    // Remove the link
    mockDatabase.links.splice(linkIndex, 1);
  },
  
  checkLink: async (id: string): Promise<LinkData> => {
    await delay(1500); // Checking takes longer
    
    const linkIndex = mockDatabase.links.findIndex(link => link.id === id);
    
    if (linkIndex === -1) {
      throw { message: 'Link not found', status: 404 };
    }
    
    // Simulate checking by potentially changing the status
    const link = {...mockDatabase.links[linkIndex]};
    const oldStatus = link.status;
    
    // 70% chance status stays the same, 30% chance it changes
    if (Math.random() > 0.7) {
      const statuses: ("healthy" | "broken" | "redirected")[] = ['healthy', 'broken', 'redirected'];
      const newStatus = statuses[Math.floor(Math.random() * 3)];
      
      // Update stats based on status change
      if (oldStatus !== newStatus) {
        if (oldStatus === 'healthy') mockDatabase.stats.healthyLinks--;
        if (oldStatus === 'broken') mockDatabase.stats.brokenLinks--;
        if (oldStatus === 'redirected') mockDatabase.stats.redirectedLinks--;
        
        if (newStatus === 'healthy') mockDatabase.stats.healthyLinks++;
        if (newStatus === 'broken') mockDatabase.stats.brokenLinks++;
        if (newStatus === 'redirected') mockDatabase.stats.redirectedLinks++;
      }
      
      link.status = newStatus as "healthy" | "broken" | "redirected";
    }
    
    link.responseTime = link.status !== 'broken' ? `${(Math.random() * 2 + 0.5).toFixed(1)}s` : '-';
    link.lastChecked = 'just now';
    
    // Update in mock DB
    mockDatabase.links[linkIndex] = link as any;
    
    return link as LinkData;
  },
  
  // Dashboard data
  getDashboardStats: async (): Promise<UserStats> => {
    await delay(700);
    return {...mockDatabase.stats};
  },
  
  // Notifications
  getNotifications: async (): Promise<NotificationData[]> => {
    await delay(600);
    return [...mockDatabase.notifications];
  },
  
  markNotificationAsRead: async (id: string): Promise<void> => {
    await delay(400);
    
    const notificationIndex = mockDatabase.notifications.findIndex(n => n.id === id);
    
    if (notificationIndex === -1) {
      throw { message: 'Notification not found', status: 404 };
    }
    
    mockDatabase.notifications[notificationIndex].read = true;
  },
  
  markAllNotificationsAsRead: async (): Promise<void> => {
    await delay(500);
    
    mockDatabase.notifications.forEach(notification => {
      notification.read = true;
    });
  },
  
  // Billing
  getInvoices: async (): Promise<InvoiceData[]> => {
    await delay(800);
    return [...mockDatabase.invoices];
  },
  
  updatePaymentMethod: async (paymentMethodId: string): Promise<void> => {
    await delay(1200);
    
    if (!paymentMethodId) {
      throw { message: 'Invalid payment method', status: 400 };
    }
    
    // In a real app, this would update the payment method in the database
    toast.success('Payment method updated successfully');
  },
  
  // New advanced link analysis features
  analyzeLink: async (url: string): Promise<LinkAnalysisResult> => {
    await delay(1500);
    
    // Validate URL
    try {
      new URL(url);
    } catch {
      throw { message: 'Invalid URL format', status: 400 };
    }
    
    // Simulate link analysis with more detailed results
    const statuses: ("healthy" | "broken" | "redirected")[] = ['healthy', 'broken', 'redirected'];
    const randomStatus = statuses[Math.floor(Math.random() * 3)];
    const responseTime = randomStatus !== 'broken' ? `${(Math.random() * 2 + 0.5).toFixed(1)}s` : '-';
    const statusCode = randomStatus === 'healthy' ? 200 : 
                        randomStatus === 'broken' ? 404 : 301;
    
    // Generate mock metadata based on URL
    const urlParts = url.split('/');
    const pageName = urlParts[urlParts.length - 1] || 'homepage';
    
    const mockTitle = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page`;
    const mockDescription = `This is the ${pageName} page of the website.`;
    
    // Create mock broken and redirect links for demonstration
    let brokenLinks: string[] = [];
    let redirectLinks: string[] = [];
    
    if (Math.random() > 0.7) {
      brokenLinks = [
        `${url}/images/missing.jpg`,
        `${url}/resources/document.pdf`
      ];
      
      redirectLinks = [
        `${url}/old-page.html`,
        `${url}/deprecated/resource.html`
      ];
    }
    
    return {
      url,
      status: randomStatus,
      responseTime,
      lastChecked: 'just now',
      statusCode,
      title: mockTitle,
      metadata: {
        description: mockDescription,
        keywords: [pageName, 'website', 'example']
      },
      brokenLinks,
      redirectLinks
    };
  },
  
  // Bulk operations
  bulkAnalyzeLinks: async (urls: string[]): Promise<LinkAnalysisResult[]> => {
    await delay(2000);
    
    if (!urls.length) {
      throw { message: 'No URLs provided', status: 400 };
    }
    
    const results: LinkAnalysisResult[] = [];
    
    for (const url of urls) {
      try {
        new URL(url);
        const result = await apiService.analyzeLink(url);
        results.push(result);
      } catch (error) {
        results.push({
          url,
          status: 'broken',
          lastChecked: 'just now',
          statusCode: 400,
          title: 'Invalid URL'
        });
      }
    }
    
    return results;
  }
};

// Utility function to handle API errors consistently
export async function fetchWithErrorHandling<T>(
  apiCall: () => Promise<T>,
  errorMessage = "An error occurred"
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    const apiError = error as APIError;
    toast.error(apiError.message || errorMessage);
    throw error;
  }
}
