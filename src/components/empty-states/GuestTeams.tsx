/**
 * GuestTeams Component - Guest User Teams Page
 * 
 * This component displays a specialized teams page for guest users that showcases
 * the team management functionality without exposing any actual data. It provides
 * a clean, informative interface that encourages guest users to sign up or login
 * for full access to team collaboration features.
 * 
 * Features:
 * - Clean, minimal design without any actual team data
 * - Visual representation of team management functionality
 * - Clear messaging about guest limitations
 * - Call-to-action buttons for login and signup
 * - Responsive design with proper spacing
 * - Consistent styling with the application theme
 * 
 * Use Cases:
 * - Displayed when guest users access the teams page
 * - Encouraging guest users to create accounts
 * - Showcasing team functionality without exposing real data
 * 
 * @component
 * @example
 * <GuestTeams />
 */

import React from 'react';
import { 
  UserPlus,
  Shield,
  User,
  Users,
  Mail,
  Clock,
  Lock,
  LogIn,
  CheckCircle,
  UserCheck,
  Settings,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Avatar, AvatarFallback } from '../ui/Avatar';

/**
 * GuestTeams Component Implementation
 * 
 * Renders a guest-specific teams page that showcases the team management
 * functionality without displaying any actual data, encouraging account creation.
 */
export const GuestTeams: React.FC = () => {
  /**
   * Renders the guest teams page with visual placeholders and call-to-action
   * 
   * The layout includes:
   * - Header section with title and guest indicator
   * - Statistics cards showing zero values
   * - Visual team member placeholders
   * - Clear messaging about guest limitations
   * - Interactive elements to encourage account creation
   */
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            <div className="flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              <Lock className="w-4 h-4" />
              <span>Guest Mode</span>
            </div>
          </div>
          <p className="text-gray-600">Manage your team members and their roles - Login to access full features</p>
        </div>
        
        <div className="flex space-x-3">
          <button 
            className="px-6 py-3 bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors flex items-center space-x-2"
            disabled
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Guest Access Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest Access Limited</h3>
              <p className="text-gray-600 mb-4">
                You're viewing the teams page in guest mode. To create and manage your own teams, 
                invite members, and collaborate on projects, please sign up for a free account or login.
              </p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up Free</span>
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-2 flex items-center space-x-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards - All showing 0 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Developers</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
              <Shield className="w-6 h-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Designers</p>
                <p className="text-xl font-bold text-gray-900">0</p>
              </div>
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Structure Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">How Team Management Works</h2>
        <p className="text-gray-600">
          Team management helps you organize your team members, assign roles, and track their progress. 
          Here's what you'll be able to do once you create an account:
        </p>
        
        {/* Team Members Preview */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample team member cards with opacity to show they're placeholders */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-60">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gray-100 text-gray-400">JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-400">John Doe</h4>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-400 rounded">
                        Project Manager
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">john.doe@example.com</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Joined: Jan 15, 2024</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Status: Active
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-400">
                      0/0 tasks
                    </div>
                    <div className="text-xs text-gray-400">
                      0% completion
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-300" disabled>
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-300" disabled>
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-60">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gray-100 text-gray-400">JS</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-400">Jane Smith</h4>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-400 rounded">
                        Developer
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">jane.smith@example.com</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Joined: Jan 20, 2024</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Status: Active
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-400">
                      0/0 tasks
                    </div>
                    <div className="text-xs text-gray-400">
                      0% completion
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-300" disabled>
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-300" disabled>
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get with a free account:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Team Member Management</h4>
                <p className="text-sm text-gray-600">Add, edit, and manage team members</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Role Assignment</h4>
                <p className="text-sm text-gray-600">Assign roles and permissions to team members</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Task Assignment</h4>
                <p className="text-sm text-gray-600">Assign tasks and track completion rates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Team Analytics</h4>
                <p className="text-sm text-gray-600">Monitor team performance and productivity</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Communication Tools</h4>
                <p className="text-sm text-gray-600">Send messages and notifications to team members</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Invite System</h4>
                <p className="text-sm text-gray-600">Invite new members via email</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
