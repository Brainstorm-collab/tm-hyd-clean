import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useToast } from "../../contexts/ToastContext";

interface SocialLoginProps {
  onLoginSuccess: (user: any) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ onLoginSuccess }) => {
  const { info } = useToast();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "686577563593-mh7cf2lbm69qc730r1v2bkio3ks92lcv.apps.googleusercontent.com";

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      // Decode Google token to get user info
      const base64Url = credentialResponse.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const userData = JSON.parse(window.atob(base64));

      const user = {
        id: userData.sub,
        name: userData.name,
        email: userData.email,
        avatarUrl: userData.picture,
        provider: "Google",
        role: "user",
        preferences: {
          theme: 'light' as const,
          notifications: true,
          emailNotifications: true
        }
      };

      console.log("Google Login Success:", user);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user);
    } catch (error) {
      console.error("Error decoding Google token:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  const handleFacebookLogin = () => {
    // Dummy Facebook login handler
    console.log("Facebook Login clicked - dummy implementation");
    info("Facebook Login", "Facebook login is not implemented yet. This is a dummy button.");
  };

  return (
    <div className="space-y-2">
      {/* Google Login Button */}
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin 
          onSuccess={handleGoogleSuccess} 
          onError={handleGoogleError}
          theme="outline"
          size="large"
          width="100%"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </GoogleOAuthProvider>

      {/* Facebook Login Button */}
      <button
        onClick={handleFacebookLogin}
        className="w-full relative flex items-center justify-start px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" stroke="#1877F2" strokeWidth="0.5"/>
        </svg>
        <span className="absolute left-1/2 transform -translate-x-1/2">Continue with Facebook</span>
      </button>
    </div>
  );
};