/**
 * EmptyBoards Component - Empty State for Task Boards
 * 
 * This component displays an empty state when no task boards have been created yet.
 * It provides a visual representation of what boards look like and guides users
 * to create their first board. The component includes an illustrative design
 * showing board placeholders and clear call-to-action messaging.
 * 
 * Features:
 * - Visual board placeholders with checkmark icons
 * - Clear messaging about the empty state
 * - Call-to-action button for creating new boards
 * - Responsive design with proper spacing
 * - Consistent styling with the application theme
 * 
 * Use Cases:
 * - Displayed when user has no boards created
 * - Onboarding new users to the board functionality
 * - Encouraging board creation and task management
 * 
 * @component
 * @example
 * <EmptyBoards />
 */

import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * EmptyBoards Component Implementation
 * 
 * Renders an empty state interface for the task boards section,
 * providing visual guidance and encouraging user engagement.
 */
export const EmptyBoards: React.FC = () => {
  /**
   * Renders the empty boards state with visual placeholders and call-to-action
   * 
   * The layout includes:
   * - Header section with title and create button
   * - Visual board placeholders with checkmark icons
   * - Clear messaging about the empty state
   * - Interactive elements to encourage board creation
   */
  return (
    <div className="p-6">
      {/* Header Section with Title and Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks Board</h1>
          <p className="text-gray-600">Create and complete tasks using boards</p>
        </div>
        <Button className="bg-purple-600 text-white px-4 py-2  hover:bg-purple-700 transition-colors">
          Create Board
        </Button>
      </div>

      {/* Empty State Card */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            {/* Board Placeholder Illustration */}
            {/* Shows visual representation of what boards look like */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              {/* First Board Placeholder with Arrow */}
              <div className="w-32 h-20 bg-gray-100  border-2 border-gray-200 flex items-center justify-center relative">
                <div className="w-8 h-8 bg-purple-600  flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Arrow indicating progression to next board */}
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeDasharray="5,5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              {/* Second Board Placeholder */}
              <div className="w-32 h-20 bg-gray-100  border-2 border-gray-200 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-600  flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Empty State Message */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No boards has created</h3>
            <p className="text-gray-600">
              Create board using <span className="text-purple-600 underline cursor-pointer">+Create Board</span> button
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
