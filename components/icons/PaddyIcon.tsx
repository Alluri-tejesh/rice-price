
import React from 'react';

interface IconProps {
  className?: string;
}

const PaddyIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h13.5A2.25 2.25 0 0019 13.75v-7.5A2.25 2.25 0 0016.75 4H3.25zM2.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v1.25H2.5V6.25zM2.5 13.75V9h15v4.75c0 .966-.784 1.75-1.75 1.75H4.25c-.966 0-1.75-.784-1.75-1.75z" />
    <path d="M10 10.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM7 10.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM13 10.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5z" />
  </svg>
);

export default PaddyIcon;
