import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

export const usePremiumAccess = () => {
  const { checkPremiumAccess, isGuest } = useAuth();
  const { warning } = useToast();
  const navigate = useNavigate();

  const requirePremiumAccess = (featureName: string = 'this feature'): boolean => {
    if (checkPremiumAccess()) {
      return true;
    }

    // Check if user is a guest or signed-in non-premium user
    if (isGuest) {
      // Guest user - show sign in message
      warning(
        'Premium Feature',
        `Please sign in to access ${featureName}. Guest users have limited access.`,
        {
          label: 'Sign In',
          onClick: () => {
            navigate('/login');
          }
        }
      );
    } else {
      // Signed-in non-premium user - show upgrade message
      warning(
        'Premium Feature',
        `Upgrade to premium to access ${featureName}.`,
        {
          label: 'Upgrade',
          onClick: () => {
            navigate('/premium');
          }
        }
      );
    }

    return false;
  };

  const showGuestLimitation = (featureName: string = 'this feature') => {
    warning(
      'Guest Access Limited',
      `As a guest user, you cannot access ${featureName}. Please sign in to unlock all features.`,
      {
        label: 'Sign In',
        onClick: () => {
          navigate('/login');
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