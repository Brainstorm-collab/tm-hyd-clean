import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { FacebookIcon } from "../ui/FacebookIcon";
import { GoogleIcon } from "../ui/GoogleIcon";

/**
 * SocialLogin Component
 * 
 * Integrates Facebook and Google OAuth login functionality.
 * Uses the provided Google Client ID and Facebook App ID from the reference code.
 * 
 * Features:
 * - Google OAuth login using @react-oauth/google
 * - Facebook login using react-facebook-login
 * - Integrated with existing AuthContext for user management
 * - Toast notifications for success/error states
 * - Disabled state support for loading states
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
  
  // Google and Facebook App IDs from your reference code
  const googleClientId = "419183498411-aco9polgjn5va01kbg3legvvmq6ibq1h.apps.googleusercontent.com";
  const facebookAppId = "839782072858430";
  
  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google Login Success:", credentialResponse);
      
      // In a real app, you would decode the JWT token here to get user info
      // For now, we'll pass the credential response to the auth context
      const result = await socialLogin('google', credentialResponse);
      
      if (result.success) {
        success('Welcome!', 'Successfully signed in with Google');
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
    console.log("Google Login Failed");
    error('Login Failed', 'Google login was cancelled or failed.');
  };

  // Handle Facebook Login
  const handleFacebookResponse = async (response: any) => {
    try {
      console.log("Facebook Login Success:", response);
      
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

  return (
    <div className="space-y-2">
      <GoogleOAuthProvider clientId={googleClientId}>
        <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
          <button
            type="button"
            onClick={() => {
              if (!disabled) {
                // Trigger Google login programmatically
                const googleLogin = document.querySelector('[data-testid="google-login-button"]') as HTMLElement;
                if (googleLogin) {
                  googleLogin.click();
                }
              }
            }}
            disabled={disabled}
            className="w-full flex items-center justify-start px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon size={16} className="mr-2 flex-shrink-0" />
            <span className="flex-1 text-center">Sign in with Google</span>
          </button>
          
          <div style={{ display: 'none' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              text="signin_with"
              shape="rectangular"
              data-testid="google-login-button"
            />
          </div>
        </div>
      </GoogleOAuthProvider>

      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            // Trigger Facebook login programmatically
            const fbLogin = document.querySelector('.fb-login-button') as HTMLElement;
            if (fbLogin) {
              fbLogin.click();
            }
          }
        }}
        disabled={disabled}
        className="w-full flex items-center justify-start px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FacebookIcon size={16} className="mr-2 flex-shrink-0" />
        <span className="flex-1 text-center">Sign in with Facebook</span>
      </button>
      
      <div style={{ display: 'none' }}>
        <FacebookLogin
          appId={facebookAppId}
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookResponse}
          isDisabled={disabled}
          cssClass="fb-login-button"
        />
      </div>
    </div>
  );
};
