import React from 'react';

interface IconProps {
  className?: string;
}

const BrokenRiceIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
    aria-hidden="true"
  >
    <path d="M13.063 3.218a2.75 2.75 0 00-3.889 0L6.937 5.456l-2.08-.832a.75.75 0 00-.82.17L2.22 6.61a.75.75 0 00.17.82l5.25 5.25a.75.75 0 00.82.17l1.816-1.816.001.002 2.121-2.121a2.75 2.75 0 000-3.889L13.063 3.218zm-1.33 1.33a1.25 1.25 0 011.768 0l1.316 1.316a1.25 1.25 0 010 1.768L12.696 9.754l-.707-.707 2.404-2.404-1.316-1.316-2.404 2.404-.707-.707 2.121-2.121zM8.409 6.84L10.53 4.718a1.25 1.25 0 011.768 0l1.315 1.315-3.94 3.94-2.25-2.25.99-.396a.75.75 0 00.016-1.483l-1.924-.77.014-.013z" />
    <path d="M4.933 11.072l-1.5 1.5A2.75 2.75 0 007.322 16.46l1.903-1.903-3.292-3.291zM6.84 8.409L4.718 10.53a1.25 1.25 0 000 1.768l1.315 1.315 3.94-3.94-2.25-2.25-.396.99a.75.75 0 101.483.016l.77-1.924-.013.014z" />
 </svg>
);

export default BrokenRiceIcon;
