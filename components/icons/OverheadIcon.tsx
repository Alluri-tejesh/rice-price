
import React from 'react';

interface IconProps {
  className?: string;
}

const OverheadIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path d="M3.25 2.75A.75.75 0 002.5 3.5v13A.75.75 0 003.25 17h13.5A.75.75 0 0017.5 16.25V6h-5V3.25A.75.75 0 0011.75 2.5H3.25zM12.5 6v10.25H3.25A.75.75 0 002.5 17V3.5c0-.414.336-.75.75-.75h8.5V6z" />
    <path d="M13.5 2.75A.75.75 0 0012.75 2H12v3.25c0 .414.336.75.75.75h3.25V5.25A.75.75 0 0015.25 4.5h-.162l-1.588-1.587z" />
  </svg>
);

export default OverheadIcon;
