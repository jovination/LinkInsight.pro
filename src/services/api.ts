import { cache } from 'react';

export interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  responseTime: string;
  lastChecked: string;
}

export interface NotificationData {
  id: string;
  message: string;
  date: Date;
  read: boolean;
}

export interface DashboardStats {
  totalLinks: number;
  healthyLinks: number;
  brokenLinks: number;
  avgLoadTime: string;
  healthScore: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  // Add any other user fields here
}

// Mock database
const mockDb = {
  users: [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      plan: 'pro' as const,
      // Add mock data for other user fields
    }
  ],
  links: [
    { id: '1', url: 'https://example.com/homepage', status: 'healthy', responseTime: '0.8s', lastChecked: '2 hours ago' },
    { id: '2', url: 'https://example.com/about', status: 'healthy', responseTime: '1.2s', lastChecked: '2 hours ago' },
    { id: '3', url: 'https://example.com/products', status: 'broken', responseTime: '-', lastChecked: '2 hours ago' },
    { id: '4', url: 'https://example.com/blog', status: 'healthy', responseTime: '1.5s', lastChecked: '2 hours ago' },
    { id: '5', url: 'https://example.com/contact', status: 'healthy', responseTime: '0.9s', lastChecked: '2 hours ago' },
    { id: '6', url: 'https://example.com/services', status: 'healthy', responseTime: '1.1s', lastChecked: '3 hours ago' },
    { id: '7', url: 'https://example.com/resources', status: 'redirected', responseTime: '1.7s', lastChecked: '3 hours ago' },
    { id: '8', url: 'https://example.com/support', status: 'healthy', responseTime: '0.7s', lastChecked: '3 hours ago' },
  ],
  notifications: [
    { id: '1', message: 'Your link https://example.com/blog is broken', date: new Date(), read: false },
    { id: '2', message: 'New feature released: Scheduled link checks', date: new Date(), read: true },
  ]
};

// Function to simulate API calls
const simulateApiCall = async (data: any, error?: boolean) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error('Failed to fetch data'));
      } else {
        resolve(data);
      }
    }, 500);
  });
};

// In a real application, these functions would make actual API calls
export const apiService = {
  getLinks: cache(async (): Promise<LinkData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDb.links;
  }),

  getNotifications: cache(async (): Promise<NotificationData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDb.notifications;
  }),

  getDashboardStats: cache(async (): Promise<DashboardStats> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data
    return {
      totalLinks: 150,
      healthyLinks: 120,
      brokenLinks: 5,
      avgLoadTime: '0.7s',
      healthScore: 95,
    };
  }),

  checkLink: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const linkIndex = mockDb.links.findIndex(link => link.id === id);
    if (linkIndex !== -1) {
      mockDb.links[linkIndex] = {
        ...mockDb.links[linkIndex],
        status: 'healthy',
        responseTime: '0.5s',
        lastChecked: 'Just now',
      };
    }
  },

  deleteLink: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    mockDb.links = mockDb.links.filter(link => link.id !== id);
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const notificationIndex = mockDb.notifications.findIndex(notification => notification.id === id);
    if (notificationIndex !== -1) {
      mockDb.notifications[notificationIndex] = {
        ...mockDb.notifications[notificationIndex],
        read: true,
      };
    }
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    mockDb.notifications = mockDb.notifications.map(notification => ({
      ...notification,
      read: true,
    }));
  },

  getCurrentUser: () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return null;
    }

    try {
      const user = JSON.parse(userString) as UserData;
      return user;
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
      return null;
    }
  },

  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const user = mockDb.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Store auth token and user data in localStorage
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user };
  },

  register: async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: UserData = {
      id: String(mockDb.users.length + 1),
      name,
      email,
      plan: 'free',
    };

    mockDb.users.push(newUser);

    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { user: newUser };
  },

  logout: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
