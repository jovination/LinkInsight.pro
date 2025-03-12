
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService, UserData } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = apiService.getCurrentUser();
        setUser(currentUser);
        
        // If on login or signup page but already authenticated, redirect to dashboard
        const path = window.location.pathname;
        if (currentUser && (path === '/login' || path === '/signup')) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear potentially corrupted auth data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Login handler
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user } = await apiService.login(email, password);
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
      const { user } = await apiService.register(name, email, password);
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
      // This would call an API endpoint in a real app
      // For now with our mock API, we'll just update the local storage
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
