
import React from 'react';

interface IconProps {
  className?: string;
}

const YieldIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path fillRule="evenodd" d="M8.5 2a1.5 1.5 0 00-1.45.993l-2.5 6.5A1.5 1.5 0 006 12h8a1.5 1.5 0 001.45-2.507l-2.5-6.5A1.5 1.5 0 0011.5 2h-3zm0 1.5h3l1.625 4.225L15.05 9H4.95l1.925-1.275L8.5 3.5z" clipRule="evenodd" />
    <path d="M4 11a1 1 0 011 1v3h10v-3a1 1 0 112 0v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1z" />
     <text x="9.5" y="14" fontSize="5" textAnchor="middle" fill="currentColor">%</text>
  </svg>
);

export default YieldIcon;
