/**
 * Button Component - Reusable UI Button with Multiple Variants
 * 
 * A highly customizable button component that provides consistent styling and behavior
 * across the application. The component supports multiple variants, sizes, and maintains
 * full accessibility compliance with proper focus states and keyboard navigation.
 * 
 * Features:
 * - Multiple visual variants (primary, secondary, outline, ghost, destructive)
 * - Three size options (small, medium, large)
 * - Full accessibility support with focus rings and keyboard navigation
 * - Disabled state handling with proper visual feedback
 * - Extends native button HTML attributes for maximum flexibility
 * - Consistent hover and active states across all variants
 * - TypeScript support with proper prop typing
 * 
 * Variants:
 * - primary: Main action button with brand colors
 * - secondary: Secondary actions with neutral styling
 * - outline: Outlined button for subtle actions
 * - ghost: Minimal styling for text-like buttons
 * - destructive: Red styling for dangerous actions
 * 
 * @component
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Props interface for the Button component
 * 
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @property {'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'} [variant='primary'] - Visual style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {React.ReactNode} children - Button content
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Button Component Implementation
 * 
 * Renders a customizable button with consistent styling, accessibility features,
 * and support for multiple variants and sizes.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  // Base classes that apply to all button variants
  // Includes accessibility features like focus rings and disabled states
  const baseClasses = 'inline-flex items-center justify-center rounded-button font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant-specific styling configurations
  // Each variant provides distinct visual appearance and interaction states
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-600 active:bg-primary-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  // Size-specific styling configurations
  // Provides consistent sizing across different button use cases
  const sizes = {
    sm: 'h-8 px-3 text-sm',    // Small buttons for compact layouts
    md: 'h-10 px-4 py-2',      // Medium buttons for standard use
    lg: 'h-12 px-6 text-lg',   // Large buttons for prominent actions
  };

  /**
   * Renders the button element with combined styling
   * 
   * Uses the cn utility to merge base classes, variant styles, size styles,
   * and any additional className props. Spreads all other props to the button element.
   */
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};