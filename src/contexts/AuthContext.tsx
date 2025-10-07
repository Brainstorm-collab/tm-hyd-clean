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
    // Initialize demo user if no users exist
    const storedUsers = localStorage.getItem('registeredUsers');
    if (!storedUsers) {
      const demoUser = {
        id: 'demo-1',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password',
        avatarUrl: '',
        preferences: {
          theme: 'light' as const,
          notifications: true,
          emailNotifications: true
        },
        subscription: {
          id: 'sub_1',
          plan: 'free' as const,
          status: 'active' as const,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          billingCycle: 'monthly' as const,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 0,
          userCount: 1,
          autoRenew: true
        },
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('registeredUsers', JSON.stringify([demoUser]));
    }

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
      
      // Get stored users from localStorage
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user exists and password matches
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Create user object for current session
        const currentUser: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl || '',
          preferences: user.preferences || {
            theme: 'light' as const,
            notifications: true,
            emailNotifications: true
          },
          subscription: user.subscription || {
            id: 'sub_1',
            plan: 'free' as const,
            status: 'active' as const,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            billingCycle: 'monthly' as const,
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 0,
            userCount: 1,
            autoRenew: true
          }
        };
        
      setCurrentUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Log successful login with user data
      console.log('AuthContext: User logged in successfully:', {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        hasAvatar: !!currentUser.avatarUrl
      });
      
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
      
      // Validate input
      if (!email || !password || !name) {
        return { success: false, message: 'Please fill in all fields' };
      }
      
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return { success: false, message: 'An account with this email already exists' };
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In production, this should be hashed
        avatarUrl: '',
        preferences: {
          theme: 'light' as const,
          notifications: true,
          emailNotifications: true
        },
        subscription: {
          id: 'sub_1',
          plan: 'free' as const,
          status: 'active' as const,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          billingCycle: 'monthly' as const,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 0,
          userCount: 1,
          autoRenew: true
        },
        receiveTips: options?.receiveTips || false,
        createdAt: new Date().toISOString()
      };
      
      // Add new user to stored users
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Create current user object (without password)
      const currentUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        preferences: newUser.preferences,
        subscription: newUser.subscription
      };
      
      setCurrentUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Log successful signup with user data
      console.log('AuthContext: User signed up successfully:', {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email
      });
      
      return { success: true, message: 'Account created successfully' };
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
    // Note: We keep 'registeredUsers' in localStorage so users can log back in
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      avatarUrl: '',
      preferences: {
        theme: 'light' as const,
        notifications: false,
        emailNotifications: false
      },
      subscription: {
        id: 'sub_guest',
        plan: 'guest' as const,
        status: 'guest' as const,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        billingCycle: 'none' as const,
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
      let firstName = '';
      let lastName = '';
      let email = `user@${provider}.com`;
      let avatarUrl = '';
      let userId = Date.now().toString();
      let phone = '';
      let location = '';
      let website = '';
      let bio = '';
      
      if (userData) {
        if (provider === 'google') {
          // For Google, userData now contains the decoded JWT token data
          console.log('Google userData received in AuthContext:', userData);
          console.log('Google userData keys:', Object.keys(userData || {}));
          
          name = userData.name || name;
          firstName = userData.given_name || '';
          lastName = userData.family_name || '';
          email = userData.email || email;
          // Handle Google profile picture with proper URL processing
          const googlePicture = (userData as any).picture;
          if (googlePicture) {
            console.log('Processing Google picture URL:', googlePicture);
            
            // If it's a Google profile image, ensure it has proper parameters
            if (googlePicture.includes('googleusercontent.com')) {
              // Check if URL already has size parameters
              if (googlePicture.includes('=')) {
                // URL already has parameters, use as is
                avatarUrl = googlePicture;
              } else {
                // Add size parameter for better image quality
                avatarUrl = `${googlePicture}=s200-c`;
              }
            } else {
              // Not a Google URL, use as is
              avatarUrl = googlePicture;
            }
            
            console.log('Processed avatar URL:', avatarUrl);
          } else {
            console.log('No Google picture found in userData');
            avatarUrl = avatarUrl;
          }
          userId = userData.sub || userId;
          
          console.log('Google picture URL details:');
          console.log('  originalPicture:', (userData as any).picture);
          console.log('  finalAvatarUrl:', avatarUrl);
          console.log('  pictureType:', typeof (userData as any).picture);
          console.log('  pictureLength:', (userData as any).picture?.length);
          
          // Extract additional Google profile data if available
          if (userData.locale) {
            location = userData.locale;
          }
          
          console.log('Extracted Google data:', { name, firstName, lastName, email, avatarUrl, userId, location });
          console.log('Google data validation:', {
            hasName: !!name && name !== 'Google User',
            hasFirstName: !!firstName,
            hasLastName: !!lastName,
            hasEmail: !!email && email !== 'user@google.com',
            hasAvatar: !!avatarUrl,
            hasUserId: !!userId && userId !== Date.now().toString(),
            hasLocation: !!location
          });
        } else if (provider === 'facebook') {
          // For Facebook, userData contains the response object with user info spread directly
          console.log('Facebook userData received in AuthContext:', userData);
          console.log('Facebook userData keys:', Object.keys(userData || {}));
          
          // Extract Facebook user data with proper fallbacks
          name = userData.name || 
                 (userData.first_name && userData.last_name ? `${userData.first_name} ${userData.last_name}` : null) ||
                 userData.first_name || 
                 'Facebook User';
          firstName = userData.first_name || '';
          lastName = userData.last_name || '';
          email = userData.email || `fb_${userData.id || Date.now()}@facebook.local`;
          avatarUrl = userData.picture || (userData.picture?.data?.url) || '';
          userId = userData.id || userData.userID || Date.now().toString();
          
          // Extract additional Facebook profile data if available
          if (userData.location) {
            location = userData.location.name || userData.location;
          }
          if (userData.website) {
            website = userData.website;
          }
          if (userData.bio) {
            bio = userData.bio;
          }
          
          console.log('Extracted Facebook data:', { name, firstName, lastName, email, avatarUrl, userId, location, website, bio });
          console.log('Facebook data validation:', {
            hasName: !!name && name !== 'Facebook User',
            hasFirstName: !!firstName,
            hasLastName: !!lastName,
            hasEmail: !!email && email !== 'user@facebook.com',
            hasAvatar: !!avatarUrl,
            hasUserId: !!userId && userId !== Date.now().toString(),
            hasLocation: !!location,
            hasWebsite: !!website,
            hasBio: !!bio
          });
          
          // Validate that we have essential data
          if (!email || email === `user@${provider}.com`) {
            console.warn('Facebook login: No email provided, using fallback');
          }
          if (!name || name === `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`) {
            console.warn('Facebook login: No name provided, using fallback');
          }
        }
      }
      
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Check if user already exists
      let existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        // Auto-set role based on provider
        let defaultRole = '';
        if (provider === 'google') {
          defaultRole = 'Google User';
        } else if (provider === 'facebook') {
          defaultRole = 'Facebook User';
        } else {
          defaultRole = 'Email User';
        }
        
        // Create new user for social login
        const newUser = {
          id: userId,
          name: name,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: '', // No password for social login
          avatarUrl: avatarUrl,
          provider: provider,
          role: defaultRole,
          phone: phone,
          location: location,
          website: website,
          bio: bio,
          preferences: {
            theme: 'light' as const,
            notifications: true,
            emailNotifications: true
          },
          subscription: {
            id: 'sub_1',
            plan: 'free' as const,
            status: 'active' as const,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            billingCycle: 'monthly' as const,
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            amount: 0,
            userCount: 1,
            autoRenew: true
          },
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        existingUser = newUser;
      } else {
        // Update existing user's profile data if it's different or missing
        let userUpdated = false;
        
        if (avatarUrl && existingUser.avatarUrl !== avatarUrl) {
          existingUser.avatarUrl = avatarUrl;
          userUpdated = true;
        }
        
        if (firstName && existingUser.firstName !== firstName) {
          existingUser.firstName = firstName;
          userUpdated = true;
        }
        
        if (lastName && existingUser.lastName !== lastName) {
          existingUser.lastName = lastName;
          userUpdated = true;
        }
        
        if (name && existingUser.name !== name) {
          existingUser.name = name;
          userUpdated = true;
        }
        
        if (location && existingUser.location !== location) {
          existingUser.location = location;
          userUpdated = true;
        }
        
        if (website && existingUser.website !== website) {
          existingUser.website = website;
          userUpdated = true;
        }
        
        if (bio && existingUser.bio !== bio) {
          existingUser.bio = bio;
          userUpdated = true;
        }
        
        // Set role if missing
        if (!existingUser.role) {
          if (provider === 'google') {
            existingUser.role = 'Google User';
          } else if (provider === 'facebook') {
            existingUser.role = 'Facebook User';
          } else {
            existingUser.role = 'Email User';
          }
          userUpdated = true;
        }
        
        if (userUpdated) {
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
      }
      
      // Create current user object (without password)
      const currentUser: User = {
        id: existingUser.id,
        name: existingUser.name,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        avatarUrl: existingUser.avatarUrl,
        provider: existingUser.provider,
        role: existingUser.role,
        phone: existingUser.phone,
        location: existingUser.location,
        website: existingUser.website,
        bio: existingUser.bio,
        preferences: existingUser.preferences,
        subscription: existingUser.subscription
      };
      
      console.log('Final currentUser object being set:', currentUser);
      console.log('User data before localStorage:');
      console.log('  id:', currentUser.id);
      console.log('  name:', currentUser.name);
      console.log('  firstName:', currentUser.firstName);
      console.log('  lastName:', currentUser.lastName);
      console.log('  email:', currentUser.email);
      console.log('  avatarUrl:', currentUser.avatarUrl);
      console.log('  provider:', currentUser.provider);
      console.log('  role:', currentUser.role);
      console.log('  phone:', currentUser.phone);
      console.log('  location:', currentUser.location);
      console.log('  website:', currentUser.website);
      console.log('  bio:', currentUser.bio);
      
      setCurrentUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Verify the user was stored correctly
      const storedUser = localStorage.getItem('currentUser');
      console.log('User stored in localStorage:', storedUser ? JSON.parse(storedUser) : 'No user found');
      
      // Provide specific success message based on provider
      const successMessage = provider === 'facebook' 
        ? 'Facebook login successful! Welcome to Task Manager!'
        : provider === 'google'
        ? 'Google login successful! Welcome to Task Manager!'
        : `Login with ${provider} successful`;
      
      return { success: true, message: successMessage };
    } catch (error) {
      console.error(`${provider} login error:`, error);
      const errorMessage = provider === 'facebook' 
        ? 'You are not logged in via Facebook. Facebook login failed. Please try again.'
        : provider === 'google'
        ? 'You are not logged in via Google. Google login failed. Please try again.'
        : `${provider} login failed. Please try again.`;
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Also update the user in the registeredUsers array if they exist
      const storedUsers = localStorage.getItem('registeredUsers');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updates };
          localStorage.setItem('registeredUsers', JSON.stringify(users));
        }
      }
      
      console.log('AuthContext: User updated successfully:', {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        updatedFields: Object.keys(updates)
      });
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
