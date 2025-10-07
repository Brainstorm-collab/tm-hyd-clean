
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Plus, User, ChevronDown, ChevronLeft, Check, UserPlus, FileText, AtSign, HelpCircle, Users, LogOut, Calendar, Grid3X3, Settings, ArrowRight, Crown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { getInitials } from '../ui/Avatar';
import { getUser } from '../../utils/localStorage';
import { getUserInitials, getUserDisplayName, getUserAvatarUrl } from '../../utils/userDisplay';
import { User as UserType } from '../../types';
import { CreateTaskModal } from '../modals/CreateTaskModal';
import { CreateTeamModal } from '../modals/CreateTeamModal';
import { CreateBoardModal } from '../modals/CreateBoardModal';
import { CreateTimelineModal } from '../modals/CreateTimelineModal';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCreateNew: () => void;
  onLogout: () => void;
  currentUser: UserType | null;
  isAuthenticated: boolean;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onCreateNew, onLogout, currentUser, isAuthenticated, onNavigateToLogin, onNavigateToSignup }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(currentUser || getUser());
  const { isGuest } = useAuth();
  const { warning } = useToast();
  const { notifications, markAsRead, markAllAsRead, getUnreadCount } = useNotifications();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);
  const debouncedQuery = useDebouncedValue(searchQuery, 500);

  // Update user when currentUser prop changes
  useEffect(() => {
    const newUser = currentUser || getUser();
    console.log('Header: User updated:');
    console.log('  userId:', newUser?.id);
    console.log('  userName:', newUser?.name);
    console.log('  avatarUrl:', newUser?.avatarUrl);
    console.log('  provider:', newUser?.provider);
    console.log('  hasAvatar:', !!newUser?.avatarUrl);
    setUser(newUser);
  }, [currentUser]);

  // Update search query when on search results page
  useEffect(() => {
    if (location.pathname === '/search') {
      const urlParams = new URLSearchParams(location.search);
      const query = urlParams.get('q') || '';
      setSearchQuery(query);
    } else {
      // Clear search query when not on search page
      setSearchQuery('');
    }
  }, [location.pathname, location.search]);

  // Get unread count from notification context
  const unreadCount = getUnreadCount();

  // Handle notification click
  const handleNotificationClick = (notificationId: string) => {
    console.log('Notification clicked:', notificationId);
    markAsRead(notificationId);
    setShowNotifications(false);
  };

  const getPageTitle = () => {
    if (location.pathname.startsWith('/profile/')) {
      return 'User info';
    }
    switch (location.pathname) {
      case '/home':
        return 'Tasks Home';
      case '/dashboard':
        return 'Dashboard';
      case '/teams':
        return 'Teams';
      case '/boards':
        return 'Boards';
      case '/inbox':
        return 'Inbox';
      case '/timeline':
        return 'Timeline';
      case '/more':
        return 'More Options';
      case '/settings':
        return 'Settings';
      case '/profile':
        return 'User info';
      case '/tasks':
        return 'Tasks';
      case '/projects':
        return 'Projects';
      case '/team':
        return 'Team';
      case '/calendar':
        return 'Calendar';
      case '/kanban':
        return 'Kanban Board';
      case '/notifications':
        return 'Notifications';
      case '/search':
        return 'Search Results';
      case '/help-support':
        return 'Help & Support';
      default:
        return 'Superpage';
    }
  };

  const showBackButton = () => {
    // Show back button for all pages except home page
    const pathname = location.pathname;
    return pathname !== '/home' && pathname !== '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Navigate when debounced query changes, only if it matches latest input
  // Reset navigation flag after location changes
  useEffect(() => {
    const timer = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Only auto-navigate to search if user is currently typing (not navigating away)
  useEffect(() => {
    if (isNavigatingRef.current) return; // Prevent navigation during programmatic navigation

    const normalized = debouncedQuery.trim();
    if (normalized && debouncedQuery === searchQuery && location.pathname !== '/search') {
      // Only navigate to search if we're not already on search page
      isNavigatingRef.current = true;
      navigate(`/search?q=${encodeURIComponent(normalized)}`);
    } else if (!normalized && location.pathname === '/search') {
      // Keep user on search route with empty query only if they're already there
      isNavigatingRef.current = true;
      navigate('/search');
    }
  }, [debouncedQuery, searchQuery, navigate, location.pathname]);

  // Removed auto-leave behavior to keep user on the same page when query clears

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setShowAddMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-16 flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* Page Title */}
        <div className="flex items-center space-x-4 min-w-0 flex-shrink-0">
          <button
            onClick={() => {
              // Navigate back to previous page
              isNavigatingRef.current = true;
              navigate(-1);
              setTimeout(() => { isNavigatingRef.current = false; }, 100);
            }}
            className={`flex items-center space-x-2 transition-colors w-8 h-8 flex-shrink-0 ${
              showBackButton() 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-transparent pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">{getPageTitle()}</h1>
        </div>




        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="input-search"
            />
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center space-x-2 flex-shrink-0" style={{ gap: '12px' }}>
          {/* Pro Subscription Button */}
          <button 
            onClick={() => {
              if (isGuest) {
                // Use proper auth navigation instead of route navigation
                onNavigateToLogin?.();
              } else {
                navigate('/premium');
              }
            }}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-sm"
            style={{ marginRight: 6 }}
          >
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium leading-none">Pro</span>
          </button>

          {/* Create New Button with Dropdown */}
          <div className="relative" ref={addMenuRef}>
            <button 
              onClick={() => setShowAddMenu(!showAddMenu)} 
              className="w-10 h-10 rounded-button transition-colors flex items-center justify-center bg-primary-100 text-primary-700 hover:bg-primary-200"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Add Menu Dropdown */}
            {showAddMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-card shadow-lg border border-gray-300 py-2 z-50">
                <CreateTaskModal onModalOpen={() => setShowAddMenu(false)}>
                  <button className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-primary-700">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Create Task</p>
                      <p className="text-xs text-gray-500">Create your tasks now</p>
                    </div>
                  </button>
                </CreateTaskModal>
                <CreateTeamModal onModalOpen={() => setShowAddMenu(false)}>
                  <button className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-primary-700">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Create Team</p>
                      <p className="text-xs text-gray-500">Create your team now</p>
                    </div>
                  </button>
                </CreateTeamModal>
                <CreateBoardModal onModalOpen={() => setShowAddMenu(false)}>
                  <button className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-primary-700">
                      <Grid3X3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Create Board</p>
                      <p className="text-xs text-gray-500">Create your board now</p>
                    </div>
                  </button>
                </CreateBoardModal>
                <CreateTimelineModal onModalOpen={() => setShowAddMenu(false)}>
                  <button className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-primary-700">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Create Timeline</p>
                      <p className="text-xs text-gray-500">Create your timeline now</p>
                    </div>
                  </button>
                </CreateTimelineModal>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 "></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-card shadow-lg border border-gray-300 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className="flex items-start space-x-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <IconComponent className="w-4 h-4 text-primary-700" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p 
                                className="text-sm text-gray-900"
                                dangerouslySetInnerHTML={{ __html: notification.message }}
                              />
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.isRead && (
                              <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg font-medium">No notifications</p>
                      <p className="text-gray-400 text-sm mt-1">You'll get notifications soon</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        markAllAsRead();
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-sm text-primary-700 hover:text-primary-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu or Login Button */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1  hover:bg-gray-100 transition-colors"
              >
                <Avatar className="w-8 h-8">
                  {getUserAvatarUrl(user) ? (
                    <AvatarImage 
                      src={getUserAvatarUrl(user)} 
                      alt={getUserDisplayName(user)} 
                      className="w-8 h-8 object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-primary-100 text-primary-700 text-sm">
                    {getUserInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-card shadow-lg border border-gray-300 py-1 z-50">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-avatar flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-primary-700" />
                  </div>
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-avatar flex items-center justify-center mr-3">
                    <Settings className="w-4 h-4 text-primary-700" />
                  </div>
                  Settings
                </button>
                <button
                  onClick={() => {
                    navigate('/help-support');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-avatar flex items-center justify-center mr-3">
                    <HelpCircle className="w-4 h-4 text-primary-700" />
                  </div>
                  Help and Support
                </button>
                <button
                  onClick={() => {
                    navigate('/contacts');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-avatar flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-primary-700" />
                  </div>
                  Invite Friends
                </button>
                <button
                  onClick={() => {
                    if (user?.id === 'guest') {
                      setShowUserMenu(false);
                      if (onNavigateToLogin) {
                        onNavigateToLogin();
                      } else {
                        navigate('/login');
                      }
                    } else {
                      onLogout();
                    }
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className={`w-8 h-8 rounded-avatar flex items-center justify-center mr-3 ${
                    user?.id === 'guest' ? 'bg-primary-100' : 'bg-red-100'
                  }`}>
                    {user?.id === 'guest' ? (
                      <User className="w-4 h-4 text-primary-700" />
                    ) : (
                      <LogOut className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  {user?.id === 'guest' ? 'Login' : 'Logout'}
                </button>
              </div>
            )}
          </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={onNavigateToLogin}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-button hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={onNavigateToSignup}
                className="px-4 py-2 rounded-button bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
