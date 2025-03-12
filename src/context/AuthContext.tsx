
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService, UserData } from '@/services/api';
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
        const currentUser = await apiService.getCurrentUser();
        setUser(currentUser);
        
        // If on login or signup page but already authenticated, redirect to dashboard
        const path = window.location.pathname;
        if (currentUser && (path === '/login' || path === '/signup')) {
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
          const user = await apiService.getCurrentUser();
          setUser(user);
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
      await apiService.login(email, password);
      const user = await apiService.getCurrentUser();
      setUser(user);
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
      await apiService.register(name, email, password);
      const user = await apiService.getCurrentUser();
      setUser(user);
      toast.success('Registration successful');
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
      await apiService.logout();
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
      
      // Update the profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: userData.name ? userData.name.split(' ')[0] : undefined,
          last_name: userData.name ? userData.name.split(' ').slice(1).join(' ') : undefined,
          plan: userData.plan
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
