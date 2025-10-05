import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface ForgotPasswordOTPProps {
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordOTP: React.FC<ForgotPasswordOTPProps> = ({ 
  onVerifyOTP, 
  onResendOTP,
  onBackToLogin 
}) => {
  const { error } = useToast();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      onVerifyOTP(fullOtp);
    } else {
      error('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600  flex items-center justify-center">
            <div className="w-4 h-4 bg-white "></div>
          </div>
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
        <div className="w-full max-w-md">
          <div className="bg-white  shadow-lg p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-purple-100  flex items-center justify-center">
                <Mail className="w-10 h-10 text-purple-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Verify email address
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Enter OTP send to your email
            </p>

            {/* OTP Input */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-12 h-12 text-center text-2xl border border-gray-300  focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3  hover:bg-gray-800 transition-colors font-medium"
              >
                Verify Now
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Still not received?{' '}
                  <button
                    type="button"
                    onClick={onResendOTP}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>

              {/* Back to Login Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
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
