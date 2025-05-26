import React from 'react';

interface IconProps {
  className?: string;
}

const HuskIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.682.433l3.75 7.5a.75.75 0 010 .634l-3.75 7.5A.75.75 0 0110 18a.75.75 0 01-.682-.433l-3.75-7.5a.75.75 0 010-.634l3.75-7.5A.75.75 0 0110 2zM8.67 9.558L10 6.882l1.33 2.676-.937 1.875a.75.75 0 01-1.018.206L8.67 9.558zm0 2.758l.705-1.41 1.25.625.705 1.41L10 13.118l-1.33-2.676.001.002zM6.25 10a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" />
  </svg>
);

export default HuskIcon;
