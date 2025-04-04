
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'farmer' | 'operator' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('bioHarvestUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('bioHarvestUser');
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    // In a real app, you would validate credentials against a backend
    // For this demo, we'll simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('bioHarvestUser', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    // In a real app, you would send this data to your backend for account creation
    // For this demo, we'll simulate a successful signup
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          role
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('bioHarvestUser', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
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
