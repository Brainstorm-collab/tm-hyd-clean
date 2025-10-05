import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { getInitials } from '../ui/Avatar';
import { getUser } from '../../utils/localStorage';
import { Logo } from '../ui/Logo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'teams', label: 'Teams', icon: Users, path: '/teams' },
  { id: 'boards', label: 'Boards', icon: FolderOpen, path: '/boards' },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare, path: '/inbox' },
  { id: 'timeline', label: 'Timeline', icon: Calendar, path: '/timeline' },
  { id: 'more', label: 'More Options', icon: MoreHorizontal, path: '/more' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  activeItem,
  onItemClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(getUser());

  // Update user data when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentUser = getUser();
      if (currentUser && currentUser !== user) {
        setUser(currentUser);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const handleItemClick = (item: { id: string; path: string }) => {
    onItemClick(item.id);
    navigate(item.path);
  };

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <span className="font-semibold text-lg text-gray-900">Superpage</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-button hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id || location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 text-left transition-colors rounded-button',
                isActive
                  ? 'border-r-2'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              style={isActive ? { 
                backgroundColor: '#e3d8ff', 
                color: '#6B40ED',
                borderRightColor: '#6B40ED'
              } : {}}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          'flex items-center space-x-3',
          isCollapsed && 'justify-center'
        )}>
          <Avatar className="w-8 h-8">
            {user?.avatarUrl ? (
              <AvatarImage 
                src={user.avatarUrl} 
                alt={user.name || 'User'} 
                className="w-8 h-8 object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary-100 text-primary-700 text-sm">
              {user ? getInitials(user.name) : 'AU'}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
