
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export type UserRole = 'admin' | 'pro' | 'free';

interface UserRoleContextType {
  userRole: UserRole;
  isLoading: boolean;
  updateUserRole: (role: UserRole) => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isAuthenticated || !user) {
        setUserRole('free');
        setIsLoading(false);
        return;
      }

      try {
        // First check if user role info is in user metadata
        if (user.plan) {
          setUserRole(user.plan as UserRole);
          setIsLoading(false);
          return;
        }

        // If not, get it from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          setUserRole('free');
        } else if (data) {
          setUserRole((data.plan as UserRole) || 'free');
        } else {
          setUserRole('free');
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        setUserRole('free');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user, isAuthenticated]);

  const updateUserRole = async (role: UserRole) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan: role })
        .eq('id', user.id);

      if (error) throw error;
      
      setUserRole(role);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  return (
    <UserRoleContext.Provider value={{ userRole, isLoading, updateUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
