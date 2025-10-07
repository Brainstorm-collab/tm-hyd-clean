import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { FacebookIcon } from "../ui/FacebookIcon";
import { GoogleIcon } from "../ui/GoogleIcon";

// Facebook and Google SDK types
declare global {
  interface Window {
    FB: facebook.FacebookStatic;
    fbAsyncInit: () => void;
    google: typeof gapi;
  }
}

/**
 * SocialLogin Component
 * 
 * Integrates Facebook and Google OAuth login functionality with custom styled buttons.
 * Uses Google Identity Services and Facebook SDK for authentication.
 * 
 * Features:
 * - Custom styled Google OAuth login button matching Facebook button design
 * - Facebook login using Facebook SDK
 * - Integrated with existing AuthContext for user management
 * - Toast notifications for success/error states
 * - Disabled state support for loading states
 * - Callback URL logging for debugging
 * 
 * OAuth Callback URLs:
 * - Google: {baseUrl}/auth/google/callback
 * - Facebook: {baseUrl}/auth/facebook/callback
 * 
 * Environment Variables Required:
 * - REACT_APP_GOOGLE_CLIENT_ID
 * - REACT_APP_FACEBOOK_APP_ID
 * - REACT_APP_BASE_URL (optional, defaults to window.location.origin)
 * 
 * Note: Both Google and Facebook login require HTTPS in production. The warning about HTTP pages
 * is expected in development and will not appear in production with HTTPS.
 */

interface SocialLoginProps {
  onSuccess?: () => void;
  disabled?: boolean;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ 
  onSuccess, 
  disabled = false 
}) => {
  const { socialLogin } = useAuth();
  const { success, error } = useToast();
  
  // Google and Facebook App IDs - using environment variables for better security
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "419183498411-aco9polgjn5va01kbg3legvvmq6ibq1h.apps.googleusercontent.com";
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID || "839782072858430";
  
  // Callback URLs for OAuth providers
  const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin;
  const googleCallbackUrl = `${baseUrl}/auth/google/callback`;
  const facebookCallbackUrl = `${baseUrl}/auth/facebook/callback`;
  
  // Handle Google Login Success
  const handleGoogleSuccess = async (response: any) => {
    try {
      console.log('Google OAuth Callback URL:', googleCallbackUrl);
      console.log('Google response:', response);
      
      // Extract user data from the response
      const userData = response.userData || response;
      
      console.log('Google user data:', userData);
      
      const result = await socialLogin('google', userData);
      
      if (result.success) {
        success('Welcome!', `Successfully signed in with Google as ${userData.name}`);
        onSuccess?.();
      } else {
        error('Login Failed', result.message);
      }
    } catch (err) {
      console.error('Google login error:', err);
      error('Login Failed', 'Google login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    error('Login Failed', 'Google login was cancelled or failed. Please try again.');
  };

  // Handle Facebook Login
  const handleFacebookResponse = async (response: any) => {
    try {
      console.log('Facebook OAuth Callback URL:', facebookCallbackUrl);
      console.log('Facebook response:', response);
      
      // Pass the Facebook response data to the auth context
      const result = await socialLogin('facebook', response);
      
      if (result.success) {
        success('Welcome!', 'Successfully signed in with Facebook');
        onSuccess?.();
      } else {
        error('Login Failed', result.message);
      }
    } catch (err) {
      console.error('Facebook login error:', err);
      error('Login Failed', 'Facebook login failed. Please try again.');
    }
  };

  // Handle Facebook Login with SDK
  const handleFacebookLogin = () => {
    if (disabled) return;
    
    // Check if Facebook SDK is loaded
    if (typeof window.FB === 'undefined') {
      error('Facebook SDK Error', 'Facebook SDK is not loaded. Please refresh the page and try again.');
      return;
    }

    window.FB.login((response: any) => {
      if (response.authResponse) {
        // Get user info
        window.FB.api('/me', { fields: 'name,email,picture' }, (userInfo: any) => {
          const userData = {
            ...response.authResponse,
            user: userInfo
          };
          handleFacebookResponse(userData);
        });
      } else {
        error('Login Failed', 'Facebook login was cancelled or failed.');
      }
    }, { scope: 'email' });
  };


  return (
    <div className="space-y-2">
      <GoogleOAuthProvider clientId={googleClientId}>
        <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
          <GoogleLogin
            onSuccess={disabled ? () => {} : handleGoogleSuccess}
            onError={disabled ? () => {} : handleGoogleError}
            theme="outline"
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
            useOneTap={false}
            auto_select={false}
          />
        </div>
      </GoogleOAuthProvider>

      <button
        type="button"
        onClick={handleFacebookLogin}
        disabled={disabled}
        className="w-full flex items-center justify-start px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FacebookIcon size={16} className="mr-2 flex-shrink-0" />
        <span className="flex-1 text-center">Sign in with Facebook</span>
      </button>
    </div>
  );
};
