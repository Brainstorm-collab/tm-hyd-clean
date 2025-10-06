import React from 'react';

interface FacebookIconProps {
  size?: number;
  className?: string;
}

export const FacebookIcon: React.FC<FacebookIconProps> = ({ 
  size = 16, 
  className = "" 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#1877F2"/>
      <path
        d="M16.671 15.469L17.203 12H13.875V9.75C13.875 8.8 14.25 7.969 15.516 7.969H17.344V4.922C17.344 4.922 16.172 4.688 15.047 4.688C12.719 4.688 11.156 6.141 11.156 9.375V12H8.078V15.469H11.156V23.859C11.719 23.953 12.297 24 12.891 24C13.484 24 14.063 23.953 14.625 23.859V15.469H16.671Z"
        fill="white"
      />
    </svg>
  );
};
