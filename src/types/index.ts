/**
 * TypeScript Type Definitions for Task Management Application
 * 
 * This file contains all the TypeScript interfaces and type definitions used
 * throughout the application. It provides type safety and better developer
 * experience by defining the structure of data objects, API responses, and
 * component props.
 * 
 * Key Categories:
 * - Core entities (Task, Project, Team, User)
 * - Authentication and user management
 * - Subscription and billing
 * - Communication and messaging
 * - UI state and preferences
 * - Utility types and enums
 * 
 * @fileoverview Comprehensive type definitions for the task management application
 */

/**
 * Task interface representing a single task in the system
 * 
 * @interface Task
 * @property {string} id - Unique identifier for the task
 * @property {string} title - Task title/name
 * @property {string} description - Detailed task description
 * @property {string} dueDate - Due date in ISO format
 * @property {'To Do' | 'In Progress' | 'Done'} status - Current task status
 * @property {'Low' | 'Medium' | 'High'} priority - Task priority level
 * @property {string[]} assignees - Array of team member IDs assigned to task
 * @property {string} [projectId] - Optional project ID for task grouping
 * @property {string} createdAt - Creation timestamp in ISO format
 * @property {string} updatedAt - Last update timestamp in ISO format
 * @property {string[]} [tags] - Optional array of task tags
 * @property {Comment[]} [comments] - Optional array of task comments
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignees: string[]; // array of team member IDs
  projectId?: string; // optional, for filtering by project
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string for recent feed
  tags?: string[];
  comments?: Comment[];
}

/**
 * Comment interface for task comments and discussions
 * 
 * @interface Comment
 * @property {string} id - Unique identifier for the comment
 * @property {string} taskId - ID of the task this comment belongs to
 * @property {string} authorId - ID of the user who wrote the comment
 * @property {string} content - The comment text content
 * @property {string} createdAt - Creation timestamp in ISO format
 */
export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

/**
 * Project interface representing a project in the system
 * 
 * @interface Project
 * @property {string} id - Unique identifier for the project
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string} startDate - Project start date in ISO format
 * @property {string} endDate - Project end date in ISO format
 * @property {string} teamId - ID of the team assigned to this project
 * @property {string[]} taskIds - Array of task IDs under this project
 * @property {'Planning' | 'In Progress' | 'Completed' | 'On Hold'} status - Current project status
 * @property {string} createdAt - Creation timestamp in ISO format
 * @property {string} updatedAt - Last update timestamp in ISO format
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  teamId: string; // which team is assigned
  taskIds: string[]; // tasks under this project
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  createdAt: string;
  updatedAt: string;
}

/**
 * TeamMember interface representing a member of a team
 * 
 * @interface TeamMember
 * @property {string} id - Unique identifier for the team member
 * @property {string} name - Member's full name
 * @property {string} email - Member's email address
 * @property {string} role - Member's role in the team
 * @property {string} [avatarUrl] - Optional URL to member's avatar image
 * @property {boolean} isActive - Whether the member is currently active
 * @property {string} joinedAt - Date when member joined the team in ISO format
 */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string; // or use initials if not provided
  isActive: boolean;
  joinedAt: string;
}

/**
 * Team interface representing a team in the system
 * 
 * @interface Team
 * @property {string} id - Unique identifier for the team
 * @property {string} name - Team name
 * @property {string} description - Team description
 * @property {string[]} memberIds - Array of team member IDs
 * @property {string} createdAt - Creation timestamp in ISO format
 * @property {string} updatedAt - Last update timestamp in ISO format
 */
export interface Team {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  provider?: string; // 'Google', 'Facebook', 'email', etc.
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    emailNotifications: boolean;
  };
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'starter' | 'premium' | 'guest';
  billingCycle: 'monthly' | 'yearly' | 'none';
  status: 'active' | 'cancelled' | 'expired' | 'trial' | 'guest';
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  amount: number;
  userCount: number;
  paymentMethod?: PaymentMethod;
  autoRenew: boolean;
  trialEndDate?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'netbanking' | 'upi';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  upiId?: string;
  bankName?: string;
}

export interface BillingHistory {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'failed' | 'pending' | 'refunded';
  paymentMethod: string;
  billingDate: string;
  description: string;
  invoiceUrl?: string;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_completed' | 'project_created' | 'member_added';
  userId: string;
  targetId: string; // task or project ID
  description: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface InboxMessage {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  unreadCount: number;
  type: 'direct' | 'team' | 'notification';
}

export interface ConversationMessage {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOutgoing: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  name: string;
  size: string;
  type: 'doc' | 'pdf' | 'image' | 'other';
}

export interface Conversation {
  id: string;
  sender: string;
  senderAvatar: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  unreadCount: number;
  messages: ConversationMessage[];
}

export type ViewMode = 'list' | 'kanban' | 'calendar';
export type Theme = 'light' | 'dark';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'On Hold';

