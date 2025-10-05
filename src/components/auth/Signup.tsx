import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Smile } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignup: (name: string, email: string, password: string) => void;
  onContinueAsGuest: () => void;
}

export const Signup: React.FC<SignupProps> = ({
  onSwitchToLogin,
  onSignup,
  onContinueAsGuest
}) => {
  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Logo size="md" />
          <span className="font-semibold text-lg text-gray-900">Superpage</span>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
            Explore Features
          </button>
          <button className="px-4 py-2 text-white bg-black hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white shadow-2xl border-2 border-gray-200 p-4">
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-purple-100 flex items-center justify-center">
                <Smile className="w-6 h-6 text-[#6B40ED]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 text-center mb-1">
              Create your account
            </h1>
            <p className="text-gray-600 text-center mb-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium"
              >
                Sign In
              </button>
            </p>

            {/* Clerk Sign Up Component */}
            <div className="mb-3">
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-black hover:bg-gray-800 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors',
                    card: 'shadow-none border-none bg-transparent',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 'w-full flex items-center justify-center px-3 py-2.5 border border-gray-300 hover:bg-gray-50 transition-colors text-sm bg-white text-gray-700 font-medium rounded-md mb-2',
                    socialButtonsBlockButtonText: 'text-gray-700 font-medium',
                    dividerLine: 'bg-gray-300',
                    dividerText: 'text-gray-500 text-sm',
                    formFieldInput: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B40ED] focus:border-transparent',
                    formFieldLabel: 'block text-sm font-medium text-gray-700 mb-1',
                    footerActionLink: 'text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium text-sm',
                    identityPreviewText: 'text-gray-600 text-sm',
                    formHeaderTitle: 'hidden',
                    formHeaderSubtitle: 'hidden'
                  }
                }}
                redirectUrl="/"
                signInUrl="/login"
              />
            </div>

            {/* Continue as Guest Button */}
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm mt-2"
            >
              Continue as Guest
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-4">
            © Superpage team
          </p>
        </div>
      </div>
    </div>
  );
};
