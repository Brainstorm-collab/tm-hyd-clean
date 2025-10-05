import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface EmailOTPProps {
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
}

export const EmailOTP: React.FC<EmailOTPProps> = ({
  onVerifyOTP,
  onResendOTP
}) => {
  const [otp, setOtp] = useState(['5', '2', '7', '0', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerifyOTP(otp.join(''));
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
                <Mail className="w-8 h-8 text-[#6B40ED]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
              Verify email address
            </h1>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Enter OTP send to your email
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                Verify Now
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Still not received?{' '}
                  <button
                    type="button"
                    onClick={onResendOTP}
                    className="text-[#6B40ED] hover:text-[#6B40ED]/80 font-medium"
                  >
                    Resend
                  </button>
                </span>
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
