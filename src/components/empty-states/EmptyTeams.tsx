/**
 * EmptyTeams Component - Empty State for Team Management
 * 
 * This component displays an empty state when no teams have been created yet.
 * It provides a visual representation of what team cards look like and guides
 * users to create their first team. The component includes team placeholder
 * cards with avatars and clear call-to-action messaging.
 * 
 * Features:
 * - Visual team card placeholders with avatars
 * - Different card states (inactive, active, completed)
 * - Clear messaging about the empty state
 * - Call-to-action button for creating new teams
 * - Responsive design with proper spacing
 * - Consistent styling with the application theme
 * 
 * Use Cases:
 * - Displayed when user has no teams created
 * - Onboarding new users to team collaboration
 * - Encouraging team creation and collaboration
 * 
 * @component
 * @example
 * <EmptyTeams />
 */

import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback } from '../ui/Avatar';

/**
 * EmptyTeams Component Implementation
 * 
 * Renders an empty state interface for team management,
 * providing visual guidance and encouraging team creation.
 */
export const EmptyTeams: React.FC = () => {
  /**
   * Renders the empty teams state with visual team cards and call-to-action
   * 
   * The layout includes:
   * - Header section with title and create button
   * - Visual team card placeholders showing different states
   * - Clear messaging about the empty state
   * - Interactive elements to encourage team creation
   */
  return (
    <div className="p-6">
      {/* Header Section with Title and Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Teams</h1>
          <p className="text-gray-600">32 Total teams are added</p>
        </div>
        <Button className="bg-purple-600 text-white px-4 py-2  hover:bg-purple-700 transition-colors">
          + Team
        </Button>
      </div>

      {/* Empty State Card */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            {/* Team Placeholder Cards */}
            {/* Shows visual representation of what team cards look like */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              {/* Inactive Team Card */}
              <div className="w-24 h-32 bg-gray-100  border-2 border-gray-200 flex flex-col items-center justify-center p-4">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarFallback className="bg-gray-300 text-gray-600">F</AvatarFallback>
                </Avatar>
                <div className="w-full h-2 bg-gray-300 mb-2"></div>
              </div>
              
              {/* Active Team Card with Checkmark */}
              <div className="w-24 h-32 bg-white  border-2 border-purple-600 flex flex-col items-center justify-center p-4 relative">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarFallback className="bg-gray-300 text-gray-600">F</AvatarFallback>
                </Avatar>
                <div className="w-full h-2 bg-gray-300 mb-2"></div>
                {/* Checkmark indicating completed/active state */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-purple-600  flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Another Inactive Team Card */}
              <div className="w-24 h-32 bg-gray-100  border-2 border-gray-200 flex flex-col items-center justify-center p-4">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarFallback className="bg-gray-300 text-gray-600">M</AvatarFallback>
                </Avatar>
                <div className="w-full h-2 bg-gray-300 mb-2"></div>
              </div>
            </div>

            {/* Empty State Message */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No teams has created</h3>
            <p className="text-gray-600 mb-4">
              Click to add <span className="text-purple-600 underline cursor-pointer">New team</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
