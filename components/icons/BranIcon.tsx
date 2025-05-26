import React from 'react';

interface IconProps {
  className?: string;
}

const BranIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M6.5 8a.5.5 0 000 1h1a.5.5 0 000-1h-1zM4 10.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm2.5-.5a.5.5 0 000 1h1a.5.5 0 000-1h-1zM9 8.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm2.5.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM6.5 11a.5.5 0 000 1h1a.5.5 0 000-1h-1zM9 11.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm2.5-.5a.5.5 0 000 1h1a.5.5 0 000-1h-1zM4.5 13a.5.5 0 000 1h1a.5.5 0 000-1h-1zm2.5.5a.5.5 0 01.5-.5h1a.5.5 0 010 1h-1a.5.5 0 01-.5-.5zm4.5-.5a.5.5 0 000 1h1a.5.5 0 000-1h-1zM10 5.5A4.5 4.5 0 005.5 10H4a2 2 0 00-2 2v1a2 2 0 002 2h12a2 2 0 002-2v-1a2 2 0 00-2-2h-1.5A4.5 4.5 0 0010 5.5zm0 1A3.5 3.5 0 0113.5 10H15v3H5v-3h1.5A3.5 3.5 0 0110 6.5z" clipRule="evenodd" />
  </svg>
);

export default BranIcon;
