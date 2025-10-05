import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Facebook } from "lucide-react";
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
        className="w-full flex items-center justify-center px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md"
      >
        <Facebook className="w-5 h-5 mr-3 text-[#1877F2]" />
        Continue with Facebook
      </button>
    </div>
  );
};