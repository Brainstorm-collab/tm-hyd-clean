import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  calculatePricing, 
  createSubscription, 
  processPayment, 
  createBillingHistory,
  updateUserSubscription,
  startTrialSubscription,
  formatCurrency,
  getPlanDisplayName
} from '../../utils/billingService';
import { PaymentMethod } from '../../types';

export const PremiumPlan: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userCount, setUserCount] = useState(25);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'premium'>('premium');
  const [showToast, setShowToast] = useState(false);
  const [isQRPayment, setIsQRPayment] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubscribe = (plan: 'starter' | 'premium') => {
    setSelectedPlan(plan);
    setPaymentError(null);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentMethod: PaymentMethod, isQRPaymentFlag = false) => {
    if (!currentUser) return;
    
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      // Create subscription
      const subscription = createSubscription(
        selectedPlan,
        billingCycle,
        userCount,
        paymentMethod,
        currentUser.id
      );
      
      // Process payment
      const paymentResult = await processPayment(subscription, paymentMethod);
      
      if (paymentResult.success) {
        // Create billing history
        const billingHistory = createBillingHistory(
          subscription,
          paymentResult.transactionId!,
          'paid'
        );
        
        // Update user with subscription
        const updatedUser = updateUserSubscription(currentUser, subscription);
        updateUser(updatedUser);
        
        setShowPaymentModal(false);
        setShowToast(true);
        setIsQRPayment(isQRPaymentFlag);
        setCountdown(5);
        
        // Start countdown
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              navigate('/home');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setPaymentError(paymentResult.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartTrial = async (plan: 'starter' | 'premium') => {
    if (!currentUser) return;
    
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      // Start trial subscription
      const trialSubscription = startTrialSubscription(plan, userCount, currentUser.id);
      
      // Update user with trial subscription
      const updatedUser = updateUserSubscription(currentUser, trialSubscription);
      updateUser(updatedUser);
      
      setShowToast(true);
      setCountdown(5);
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            navigate('/home');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setPaymentError('Failed to start trial. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPricing = (plan: 'starter' | 'premium') => {
    return calculatePricing(plan, userCount, billingCycle);
  };

  const getDiscount = () => {
    const pricing = getPricing('premium'); // Use premium for discount calculation
    return billingCycle === 'yearly' ? `Save ${formatCurrency(pricing.yearlySavings)}` : '';
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade to Premium Plan</h1>
            <p className="text-gray-600">
              Get Unlimited features with {getDiscount()} in Yearly Plan
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* User Count Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">20</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">{userCount} users</span>
            </div>
            <span className="text-sm text-gray-600">1000+</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="20"
              max="1000"
              value={userCount}
              onChange={(e) => setUserCount(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((userCount - 20) / (1000 - 20)) * 100}%, #E5E7EB ${((userCount - 20) / (1000 - 20)) * 100}%, #E5E7EB 100%)`
              }}
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Free Plan */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Plan</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">$0</span>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">What's Included ?</h4>
              <div className="space-y-2">
                {['Access to free files', 'Access to free files', 'Access to free files'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">Current Plan</p>
              <p className="text-xs text-gray-500">Ends on 20 may 2022</p>
            </div>
          </div>

          {/* Starter Plan */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter Plan</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{getPricing('starter').displayPrice}</span>
              <span className="text-gray-600"> /{billingCycle === 'yearly' ? 'year' : 'month'}</span>
              {billingCycle === 'yearly' && (
                <div className="text-sm text-green-600 font-medium mt-1">
                  Save {formatCurrency(getPricing('starter').yearlySavings)} per year
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">What's Included ?</h4>
              <div className="space-y-2">
                {[
                  '10 Users allowed',
                  '25 boards and tasks',
                  'Apps Integrations',
                  '2 Tasks automation bots',
                  'Community access'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleSubscribe('starter')}
                disabled={isProcessing}
                className="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Subscribe Now'}
              </button>
              <button
                onClick={() => handleStartTrial('starter')}
                disabled={isProcessing}
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50"
              >
                Start 30-Day Trial
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Plan</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{getPricing('premium').displayPrice}</span>
              <span className="text-gray-600"> /{billingCycle === 'yearly' ? 'year' : 'month'}</span>
              {billingCycle === 'yearly' && (
                <div className="text-sm text-green-600 font-medium mt-1">
                  Save {formatCurrency(getPricing('premium').yearlySavings)} per year
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">What's Included ?</h4>
              <div className="space-y-2">
                {[
                  'Unlimited Users allowed',
                  'Unlimited boards and tasks',
                  'Apps Integrations',
                  'Unlimited tasks automation bots',
                  'Community access'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleSubscribe('premium')}
                disabled={isProcessing}
                className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Subscribe Now'}
              </button>
              <button
                onClick={() => handleStartTrial('premium')}
                disabled={isProcessing}
                className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm disabled:opacity-50"
              >
                Start 30-Day Trial
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Terms and Policies</h4>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            <a href="#" className="text-purple-600 hover:text-purple-700">Terms and Conditions</a>
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          plan={selectedPlan}
          pricing={getPricing(selectedPlan)}
          billingCycle={billingCycle}
          userCount={userCount}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          isProcessing={isProcessing}
          error={paymentError}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>
              Payment successful! Redirecting to home in {countdown} seconds...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Payment Modal Component
interface PaymentModalProps {
  plan: 'starter' | 'premium';
  pricing: {
    monthlyPrice: number;
    yearlyPrice: number;
    yearlySavings: number;
    displayPrice: string;
    actualPrice: number;
  };
  billingCycle: 'monthly' | 'yearly';
  userCount: number;
  onClose: () => void;
  onSuccess: (paymentMethod: PaymentMethod, isQRPayment?: boolean) => void;
  isProcessing: boolean;
  error: string | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  plan,
  pricing,
  billingCycle,
  userCount,
  onClose,
  onSuccess,
  isProcessing,
  error
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'netbanking' | 'upi'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [netbankingDetails, setNetbankingDetails] = useState({
    bank: '',
    username: '',
    password: ''
  });
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [qrPaymentComplete, setQrPaymentComplete] = useState(false);

  const handlePayment = () => {
    // Create payment method object
    const paymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: selectedMethod,
      ...(selectedMethod === 'card' && {
        last4: cardDetails.number.slice(-4),
        brand: 'visa', // In real app, detect from card number
        expiryMonth: parseInt(cardDetails.expiry.split('/')[0]),
        expiryYear: parseInt('20' + cardDetails.expiry.split('/')[1])
      }),
      ...(selectedMethod === 'netbanking' && {
        bankName: netbankingDetails.bank
      }),
      ...(selectedMethod === 'upi' && {
        upiId: upiId
      })
    };

    if (selectedMethod === 'upi') {
      setShowQR(true);
      // Auto redirect after 10 seconds for QR payments
      setTimeout(() => {
        onSuccess(paymentMethod, true);
      }, 10000);
    } else {
      // Simulate payment processing for other methods
      setTimeout(() => {
        onSuccess(paymentMethod, false);
      }, 2000);
    }
  };

  const handleQRPaymentComplete = () => {
    setQrPaymentComplete(true);
    const paymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'upi',
      upiId: upiId
    };
    setTimeout(() => {
      onSuccess(paymentMethod, true);
    }, 1000);
  };

  // Generate QR code pattern
  const generateQRCode = () => {
    const size = 21; // 21x21 grid for better QR appearance
    const qrData = [];
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create corner squares (finder patterns)
        const isCorner = (i < 7 && j < 7) || (i < 7 && j > 13) || (i > 13 && j < 7);
        // Create timing patterns
        const isTiming = (i === 6 || j === 6) && !isCorner;
        // Create data pattern
        const isData = !isCorner && !isTiming && (i + j) % 3 === 0;
        // Random fill for realistic appearance
        const isRandom = Math.random() > 0.5;
        
        const shouldFill = isCorner || isTiming || isData || isRandom;
        row.push(shouldFill);
      }
      qrData.push(row);
    }
    
    return qrData;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Complete Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Plan Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">{getPlanDisplayName(plan)}</h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price: {pricing.displayPrice}/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
            <span>Users: {userCount}</span>
          </div>
          <div className="text-sm text-gray-600">
            Billing: {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
          </div>
          {billingCycle === 'yearly' && (
            <div className="text-sm text-green-600 font-medium mt-1">
              You save {formatCurrency(pricing.yearlySavings)} per year
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Select Payment Method</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={(e) => setSelectedMethod(e.target.value as 'card')}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-sm">Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={selectedMethod === 'netbanking'}
                onChange={(e) => setSelectedMethod(e.target.value as 'netbanking')}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-sm">Net Banking</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={selectedMethod === 'upi'}
                onChange={(e) => setSelectedMethod(e.target.value as 'upi')}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-sm">UPI</span>
            </label>
          </div>
        </div>

        {/* Payment Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {selectedMethod === 'netbanking' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
              <select
                value={netbankingDetails.bank}
                onChange={(e) => setNetbankingDetails({...netbankingDetails, bank: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={netbankingDetails.username}
                onChange={(e) => setNetbankingDetails({...netbankingDetails, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={netbankingDetails.password}
                onChange={(e) => setNetbankingDetails({...netbankingDetails, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {selectedMethod === 'upi' && !showQR && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
            <input
              type="text"
              placeholder="user@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {selectedMethod === 'upi' && showQR && (
          <div className="mb-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-4">Scan QR Code to Pay</h4>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-4">
                <div className="w-64 h-64 mx-auto bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <div className="w-56 h-56 bg-white border-2 border-gray-300 rounded-lg p-2">
                    {/* Real QR Code Pattern */}
                    <div className="w-full h-full bg-white" style={{ display: 'grid', gridTemplateColumns: 'repeat(21, 1fr)', gap: '0' }}>
                      {generateQRCode().map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-full h-full ${cell ? 'bg-black' : 'bg-white'}`}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Amount:</span> {formatCurrency(pricing.actualPrice)}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Users:</span> {userCount}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">UPI ID:</span> {upiId}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Scan this QR code with any UPI app to complete payment
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleQRPaymentComplete}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Payment Complete
                </button>
                <button
                  onClick={() => setShowQR(false)}
                  className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        {!(selectedMethod === 'upi' && showQR) && (
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay ${pricing.displayPrice}`}
          </button>
        )}
      </div>
    </div>
  );
};
