
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchApi } from '../utils/api';

type UserRole = 'farmer' | 'operator' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Update API_URL to use the correct port
const API_URL = 'http://localhost:8080/api/users/';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for existing login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('bioHarvestUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Verify token is still valid
        const verifyToken = async () => {
          try {
            await fetchApi('users/me', {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`,
              },
            });
          } catch (error) {
            console.error('Token verification failed:', error);
            logout();
            toast({
              title: 'Session expired',
              description: 'Please log in again.',
              variant: 'destructive',
            });
          }
        };
        
        verifyToken();
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('bioHarvestUser');
      }
    }
  }, []);

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    try {
      // Log the data being sent
      console.log('Signup data:', { name, email, password, role });
      
      // Fix endpoint - use 'signup' instead of empty string
      const response = await fetch(`${API_URL}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      // Log response status
      console.log('Signup response status:', response.status);
      
      const data = await response.json();
      
      // Log the response data
      console.log('Signup response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      const userData = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        token: data.token,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('bioHarvestUser', JSON.stringify(userData));
    } catch (error: any) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Log the data being sent
      console.log('Login data:', { email, password });

      const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Log response status
      console.log('Login response status:', response.status);
      
      const data = await response.json();
      
      // Log the response data
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      const userData = {
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        token: data.token,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('bioHarvestUser', JSON.stringify(userData));
    } catch (error: any) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bioHarvestUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
