/**
 * User Display Utilities
 * 
 * This file contains utility functions for displaying user information
 * throughout the application, with special handling for social login data.
 */

import { User } from '../types';

/**
 * Get user initials for avatar fallback
 * @param user - User object
 * @returns User initials string
 */
export const getUserInitials = (user: User | null): string => {
  if (!user) return 'U';
  
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
  
  if (user.name) {
    return user.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  
  return 'U';
};

/**
 * Get user display name with fallback
 * @param user - User object
 * @returns Display name string
 */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'User';
  
  if (user.name) return user.name;
  if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
  if (user.firstName) return user.firstName;
  if (user.lastName) return user.lastName;
  
  return 'User';
};

/**
 * Get user avatar URL with fallback and CORS handling
 * @param user - User object
 * @returns Avatar URL or empty string
 */
export const getUserAvatarUrl = (user: User | null): string => {
  if (!user) {
    console.log('getUserAvatarUrl: No user provided');
    return '';
  }
  
  let avatarUrl = user.avatarUrl || '';
  
  // Handle Google profile images - sometimes they need specific parameters
  if (avatarUrl && user.provider === 'google') {
    // Ensure Google profile images are accessible
    if (avatarUrl.includes('googleusercontent.com')) {
      // Add size parameter to ensure the image is accessible
      if (!avatarUrl.includes('=')) {
        avatarUrl += '?sz=200';
      }
    }
  }
  
  console.log('getUserAvatarUrl:');
  console.log('  userId:', user.id);
  console.log('  userName:', user.name);
  console.log('  originalAvatarUrl:', user.avatarUrl);
  console.log('  processedAvatarUrl:', avatarUrl);
  console.log('  hasAvatar:', !!avatarUrl);
  console.log('  provider:', user.provider);
  
  return avatarUrl;
};

/**
 * Debug function to check user data - can be called from browser console
 * Usage: window.debugUserData()
 */
export const debugUserData = () => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    const user = JSON.parse(userData);
    console.log('=== USER DATA DEBUG ===');
    console.log('Raw localStorage data:', user);
    console.log('Avatar URL:', user.avatarUrl);
    console.log('Provider:', user.provider);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    
    if (user.avatarUrl) {
      console.log('Testing image accessibility...');
      testImageAccessibility(user.avatarUrl).then(accessible => {
        console.log('Image accessible:', accessible);
      });
    }
    
    return user;
  } else {
    console.log('No user data found in localStorage');
    return null;
  }
};

// Make debug function available globally
if (typeof window !== 'undefined') {
  (window as any).debugUserData = debugUserData;
  (window as any).testGoogleImage = (url: string) => {
    console.log('Testing Google image URL:', url);
    const img = new Image();
    img.onload = () => console.log('✅ Image loaded successfully');
    img.onerror = () => console.log('❌ Image failed to load');
    img.src = url;
  };
}

/**
 * Test if an image URL is accessible
 * @param url - Image URL to test
 * @returns Promise<boolean> - Whether the image is accessible
 */
export const testImageAccessibility = async (url: string): Promise<boolean> => {
  if (!url) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
};

/**
 * Get provider display information
 * @param user - User object
 * @returns Provider display object
 */
export const getProviderInfo = (user: User | null) => {
  if (!user || !user.provider) {
    return {
      name: 'Email',
      icon: '📧',
      color: 'gray',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    };
  }
  
  switch (user.provider.toLowerCase()) {
    case 'google':
      return {
        name: 'Google',
        icon: 'G',
        color: 'blue',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        iconBg: 'bg-blue-500'
      };
    case 'facebook':
      return {
        name: 'Facebook',
        icon: 'f',
        color: 'blue',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        iconBg: 'bg-blue-600'
      };
    default:
      return {
        name: user.provider,
        icon: '🔐',
        color: 'gray',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700'
      };
  }
};

/**
 * Check if user has social login data
 * @param user - User object
 * @returns Boolean indicating if user has social login data
 */
export const hasSocialLoginData = (user: User | null): boolean => {
  if (!user) return false;
  return !!(user.provider && user.provider !== 'email');
};

/**
 * Get user profile completeness percentage
 * @param user - User object
 * @returns Percentage of profile completeness (0-100)
 */
export const getProfileCompleteness = (user: User | null): number => {
  if (!user) return 0;
  
  const fields = [
    user.name,
    user.email,
    user.avatarUrl,
    user.phone,
    user.location,
    user.website,
    user.bio,
    user.role
  ];
  
  const filledFields = fields.filter(field => field && field.trim() !== '').length;
  return Math.round((filledFields / fields.length) * 100);
};

/**
 * Get user's social login profile data summary
 * @param user - User object
 * @returns Object with social login data summary
 */
export const getSocialLoginSummary = (user: User | null) => {
  if (!user || !hasSocialLoginData(user)) {
    return {
      hasSocialLogin: false,
      provider: null,
      profileData: {}
    };
  }
  
  return {
    hasSocialLogin: true,
    provider: user.provider,
    profileData: {
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      location: user.location,
      website: user.website,
      bio: user.bio
    }
  };
};