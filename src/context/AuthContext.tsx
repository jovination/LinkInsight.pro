
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile?: (userData: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on initial load and setup auth state listener
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // Get current user data
          const { data: authUser } = await supabase.auth.getUser();
          
          if (authUser.user) {
            // Get profile data
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.user.id)
              .single();
              
            const userData: UserData = {
              id: authUser.user.id,
              email: authUser.user.email || '',
              name: profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() : authUser.user.user_metadata.name || '',
              plan: (profileData && profileData.plan as 'free' | 'pro' | 'enterprise') || 'free',
              avatar: profileData?.avatar_url || null
            };
            
            setUser(userData);
          }
        }
        
        // If on login or signup page but already authenticated, redirect to dashboard
        const path = window.location.pathname;
        if (session && (path === '/login' || path === '/signup')) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear potentially corrupted auth data
        await supabase.auth.signOut();
      } finally {
        setIsLoading(false);
      }
    };

    // Initial auth check
    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session) {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            
            if (authUser) {
              // Get profile data
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();
                
              const userData: UserData = {
                id: authUser.id,
                email: authUser.email || '',
                name: profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() : authUser.user_metadata.name || '',
                plan: (profileData && profileData.plan as 'free' | 'pro' | 'enterprise') || 'free',
                avatar: profileData?.avatar_url || null
              };
              
              setUser(userData);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Login handler
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Get profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
          
        const userData: UserData = {
          id: authUser.id,
          email: authUser.email || '',
          name: profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() : authUser.user_metadata.name || '',
          plan: (profileData && profileData.plan as 'free' | 'pro' | 'enterprise') || 'free',
          avatar: profileData?.avatar_url || null
        };
        
        setUser(userData);
      }
      
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed: ' + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Sign up the user
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // Include additional data needed for profile creation
            name
          }
        }
      });
      
      if (error) throw error;
      
      // Get the authenticated user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Split name into first and last name
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        // Update the profile with first and last name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName
          })
          .eq('id', authUser.id);
          
        if (profileError) throw profileError;
        
        // Create user data object
        const userData: UserData = {
          id: authUser.id,
          email: authUser.email || '',
          name: name.trim(),
          plan: 'free',
          avatar: null
        };
        
        setUser(userData);
      }
      
      toast.success('Registration successful. Please check your email to confirm your account.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed: ' + (error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<UserData>) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        throw new Error('Not authenticated');
      }
      
      // Split name into first and last name if provided
      let firstName, lastName;
      if (userData.name) {
        const nameParts = userData.name.trim().split(' ');
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      }
      
      // Update the profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          plan: userData.plan,
          avatar_url: userData.avatar
        })
        .eq('id', authUser.id);
        
      if (error) throw error;
      
      // Update local user state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
