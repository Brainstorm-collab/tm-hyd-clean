/**
 * ForgotPassword Component
 * 
 * A comprehensive password reset request form that allows users to request a password reset link
 * via email. This component is part of the authentication flow and provides a clean, accessible
 * interface for users who have forgotten their passwords.
 * 
 * Features:
 * - Email validation and submission
 * - Loading states with visual feedback
 * - Toast notifications for success/error states
 * - Responsive design with proper accessibility
 * - Integration with AuthContext for password reset functionality
 * - Navigation back to login form
 * 
 * @component
 * @example
 * <ForgotPassword onSwitchToLogin={() => setCurrentView('login')} />
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Lock } from 'lucide-react';
import { Logo } from '../ui/Logo';

/**
 * Props interface for the ForgotPassword component
 * 
 * @interface ForgotPasswordProps
 * @property {() => void} onSwitchToLogin - Callback function to switch back to login view
 */
interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
}

/**
 * ForgotPassword Component Implementation
 * 
 * Main component that renders the password reset request form with proper state management,
 * form validation, and user feedback mechanisms.
 */
export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ 
  onSwitchToLogin 
}) => {
  // Authentication and notification hooks
  const { forgotPassword } = useAuth();
  const { success, error } = useToast();
  
  // Component state management
  const [email, setEmail] = useState(''); // User's email input
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  /**
   * Handles form submission for password reset request
   * 
   * This function:
   * - Prevents default form submission behavior
   * - Sets loading state to show user feedback
   * - Calls the forgotPassword service from AuthContext
   * - Displays appropriate success/error messages via toast notifications
   * - Handles any unexpected errors gracefully
   * 
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Attempt to send password reset request
      const result = await forgotPassword(email);
      
      if (result.success) {
        // Show success message to user
        success('Reset Link Sent', result.message);
      } else {
        // Show error message if request failed
        error('Failed to Send Reset Link', result.message);
      }
    } catch (err) {
      // Handle unexpected errors
      error('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };
  /**
   * Renders the complete forgot password page layout
   * 
   * The layout includes:
   * - Header with logo and navigation buttons
   * - Centered form container with proper styling
   * - Password reset form with email input
   * - Loading states and user feedback
   * - Navigation back to login
   */
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Logo and Navigation */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Logo size="md" />
          <span className="font-semibold text-lg text-gray-900">Superpage</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 bg-gray-100  hover:bg-gray-200 transition-colors">
            Explore Features
          </button>
          <button className="px-4 py-2 text-white bg-black  hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content Area - Centered Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-sm">
          {/* Password Reset Form Container */}
          <div className="bg-white  shadow-2xl border-2 border-gray-200 p-6">
            {/* Lock Icon Header */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100  flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#6B40ED]" />
              </div>
            </div>

            {/* Form Title and Description */}
            <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-center mb-6 text-sm">
              We'll send new password link to email
            </p>

            {/* Password Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 border-gray-300"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5  hover:bg-gray-800 transition-colors font-medium text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Password Link'}
              </button>

              {/* Navigation Back to Login */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium text-sm"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>

          {/* Footer Copyright */}
          <p className="text-center text-gray-500 text-sm mt-8">© Superpage team</p>
        </div>
      </div>
    </div>
  );
};





