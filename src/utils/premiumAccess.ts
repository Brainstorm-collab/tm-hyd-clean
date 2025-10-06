import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const usePremiumAccess = () => {
  const { checkPremiumAccess, isGuest } = useAuth();
  const { warning } = useToast();

  const requirePremiumAccess = (featureName: string = 'this feature'): boolean => {
    if (checkPremiumAccess()) {
      return true;
    }

    warning(
      'Premium Feature',
      `Please sign in to access ${featureName}. Guest users have limited access.`,
      {
        label: 'Sign In',
        onClick: () => {
          // Navigate to login page
          window.location.href = '/login';
        }
      }
    );

    return false;
  };

  const showGuestLimitation = (featureName: string = 'this feature') => {
    warning(
      'Guest Access Limited',
      `As a guest user, you cannot access ${featureName}. Please sign in to unlock all features.`,
      {
        label: 'Sign In',
        onClick: () => {
          window.location.href = '/login';
        }
      }
    );
  };

  return {
    requirePremiumAccess,
    showGuestLimitation,
    hasPremiumAccess: checkPremiumAccess(),
    isGuest
  };
};
