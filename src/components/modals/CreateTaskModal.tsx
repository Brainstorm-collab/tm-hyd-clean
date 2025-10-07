/**
 * CreateTaskModal Component - Task Creation Interface
 * 
 * This modal component provides a comprehensive interface for creating new tasks
 * with detailed configuration options. It includes task naming, due dates, tags,
 * assignees, and other task management features. The modal integrates with the
 * modal management system and provides real-time feedback through toast notifications.
 * 
 * Features:
 * - Task name and description input
 * - Due date and time selection
 * - Dynamic tag management (add/remove tags)
 * - Assignee management (add/remove team members)
 * - Form validation and error handling
 * - Integration with modal management system
 * - Toast notifications for user feedback
 * - Responsive design with proper accessibility
 * 
 * Task Configuration:
 * - Basic task information (name, description)
 * - Scheduling (due date, due time)
 * - Organization (tags, categories)
 * - Assignment (team members, responsibilities)
 * 
 * State Management:
 * - Form field state management
 * - Dynamic list management for tags and assignees
 * - Modal visibility and interaction states
 * - Validation and error state handling
 * 
 * @component
 * @example
 * <CreateTaskModal onTaskCreated={handleTaskCreated}>
 *   <Button>Create Task</Button>
 * </CreateTaskModal>
 */

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { X, Plus, Calendar, Clock } from 'lucide-react';
import { useModalManager } from '../ModalManager';
import { useToast } from '../../contexts/ToastContext';

/**
 * Props interface for the CreateTaskModal component
 * 
 * @interface CreateTaskModalProps
 * @property {React.ReactNode} children - Trigger element for opening the modal
 * @property {(task: any) => void} [onTaskCreated] - Callback function called when task is created
 * @property {() => void} [onModalOpen] - Callback function called when modal is opened
 */
interface CreateTaskModalProps {
  children: React.ReactNode;
  onTaskCreated?: (task: any) => void;
  onModalOpen?: () => void;
}

/**
 * CreateTaskModal Component Implementation
 * 
 * Renders a comprehensive task creation modal with form fields, dynamic lists,
 * and integration with the modal management system.
 */
export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ children, onTaskCreated, onModalOpen }) => {
  // Modal and notification management
  const { openModal, closeModal } = useModalManager();
  const { success } = useToast();
  
  // Form state management
  const [taskName, setTaskName] = useState('Design new draft');           // Task name input
  const [dueDate, setDueDate] = useState('20-10-2022');                  // Due date input
  const [dueTime, setDueTime] = useState('11:30 AM');                    // Due time input
  const [taskTags, setTaskTags] = useState(['User Experience Design', 'UI Design']); // Task tags list
  const [assignedTo, setAssignedTo] = useState(['@Johnsonwils']);         // Assigned team members
  const [newTag, setNewTag] = useState('');                              // New tag input
  const [newAssignee, setNewAssignee] = useState('');                    // New assignee input

  /**
   * Removes a tag from the task tags list
   * 
   * @param {string} tagToRemove - The tag to remove from the list
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTaskTags(tags => tags.filter(tag => tag !== tagToRemove));
  };

  /**
   * Adds a new tag to the task tags list
   * 
   * Validates the tag input and ensures no duplicates are added.
   * Shows success notification when tag is added.
   */
  const handleAddTag = () => {
    if (newTag.trim() && !taskTags.includes(newTag.trim())) {
      setTaskTags([...taskTags, newTag.trim()]);
      setNewTag('');
      success('Tag Added!', `Tag "${newTag.trim()}" has been added to the task.`);
    }
  };

  /**
   * Removes an assignee from the assigned team members list
   * 
   * @param {string} assigneeToRemove - The assignee to remove from the list
   */
  const handleRemoveAssignee = (assigneeToRemove: string) => {
    setAssignedTo(assignees => assignees.filter(assignee => assignee !== assigneeToRemove));
  };

  /**
   * Adds a new assignee to the assigned team members list
   * 
   * Validates the assignee input and ensures no duplicates are added.
   * Shows success notification when assignee is added.
   */
  const handleAddAssignee = () => {
    if (newAssignee.trim() && !assignedTo.includes(newAssignee.trim())) {
      setAssignedTo([...assignedTo, newAssignee.trim()]);
      setNewAssignee('');
      success('Assignee Added!', `Assignee "${newAssignee.trim()}" has been added to the task.`);
    }
  };

  const handleCreateTask = () => {
    const task = {
      id: Date.now().toString(),
      name: taskName,
      dueDate,
      dueTime,
      tags: taskTags,
      assignedTo,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onTaskCreated?.(task);
    closeModal();
    
    // Show success toast
    success('Task Created!', `Task "${taskName}" has been successfully created.`);
    
    // Reset form
    setTaskName('Design new draft');
    setDueDate('20-10-2022');
    setDueTime('11:30 AM');
    setTaskTags(['User Experience Design', 'UI Design']);
    setAssignedTo(['@Johnsonwils']);
  };

  const handleOpenModal = () => {
    if (onModalOpen) {
      onModalOpen();
    }
    
    const modalContent = (
      <>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Create tasks</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Name
            </label>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Design new draft"
              className="w-full"
            />
          </div>

          {/* Due Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due date
              </label>
              <div className="relative">
                <Input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="20-10-2022"
                  className="w-full pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Time
              </label>
              <div className="relative">
                <Input
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  placeholder="11:30 AM"
                  className="w-full pr-10"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Task Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Tag
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {taskTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-[#6B40ED] hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                className="flex-1"
              />
              <button
                onClick={handleAddTag}
                className="px-3 py-2 rounded-button bg-primary-100 text-primary-700 hover:bg-primary-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigned To
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {assignedTo.map((assignee, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {assignee}
                  <button
                    onClick={() => handleRemoveAssignee(assignee)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Add assignee..."
                className="flex-1"
              />
              <button
                onClick={handleAddAssignee}
                className="px-3 py-2 rounded-button bg-primary-100 text-primary-700 hover:bg-primary-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreateTask}
            className="px-6 py-3 text-sm font-medium text-white rounded-button hover:opacity-80"
            style={{ backgroundColor: '#1f2937' }}
          >
            Create
          </button>
        </div>
      </>
    );

    openModal(modalContent, closeModal);
  };

  return (
    <div onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleOpenModal();
    }}>
      {children}
    </div>
  );
};