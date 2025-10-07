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
    FB: any;
    fbAsyncInit: () => void;
    google: any;
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
        // Show success toast with Google-specific message
        success(
          'Welcome to Task Manager! 🎉', 
          `You have successfully logged in with Google! We're happy to have you here. Enjoy using the app!`
        );
        onSuccess?.();
      } else {
        // Show failure toast
        error('Google Login Failed', 'You are not logged in via Google. Please try again or use another login method.');
      }
    } catch (err) {
      console.error('Google login error:', err);
      error('Google Login Failed', 'You are not logged in via Google. Login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    error('Google Login Failed', 'You are not logged in via Google. Google login was cancelled or failed. Please try again.');
  };

  // Handle Facebook Login
  const handleFacebookResponse = async (response: any) => {
    try {
      console.log('Facebook OAuth Callback URL:', facebookCallbackUrl);
      console.log('Facebook response:', response);
      console.log('Facebook user data being sent to auth:', {
        name: response.name,
        email: response.email,
        picture: response.picture
      });
      
      // Pass the Facebook response data to the auth context
      const result = await socialLogin('facebook', response);
      
      if (result.success) {
        // Show success toast with Facebook-specific message
        success(
          'Welcome to Task Manager! 🎉', 
          `You have successfully logged in with Facebook! We're happy to have you here. Enjoy using the app!`
        );
        onSuccess?.();
      } else {
        // Show failure toast
        error('Facebook Login Failed', 'You are not logged in via Facebook. Please try again or use another login method.');
      }
    } catch (err) {
      console.error('Facebook login error:', err);
      error('Facebook Login Failed', 'You are not logged in via Facebook. Login failed. Please try again.');
    }
  };

  // Handle Facebook Login with SDK
  const handleFacebookLogin = () => {
    if (disabled) return;
    
    // Check if Facebook SDK is loaded
    if (typeof window.FB === 'undefined') {
      error('Facebook Login Failed', 'You are not logged in via Facebook. Facebook SDK is not loaded. Please refresh the page and try again.');
      return;
    }

     console.log('Starting Facebook login...');
    
    window.FB.login((response: any) => {
      console.log('Facebook login response:', response);
      
      if (response.authResponse) {
        console.log('Facebook auth response:', response.authResponse);
        
        // Get user info with more detailed fields
        window.FB.api('/me', { 
          fields: 'id,name,first_name,last_name,email,picture.width(200).height(200)' 
        }, (userInfo: any) => {
          console.log('Facebook API response:', userInfo);
          
          // Validate that we received user data
          if (!userInfo || userInfo.error) {
            console.error('Facebook API error:', userInfo?.error);
            error('Facebook Login Failed', 'You are not logged in via Facebook. Failed to fetch user information from Facebook.');
            return;
          }
          
          // Create a clean user data object with all the information we need
          const userData = {
            id: userInfo.id || response.authResponse.userID,
            name: userInfo.name,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email || `fb_${userInfo.id}@facebook.local`, // Fallback email if not provided
            picture: userInfo.picture?.data?.url || userInfo.picture,
            // Include auth response data
            accessToken: response.authResponse.accessToken,
            userID: response.authResponse.userID,
            expiresIn: response.authResponse.expiresIn,
            signedRequest: response.authResponse.signedRequest
          };
          
          console.log('Final Facebook user data being sent to AuthContext:', userData);
          console.log('User data validation:', {
            hasName: !!userData.name,
            hasEmail: !!userData.email,
            hasId: !!userData.id,
            hasPicture: !!userData.picture,
            hasAccessToken: !!userData.accessToken,
            emailSource: userInfo.email ? 'Facebook API' : 'Generated fallback'
          });
          
          // Additional validation
          if (!userData.name) {
            console.warn('No name from Facebook, using fallback');
            userData.name = userData.first_name || 'Facebook User';
          }
          
          if (!userData.email || userData.email.includes('facebook.local')) {
            console.warn('No email from Facebook, using generated fallback');
          }
          
          handleFacebookResponse(userData);
        });
      } else {
        console.log('Facebook login failed or cancelled');
        error('Facebook Login Failed', 'You are not logged in via Facebook. Login was cancelled or failed.');
      }
    }, { scope: 'email,public_profile' }); // Request both email and public profile permissions
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
