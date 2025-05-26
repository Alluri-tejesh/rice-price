
import React from 'react';

interface IconProps {
  className?: string;
}

const MillingIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 01.76.02l3.5 2.25a.75.75 0 010 1.32l-3.5 2.25a.75.75 0 01-.99-.29L9.17 5.41a.75.75 0 01.28-1.01l2.04-1.23zM8.51 3.17a.75.75 0 00-.76.02l-3.5 2.25a.75.75 0 000 1.32l3.5 2.25a.75.75 0 00.99-.29L10.83 5.41a.75.75 0 00-.28-1.01L8.51 3.17zM11.49 9.17a.75.75 0 01.76.02l3.5 2.25a.75.75 0 010 1.32l-3.5 2.25a.75.75 0 01-.99-.29L9.17 11.41a.75.75 0 01.28-1.01l2.04-1.23zM8.51 9.17a.75.75 0 00-.76.02l-3.5 2.25a.75.75 0 000 1.32l3.5 2.25a.75.75 0 00.99-.29L10.83 11.41a.75.75 0 00-.28-1.01L8.51 9.17z" clipRule="evenodd" />
  </svg>
);

export default MillingIcon;
