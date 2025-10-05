import React from 'react';

interface StackedBoardsIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const StackedBoardsIcon: React.FC<StackedBoardsIconProps> = ({ 
  className = '', 
  size = 'md',
  style = {}
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const currentSizeClass = sizeClasses[size];

  return (
    <svg
      className={`${currentSizeClass} ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottom circle (largest) */}
      <circle
        cx="12"
        cy="16"
        r="6"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Middle circle */}
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Top circle (smallest) */}
      <circle
        cx="12"
        cy="8"
        r="4"
        fill="currentColor"
      />
    </svg>
  );
};
