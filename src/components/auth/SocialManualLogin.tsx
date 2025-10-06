import React, { useState } from 'react';
import { Eye, EyeOff, Smile } from 'lucide-react';
import { validateLoginEmail } from '../../utils/validEmails';
import { Logo } from '../ui/Logo';
import { SocialLogin } from './SocialLogin';

interface LoginProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onLogin: (email: string, password: string) => void;
  onContinueAsGuest: () => void;
  onSocialLogin: (user: any) => void;
}

export const SocialManualLogin: React.FC<LoginProps> = ({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onLogin,
  onContinueAsGuest,
  onSocialLogin
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate email using the registered emails system
    const emailValidation = validateLoginEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin(formData.email, formData.password);
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
        <button 
          onClick={() => window.location.href = '/home'}
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <Logo size="md" />
          <span className="font-semibold text-lg text-gray-900">Superpage</span>
        </button>
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
              <div className="w-12 h-12 bg-purple-100  flex items-center justify-center">
                <Smile className="w-6 h-6 text-[#6B40ED]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 text-center mb-1">
              Sign in to Superpage
            </h1>
            <p className="text-gray-600 text-center mb-4 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium"
              >
                Sign Up
              </button>
            </p>

            {/* Social Login Buttons */}
            <div className="mb-3">
              <SocialLogin onLoginSuccess={onSocialLogin} />
            </div>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border  focus:ring-2 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#6B40ED',
                    '--tw-border-opacity': '1'
                  } as React.CSSProperties}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    style={{ 
                      '--tw-ring-color': '#6B40ED',
                      '--tw-border-opacity': '1'
                    } as React.CSSProperties}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                Login
              </button>

              {/* Continue as Guest Button */}
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm mt-2"
              >
                Continue as Guest
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onSwitchToForgotPassword}
                  className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium text-sm"
                >
                  Forgot Password?
                </button>
              </div>
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
