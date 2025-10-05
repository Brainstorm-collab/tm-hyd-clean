import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import { validateRegistrationEmail } from '../../utils/validEmails';
import { Logo } from '../ui/Logo';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignup: (name: string, email: string, password: string) => void;
  onContinueAsGuest: () => void;
}

export const SocialManualSignup: React.FC<SignupProps> = ({
  onSwitchToLogin,
  onSignup,
  onContinueAsGuest
}) => {
  const [formData, setFormData] = useState({
    username: 'Johnsonwillamson',
    email: 'Johnsonwillamson@gmail.com',
    password: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveTips, setReceiveTips] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateUsername = (username: string) => {
    return username.trim().length >= 3;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Validate email using the registration validation system
    const emailValidation = validateRegistrationEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Password is optional for this compact signup

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSignup(formData.username, formData.email, 'defaultPassword123');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
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
      <div className="flex items-center justify-center h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white  shadow-2xl border-2 border-gray-200 p-4">
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Smile className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 text-center mb-1">
              Sign Up to Superpage
            </h1>
            <p className="text-gray-600 text-center mb-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium"
              >
                Login
              </button>
            </p>

            {/* Social Login */}
            <div className="space-y-2 mb-3">
              <button className="w-full flex items-center justify-center px-3 py-2.5 border border-gray-300  hover:bg-gray-50 transition-colors text-sm">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>
              <button className="w-full flex items-center justify-center px-3 py-2.5 border border-gray-300  hover:bg-gray-50 transition-colors text-sm">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B40ED] focus:border-purple-500 ${
                    errors.username ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border  focus:ring-2 focus:ring-[#6B40ED] focus:border-purple-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>


              {/* Checkboxes */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className={`mt-1 w-4 h-4 rounded-sm border-gray-300 focus:ring-2 ${
                      errors.terms ? 'border-red-300' : ''
                    }`}
                    style={{ accentColor: '#6B40ED' }}
                  />
                  <label className="text-sm text-gray-700">
                    I accept Superpage's{' '}
                    <span className="cursor-pointer hover:opacity-80 text-[#6B40ED] hover:text-[#6B40ED]/80">Terms of Service</span>
                    {' '}and{' '}
                    <span className="cursor-pointer hover:opacity-80 text-[#6B40ED] hover:text-[#6B40ED]/80">Privacy Policy</span>
                    . Also I agreed superpage{' '}
                    <span className="cursor-pointer hover:opacity-80 text-[#6B40ED] hover:text-[#6B40ED]/80">Refund policy</span>.
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-600">{errors.terms}</p>
                )}

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={receiveTips}
                    onChange={(e) => setReceiveTips(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-sm border-gray-300 focus:ring-2"
                    style={{ accentColor: '#6B40ED' }}
                  />
                  <label className="text-sm text-gray-700">
                    I wish to receive UI tips and offers from Superpage.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white  hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                Register Now
              </button>

            </form>
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
