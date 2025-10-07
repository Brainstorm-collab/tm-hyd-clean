/**
 * EmptyTasks Component - Empty State for Task Lists
 * 
 * This component displays an empty state when no tasks have been created yet.
 * It provides a clean, encouraging interface that guides users to create their
 * first task. The component includes a task icon, motivational messaging,
 * and a clear call-to-action button.
 * 
 * Features:
 * - Clean visual design with task icon
 * - Encouraging messaging to motivate task creation
 * - Interactive create button with icon
 * - Responsive layout with proper spacing
 * - Consistent styling with application theme
 * 
 * Use Cases:
 * - Displayed when user has no tasks in their list
 * - Onboarding new users to task management
 * - Encouraging productivity and task organization
 * 
 * @component
 * @example
 * <EmptyTasks onCreateTask={() => setShowCreateModal(true)} />
 */

import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Props interface for the EmptyTasks component
 * 
 * @interface EmptyTasksProps
 * @property {() => void} onCreateTask - Callback function triggered when create task button is clicked
 */
interface EmptyTasksProps {
  onCreateTask: () => void;
}

/**
 * EmptyTasks Component Implementation
 * 
 * Renders an empty state interface for task lists, providing visual guidance
 * and encouraging users to create their first task.
 */
export const EmptyTasks: React.FC<EmptyTasksProps> = ({ onCreateTask }) => {
  /**
   * Renders the empty tasks state with icon, messaging, and create button
   * 
   * The layout includes:
   * - Centered task icon in a circular background
   * - Clear heading about the empty state
   * - Motivational description text
   * - Interactive create button with plus icon
   */
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Task Icon in Circular Background */}
      <div className="w-24 h-24 bg-gray-100  flex items-center justify-center mb-6">
        <CheckSquare className="w-12 h-12 text-gray-400" />
      </div>
      
      {/* Empty State Heading */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No tasks yet
      </h3>
      
      {/* Motivational Description */}
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Get started by creating your first task. Organize your work and stay on top of your projects.
      </p>
      
      {/* Create Task Button with Icon */}
      <Button onClick={onCreateTask} className="flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Create New Task</span>
      </Button>
    </div>
  );
};
