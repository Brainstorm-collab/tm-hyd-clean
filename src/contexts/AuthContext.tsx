import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { getUser, setUser, clearUser } from '../utils/localStorage';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const existingUser = getUser();
    if (existingUser && existingUser.id && existingUser.email) {
      setCurrentUser(existingUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User) => {
    console.log('AuthContext: login called with user:', user);
    setUser(user);
    setCurrentUser(user);
    setIsAuthenticated(true);
    console.log('AuthContext: login completed, isAuthenticated set to true');
  };

  const logout = () => {
    clearUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (user: User) => {
    setUser(user);
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      updateUser
    }}>
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
