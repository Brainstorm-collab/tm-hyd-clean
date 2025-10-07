/**
 * AuthContext - Authentication State Management
 * 
 * This context provides comprehensive authentication functionality for the entire application.
 * It manages user authentication state, handles login/logout operations, supports social
 * authentication, and provides guest user functionality. The context also manages user
 * preferences, subscription status, and provides utility functions for authentication
 * state checking.
 * 
 * Key Features:
 * - User authentication and session management
 * - Social login integration (Google, Facebook)
 * - Guest user support with appropriate restrictions
 * - Password reset and OTP verification
 * - User profile management and updates
 * - Premium access checking and subscription management
 * - Persistent session storage with localStorage
 * - Loading states and error handling
 * 
 * Authentication Methods:
 * - Email/password login and signup
 * - Social OAuth (Google, Facebook)
 * - Guest mode for limited access
 * - Password reset via email
 * - OTP verification for enhanced security
 * 
 * State Management:
 * - Current user information and preferences
 * - Authentication status and loading states
 * - Guest user identification and restrictions
 * - Session persistence across browser refreshes
 * 
 * @context
 * @example
 * const { currentUser, login, logout, isAuthenticated } = useAuth();
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Subscription } from '../types';

/**
 * Authentication context type definition
 * 
 * Defines all available authentication methods, state properties, and utility functions
 * that can be accessed through the useAuth hook.
 * 
 * @interface AuthContextType
 */
interface AuthContextType {
  currentUser: User | null;                    // Currently authenticated user or null
  isAuthenticated: boolean;                    // Whether user is authenticated
  isLoading: boolean;                          // Loading state for auth operations
  isGuest: boolean;                            // Whether current user is a guest
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string, options?: { receiveTips?: boolean }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;                          // Logout current user
  continueAsGuest: () => void;                 // Switch to guest mode
  socialLogin: (provider: 'google' | 'facebook', userData?: any) => Promise<{ success: boolean; message: string }>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message: string }>;
  resendOTP: (email: string) => Promise<{ success: boolean; message: string }>;
  checkPremiumAccess: () => boolean;           // Check if user has premium access
}

// Create the authentication context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * 
 * This hook provides access to all authentication functionality and state.
 * It includes error handling to ensure the hook is only used within the
 * AuthProvider component tree.
 * 
 * @returns {AuthContextType} The authentication context value
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * const { currentUser, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Props interface for the AuthProvider component
 * 
 * @interface AuthProviderProps
 * @property {ReactNode} children - Child components to be wrapped by the provider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component - Authentication Context Provider
 * 
 * This provider component wraps the application and provides authentication state
 * and functionality to all child components. It manages user sessions, handles
 * authentication operations, and persists user data across browser sessions.
 * 
 * The provider initializes with session restoration from localStorage and provides
 * all authentication methods including login, signup, social authentication,
 * password reset, and guest mode functionality.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Core authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);  // Current authenticated user
  const [isLoading, setIsLoading] = useState(true);                   // Loading state for auth operations

  /**
   * Effect hook for session restoration on app initialization
   * 
   * This effect runs once when the component mounts to check for existing
   * user sessions stored in localStorage. If a valid session is found,
   * it restores the user state. If parsing fails, it cleans up invalid data.
   */
  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        // Clean up invalid session data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isGuest');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: email,
          avatarUrl: '',
          preferences: {
            theme: 'light',
            notifications: true,
            emailNotifications: true
          },
          subscription: {
            id: 'sub_1',
            plan: 'free',
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            billingCycle: 'monthly',
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 0,
            userCount: 1,
            autoRenew: true
          }
        };
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, options?: { receiveTips?: boolean }): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be an API call
      if (email && password && name) {
        const user: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatarUrl: '',
          preferences: {
            theme: 'light',
            notifications: true,
            emailNotifications: true
          },
          subscription: {
            id: 'sub_1',
            plan: 'free',
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            billingCycle: 'monthly',
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 0,
            userCount: 1,
            autoRenew: true
          }
        };
        // Optionally store marketing preference locally for demo purposes
        if (options?.receiveTips) {
          // no-op persistence stub for now
        }
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, message: 'Account created successfully' };
      } else {
        return { success: false, message: 'Please fill in all fields' };
      }
    } catch (error) {
      return { success: false, message: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isGuest');
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      avatarUrl: '',
      preferences: {
        theme: 'light',
        notifications: false,
        emailNotifications: false
      },
      subscription: {
        id: 'sub_guest',
        plan: 'guest',
        status: 'guest',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        billingCycle: 'none',
        nextBillingDate: new Date().toISOString(),
        amount: 0,
        userCount: 1,
        autoRenew: false
      }
    };
    
    setCurrentUser(guestUser);
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    localStorage.setItem('isGuest', 'true');
  };

  const socialLogin = async (provider: 'google' | 'facebook', userData?: any): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract user data based on provider
      let name = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;
      let email = `user@${provider}.com`;
      let avatarUrl = '';
      
      if (userData) {
        if (provider === 'google') {
          // For Google, userData now contains the decoded JWT token data
          name = userData.name || name;
          email = userData.email || email;
          avatarUrl = userData.picture || avatarUrl;
        } else if (provider === 'facebook') {
          // For Facebook, userData contains the response object
          name = userData.name || name;
          email = userData.email || email;
          avatarUrl = userData.picture?.data?.url || avatarUrl;
        }
      }
      
      const user: User = {
        id: userData?.sub || Date.now().toString(), // Use Google user ID if available
        name: name,
        email: email,
        avatarUrl: avatarUrl,
        preferences: {
          theme: 'light',
          notifications: true,
          emailNotifications: true
        },
        subscription: {
          id: 'sub_1',
          plan: 'free',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          billingCycle: 'monthly',
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 0,
          userCount: 1,
          autoRenew: true
        }
      };
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, message: `Login with ${provider} successful` };
    } catch (error) {
      return { success: false, message: `${provider} login failed. Please try again.` };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email) {
        return { success: true, message: 'Password reset link sent to your email' };
      } else {
        return { success: false, message: 'Please enter a valid email address' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to send reset link. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (token && newPassword) {
        return { success: true, message: 'Password reset successfully' };
      } else {
        return { success: false, message: 'Invalid token or password' };
      }
    } catch (error) {
      return { success: false, message: 'Password reset failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && otp === '123456') { // Mock OTP
        return { success: true, message: 'OTP verified successfully' };
      } else {
        return { success: false, message: 'Invalid OTP' };
      }
    } catch (error) {
      return { success: false, message: 'OTP verification failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email) {
        return { success: true, message: 'OTP resent to your email' };
      } else {
        return { success: false, message: 'Please enter a valid email address' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to resend OTP. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const checkPremiumAccess = (): boolean => {
    if (!currentUser) return false;
    const premiumPlans = ['premium', 'pro', 'enterprise'];
    return premiumPlans.includes(currentUser.subscription?.plan || '');
  };

  const isGuest = currentUser?.id === 'guest' || localStorage.getItem('isGuest') === 'true';

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    isGuest,
    login,
    signup,
    logout,
    continueAsGuest,
    socialLogin,
    updateUser,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
    checkPremiumAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
