
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client
// Note: In a production environment, these would come from environment variables
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseUser {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export interface SupabaseLink {
  id: string;
  user_id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  response_time: string;
  last_checked: string;
  created_at: string;
}

export interface SupabaseInvoice {
  id: string;
  user_id: string;
  amount: number;
  date: string;
  status: string;
  description: string;
}

// Supabase service with methods to interact with the database
export const supabaseService = {
  // Auth methods
  signUp: async (email: string, password: string, name: string): Promise<SupabaseUser> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          plan: 'free',
        },
      },
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    if (!data.user) {
      throw new Error('No user returned from signup');
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata.name || '',
      plan: data.user.user_metadata.plan || 'free',
    };
  },

  signIn: async (email: string, password: string): Promise<SupabaseUser> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }

    if (!data.user) {
      throw new Error('No user returned from signin');
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata.name || '',
      plan: data.user.user_metadata.plan || 'free',
    };
  },

  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<SupabaseUser | null> => {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata.name || '',
      plan: data.user.user_metadata.plan || 'free',
    };
  },

  // Links methods
  getLinks: async (): Promise<SupabaseLink[]> => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data || [];
  },

  createLink: async (url: string): Promise<SupabaseLink> => {
    // First, analyze the link to determine its status
    const status = await supabaseService.analyzeLink(url);
    
    const { data, error } = await supabase
      .from('links')
      .insert({
        url,
        status: status.status,
        response_time: status.responseTime,
        last_checked: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data;
  },

  updateLink: async (id: string, updates: Partial<SupabaseLink>): Promise<SupabaseLink> => {
    const { data, error } = await supabase
      .from('links')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data;
  },

  deleteLink: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error(error.message);
      throw error;
    }
  },

  // This would call an external API or Supabase Edge Function to analyze the link
  analyzeLink: async (url: string): Promise<{ status: 'healthy' | 'broken' | 'redirected', responseTime: string }> => {
    try {
      // In a real implementation, this would call an edge function or external API
      // For now, we'll simulate the analysis
      const response = await fetch(`https://api.linkanalysis.example/check?url=${encodeURIComponent(url)}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        return { status: 'broken', responseTime: '-' };
      }
      
      // Simulated response data
      return { 
        status: Math.random() > 0.2 ? 'healthy' : Math.random() > 0.5 ? 'broken' : 'redirected',
        responseTime: `${(Math.random() * 2 + 0.5).toFixed(1)}s` 
      };
    } catch (error) {
      console.error('Error analyzing link:', error);
      return { status: 'broken', responseTime: '-' };
    }
  },

  // Billing/invoices methods
  getInvoices: async (): Promise<SupabaseInvoice[]> => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      toast.error(error.message);
      throw error;
    }

    return data || [];
  },

  // This would typically be handled by a payment processor like Stripe
  updatePaymentMethod: async (paymentMethodId: string): Promise<void> => {
    // In a real implementation, this would call a secure endpoint
    // For now, we'll just simulate success
    console.log('Payment method updated:', paymentMethodId);
  },
};

// Utility to convert Supabase types to our frontend types
export const supabaseConverters = {
  linkToFrontend: (link: SupabaseLink): any => ({
    id: link.id,
    url: link.url,
    status: link.status,
    responseTime: link.response_time,
    lastChecked: link.last_checked,
  }),
  
  userToFrontend: (user: SupabaseUser): any => ({
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
  }),
  
  invoiceToFrontend: (invoice: SupabaseInvoice): any => ({
    id: invoice.id,
    amount: invoice.amount,
    date: invoice.date,
    status: invoice.status,
    description: invoice.description,
  }),
};
