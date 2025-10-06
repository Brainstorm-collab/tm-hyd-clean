import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { ModalProvider } from './components/ModalManager';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { ToastContainer } from './components/ui/Toast';
import { Layout } from './components/layout/Layout';
import { Home } from './components/screens/Home';
import { Dashboard } from './components/screens/Dashboard';
import { Inbox } from './components/screens/Inbox';
import { Timeline } from './components/screens/Timeline';
import TeamTimeline from './components/screens/TeamTimeline';
import { Board } from './components/screens/Board';
import { Teams } from './components/screens/Teams';
import { Tasks } from './components/screens/Tasks';
import { Projects } from './components/screens/Projects';
import { Team } from './components/screens/Team';
import { Settings } from './components/screens/Settings';
import { MoreOptions } from './components/screens/MoreOptions';
import { Profile } from './components/screens/Profile';
import { Calendar } from './components/screens/Calendar';
import { KanbanBoard } from './components/screens/KanbanBoard';
import { Notifications } from './components/screens/Notifications';
import { SearchResults } from './components/screens/SearchResults';
import { PremiumPlan } from './components/screens/PremiumPlan';
import { MyContacts } from './components/screens/MyContacts';
import { HelpSupport } from './components/screens/HelpSupport';
import { SocialManualLogin as Login } from './components/auth/SocialManualLogin';
import { SocialManualSignup as Signup } from './components/auth/SocialManualSignup';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { EmailOTP } from './components/auth/EmailOTP';
import { ForgotPasswordOTP } from './components/auth/ForgotPasswordOTP';
import { RoleSelection } from './components/auth/RoleSelection';
// import { EmptyTasks } from './components/empty-states/EmptyTasks';
// import { EmptyProjects } from './components/empty-states/EmptyProjects';
// import { EmptyNotifications } from './components/empty-states/EmptyNotifications';
import { EmptyDashboard } from './components/empty-states/EmptyDashboard';
import { EmptyInbox } from './components/empty-states/EmptyInbox';
import { EmptyTeams } from './components/empty-states/EmptyTeams';
import { EmptyBoards } from './components/empty-states/EmptyBoards';
import { EmptyTimeline } from './components/empty-states/EmptyTimeline';
import { EmptyHome } from './components/empty-states/EmptyHome';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { initializeDummyData, clearAllData } from './utils/localStorage';
import { User } from './types';

// Component to handle login trigger
const LoginTrigger: React.FC<{ onNavigateToLogin?: () => void }> = ({ onNavigateToLogin }) => {
  useEffect(() => {
    console.log('LoginTrigger: Component mounted, onNavigateToLogin:', onNavigateToLogin);
    if (onNavigateToLogin) {
      console.log('LoginTrigger: Calling onNavigateToLogin');
      onNavigateToLogin();
    } else {
      console.log('LoginTrigger: onNavigateToLogin is not available');
    }
  }, [onNavigateToLogin]);
  
  return <Navigate to="/home" replace />;
};

type AuthScreen = 'login' | 'signup' | 'forgot-password' | 'forgot-password-otp' | 'email-otp' | 'role-selection' | 'main';


// Component that handles authentication (temporarily using legacy system)
function AppContent() {
  return <LegacyAppContent />;
}

// Component that handles routing inside Router context
function AppRouter({ onNavigateToLogin, onNavigateToSignup }: { onNavigateToLogin?: () => void; onNavigateToSignup?: () => void }) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { toasts, removeToast } = useToast();
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();

  // Sync activeItem with current route
  useEffect(() => {
    const pathToItemMap: { [key: string]: string } = {
      '/home': 'home',
      '/dashboard': 'dashboard',
      '/teams': 'teams',
      '/boards': 'boards',
      '/inbox': 'inbox',
      '/timeline': 'timeline',
      '/more': 'more',
    };
    
    const currentItem = pathToItemMap[location.pathname];
    if (currentItem && currentItem !== activeItem) {
      setActiveItem(currentItem);
    }
  }, [location.pathname, activeItem]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Layout 
        activeItem={activeItem} 
        onItemClick={handleItemClick} 
        onLogout={handleLogout}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <EmptyHome />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <EmptyDashboard />} />
          <Route path="/teams" element={isAuthenticated ? <Teams /> : <EmptyTeams />} />
          <Route path="/boards" element={isAuthenticated ? <Board /> : <EmptyBoards />} />
          <Route path="/inbox" element={isAuthenticated ? <Inbox /> : <EmptyInbox />} />
          <Route path="/timeline" element={isAuthenticated ? <Timeline /> : <EmptyTimeline />} />
          <Route path="/team-timeline" element={isAuthenticated ? <TeamTimeline /> : <EmptyTimeline />} />
          <Route path="/more" element={<MoreOptions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/premium" element={<PremiumPlan />} />
          <Route path="/contacts" element={<MyContacts />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/login" element={<LoginTrigger onNavigateToLogin={onNavigateToLogin} />} />
        </Routes>
      </Layout>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}

// Component that handles the main app content with authentication (Legacy - kept for SocialManualLogin)
function LegacyAppContent() {
  const { isAuthenticated, currentUser, login, logout } = useAuth();
  const { success, info } = useToast();
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');

  // Debug authentication state
  console.log('AppContent: isAuthenticated =', isAuthenticated, 'currentUser =', currentUser);

  // Initialize dummy data only when user is authenticated (not for guest users)
  useEffect(() => {
    if (isAuthenticated && currentUser?.id !== 'guest') {
      initializeDummyData();
    }
  }, [isAuthenticated, currentUser]);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email);
    // Initialize dummy data for regular users
    initializeDummyData();
    
    // Create user object and store it
    const user: User = {
      id: '1',
      name: email.split('@')[0], // Use email prefix as name for now
      email: email,
      avatarUrl: undefined,
      preferences: {
        theme: 'light',
        notifications: true,
        emailNotifications: true,
      },
    };
    console.log('Calling login with user:', user);
    login(user);
    console.log('Login called, isAuthenticated should be:', true);
    // Always go to role selection after login (mandatory)
    setAuthScreen('role-selection');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup attempt:', name, email);
    // Initialize dummy data for regular users
    initializeDummyData();
    
    // Create user object and store it
    const user: User = {
      id: '1',
      name: name,
      email: email,
      avatarUrl: undefined,
      preferences: {
        theme: 'light',
        notifications: true,
        emailNotifications: true,
      },
    };
    login(user);
    // Always go to role selection after signup (mandatory)
    setAuthScreen('role-selection');
  };

  const handleResetPassword = (email: string) => {
    console.log('Password reset for:', email);
    // Go to forgot password OTP screen
    setAuthScreen('forgot-password-otp');
  };

  const handleVerifyOTP = (otp: string) => {
    console.log('OTP verification:', otp);
    // Simulate successful OTP verification - go to role selection
    setAuthScreen('role-selection');
  };

  const handleVerifyForgotPasswordOTP = (otp: string) => {
    console.log('Forgot password OTP verification:', otp);
    // Simulate successful OTP verification - go back to login
    setAuthScreen('login');
    success('Password Reset Successful', 'Please login with your new password.');
  };

  const handleResendOTP = () => {
    console.log('Resending OTP...');
    info('OTP Resent', 'OTP has been resent to your email!');
  };

  const handleResendForgotPasswordOTP = () => {
    console.log('Resending forgot password OTP...');
    info('OTP Resent', 'OTP has been resent to your email!');
  };

  const handleRoleSelected = (role: string) => {
    console.log('Role selected:', role);
    // Update user with selected role
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      login(updatedUser);
    }
    setAuthScreen('main');
  };

  const handleSkipRoleSelection = () => {
    console.log('Role selection is mandatory - cannot skip');
    // Role selection is now mandatory, so this function does nothing
    // Users must select a role to proceed
  };

  // const handleLogout = () => {
  //   logout();
  //   setAuthScreen('login');
  // };

  // const handleCreateTask = () => {
  //   info('Create Task', 'This would open a create task modal.');
  // };

  // const handleCreateProject = () => {
  //   info('Create Project', 'This would open a create project modal.');
  // };

  const handleContinueAsGuest = () => {
    console.log('Continue as guest clicked');
    // Clear all existing data for guest users
    clearAllData();
    
    // Create a guest user object
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@superpage.com',
      role: 'Guest', // Set a default role for guest users
      avatarUrl: undefined,
      preferences: {
        theme: 'light',
        notifications: true,
        emailNotifications: false, // Guest users don't need email notifications
      },
    };
    console.log('Logging in guest user:', guestUser);
    login(guestUser);
    setAuthScreen('main');
  };

  const handleSocialLogin = (user: User) => {
    console.log('Social login success:', user);
    // Initialize dummy data for social login users
    initializeDummyData();
    
    // Use the user object from social login
    login(user);
    setAuthScreen('main');
  };


  // Show main app interface when user is authenticated AND has a role (but not guest users)
  if (isAuthenticated && currentUser?.role && currentUser?.id !== 'guest') {
    // Show main app interface
    return (
      <Router>
        <AppRouter 
          onNavigateToLogin={() => {
            console.log('AppRouter: onNavigateToLogin called, setting authScreen to login');
            setAuthScreen('login');
          }}
          onNavigateToSignup={() => setAuthScreen('signup')}
        />
      </Router>
    );
  }

  // Show main app interface for guest users (with empty data)
  if (isAuthenticated && currentUser?.id === 'guest') {
    // If guest user wants to login, show login screen
    if (authScreen === 'login') {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto pt-8">
            <button
              onClick={() => setAuthScreen('main')}
              className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
            >
              ← Back to App
            </button>
            <Login
              onLogin={handleLogin}
              onSwitchToSignup={() => setAuthScreen('signup')}
              onSwitchToForgotPassword={() => setAuthScreen('forgot-password')}
              onContinueAsGuest={handleContinueAsGuest}
              onSocialLogin={handleSocialLogin}
            />
          </div>
        </div>
      );
    }
    
    return (
      <Router>
        <AppRouter 
          onNavigateToLogin={() => {
            console.log('AppRouter (Guest): onNavigateToLogin called, setting authScreen to login');
            setAuthScreen('login');
          }}
          onNavigateToSignup={() => setAuthScreen('signup')}
        />
      </Router>
    );
  }

  // If user is authenticated but has no role, show role selection
  if (isAuthenticated && !currentUser?.role) {
    return (
      <RoleSelection
        onRoleSelected={handleRoleSelected}
        onSkip={handleSkipRoleSelection}
      />
    );
  }

  // Show auth screens when specifically navigating to auth routes
  switch (authScreen) {
    case 'login':
      return (
        <Login
          onSwitchToSignup={() => setAuthScreen('signup')}
          onSwitchToForgotPassword={() => setAuthScreen('forgot-password')}
          onLogin={handleLogin}
          onContinueAsGuest={handleContinueAsGuest}
          onSocialLogin={handleSocialLogin}
        />
      );
    case 'signup':
      return (
        <Signup
          onSwitchToLogin={() => setAuthScreen('login')}
          onSignup={handleSignup}
          onContinueAsGuest={handleContinueAsGuest}
        />
      );
        case 'forgot-password':
          return (
            <ForgotPassword
              onSwitchToLogin={() => setAuthScreen('login')}
              onResetPassword={handleResetPassword}
            />
          );
        case 'forgot-password-otp':
          return (
            <ForgotPasswordOTP
              onVerifyOTP={handleVerifyForgotPasswordOTP}
              onResendOTP={handleResendForgotPasswordOTP}
              onBackToLogin={() => setAuthScreen('login')}
            />
          );
        case 'email-otp':
          return (
            <EmailOTP
              onVerifyOTP={handleVerifyOTP}
              onResendOTP={handleResendOTP}
            />
          );
    case 'role-selection':
      return (
        <RoleSelection
          onRoleSelected={handleRoleSelected}
          onSkip={handleSkipRoleSelection}
        />
      );
    default:
      // Show login page by default when not authenticated
      return (
        <Login
          onSwitchToSignup={() => setAuthScreen('signup')}
          onSwitchToForgotPassword={() => setAuthScreen('forgot-password')}
          onLogin={handleLogin}
          onContinueAsGuest={handleContinueAsGuest}
          onSocialLogin={handleSocialLogin}
        />
      );
  }
}

// Main App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;