import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { validateLoginEmail } from '../../utils/validEmails';
import { Logo } from '../ui/Logo';

interface ForgotPasswordProps {
  onSwitchToLogin: () => void;
  onResetPassword: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSwitchToLogin,
  onResetPassword
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email using the registered emails system
    const emailValidation = validateLoginEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    setError('');
    onResetPassword(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-sm">
          <div className="bg-white  shadow-2xl border-2 border-gray-200 p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100  flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#6B40ED]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-center mb-6 text-sm">
              We'll send new password link to email
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full px-3 py-2 border  focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2.5  hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                Send Password Link
              </button>

              {/* Back to Login Link */}
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

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-8">
            © Superpage team
          </p>
        </div>
      </div>
    </div>
  );
};
