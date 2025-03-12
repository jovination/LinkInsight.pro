
import { supabase } from '@/integrations/supabase/client';

export interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  responseTime: string;
  lastChecked: string;
  title?: string;
}

export interface LinkAnalysisResult {
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  statusCode?: number;
  responseTime: string;
  title?: string;
  redirectUrl?: string;
  errors?: string[];
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

export interface InvoiceData {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  // Add any other user fields here
}

// Mock database - use this as fallback when not connected to Supabase
const mockDb = {
  users: [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      plan: 'pro' as const,
    }
  ],
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
  notifications: [
    { id: '1', message: 'Your link https://example.com/blog is broken', date: new Date(), read: false },
    { id: '2', message: 'New feature released: Scheduled link checks', date: new Date(), read: true },
  ],
  invoices: [
    { id: '1', date: '2023-04-01', amount: '$29.99', status: 'paid' as const, downloadUrl: '#' },
    { id: '2', date: '2023-03-01', amount: '$29.99', status: 'paid' as const, downloadUrl: '#' },
    { id: '3', date: '2023-02-01', amount: '$29.99', status: 'paid' as const, downloadUrl: '#' },
  ]
};

// Function to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Fetch links from Supabase or fallback to mock data
  getLinks: async (): Promise<LinkData[]> => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        return data.map(link => ({
          id: link.id,
          url: link.url,
          status: link.status as 'healthy' | 'broken' | 'redirected',
          responseTime: link.response_time || '-',
          lastChecked: new Date(link.last_checked).toLocaleString(),
          title: link.title
        }));
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    }
    
    // Fallback to mock data if Supabase fails or returns no data
    return mockDb.links;
  },

  getNotifications: async (): Promise<NotificationData[]> => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        return data.map(notification => ({
          id: notification.id,
          message: notification.message,
          date: new Date(notification.created_at),
          read: notification.read
        }));
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
    
    // Fallback to mock data
    return mockDb.notifications;
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      // Get links to calculate stats
      const { data: links, error } = await supabase
        .from('links')
        .select('*');

      if (error) throw error;

      if (links && links.length > 0) {
        const healthyLinks = links.filter(link => link.status === 'healthy').length;
        const brokenLinks = links.filter(link => link.status === 'broken').length;
        
        // Calculate average response time
        const responseTimes = links
          .filter(link => link.response_time && !isNaN(parseFloat(link.response_time)))
          .map(link => parseFloat(link.response_time));
        
        const avgTime = responseTimes.length > 0 
          ? (responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length).toFixed(1) + 's'
          : '0.0s';
        
        // Calculate health score
        const totalScore = links.length > 0 
          ? Math.round((healthyLinks / links.length) * 100) 
          : 0;
          
        return {
          totalLinks: links.length,
          healthyLinks,
          brokenLinks,
          avgLoadTime: avgTime,
          healthScore: totalScore
        };
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
    
    // Fallback to mock data
    return {
      totalLinks: 150,
      healthyLinks: 120,
      brokenLinks: 5,
      avgLoadTime: '0.7s',
      healthScore: 95,
    };
  },

  // Analyze a single link
  analyzeLink: async (url: string): Promise<LinkAnalysisResult> => {
    await delay(1500); // Simulate API delay
    
    // This would call a backend API in production
    // For now, return mocked data
    const status = Math.random() > 0.2 ? 'healthy' : 'broken';
    
    const result: LinkAnalysisResult = {
      url,
      status: status as 'healthy' | 'broken' | 'redirected',
      statusCode: status === 'healthy' ? 200 : 404,
      responseTime: (Math.random() * 2).toFixed(2) + 's',
      title: 'Page Title'
    };
    
    return result;
  },
  
  // Bulk analyze multiple links
  bulkAnalyzeLinks: async (urls: string[]): Promise<LinkAnalysisResult[]> => {
    await delay(2000); // Simulate API delay
    
    // Mock results - in production, this would call a backend
    return urls.map(url => ({
      url,
      status: Math.random() > 0.2 ? 'healthy' : 'broken' as 'healthy' | 'broken' | 'redirected',
      statusCode: Math.random() > 0.2 ? 200 : 404,
      responseTime: (Math.random() * 2).toFixed(2) + 's',
      title: 'Page Title'
    }));
  },

  checkLink: async (id: string): Promise<void> => {
    try {
      // Get the link first
      const { data: link, error: fetchError } = await supabase
        .from('links')
        .select('*')
        .eq('id', id)
        .single();
        
      if (fetchError) throw fetchError;
      
      if (!link) {
        throw new Error('Link not found');
      }
      
      // Simulate checking the link and update the status
      await delay(1000);
      const status = Math.random() > 0.2 ? 'healthy' : 'broken';
      const responseTime = (Math.random() * 2).toFixed(2);
      
      // Update the link in database
      const { error: updateError } = await supabase
        .from('links')
        .update({
          status,
          response_time: responseTime + 's',
          last_checked: new Date().toISOString()
        })
        .eq('id', id);
        
      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error checking link:', error);
      throw error;
    }
  },

  deleteLink: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  getInvoices: async (): Promise<InvoiceData[]> => {
    // In production, this would fetch from a payment provider like Stripe
    await delay(500);
    return mockDb.invoices;
  },
  
  updatePaymentMethod: async (): Promise<void> => {
    // Mock implementation - would integrate with payment provider API
    await delay(1000);
  },

  getCurrentUser: async (): Promise<UserData | null> => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return null;
      }
      
      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        console.error('Error getting profile:', profileError);
        return null;
      }
      
      return {
        id: user.id,
        name: profile?.first_name && profile?.last_name 
          ? `${profile.first_name} ${profile.last_name}`.trim() 
          : user.email?.split('@')[0] || 'User',
        email: user.email || '',
        plan: (profile?.plan as 'free' | 'pro' | 'enterprise') || 'free'
      };
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name.split(' ')[0] || '',
            last_name: name.split(' ').slice(1).join(' ') || '',
          },
        },
      });
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};
