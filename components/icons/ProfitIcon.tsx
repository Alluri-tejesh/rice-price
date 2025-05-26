
import React from 'react';

interface IconProps {
  className?: string;
}

const ProfitIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L5.75 8.69l3.22-3.221a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0L5.75 11.81l-3.47 3.47a.75.75 0 11-1.06-1.061l3.47-3.47-3.47-3.47a.75.75 0 010-1.061zm14.28 6.78a.75.75 0 010-1.06l-4.5-4.5a.75.75 0 01-1.06 0L6.75 9.629l-1.97-1.97a.75.75 0 111.06-1.06L9 9.75l3.22-3.221a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0L9.06 12.37l1.97 1.97a.75.75 0 11-1.06 1.06L6.75 12.19l-1.47 1.47a.75.75 0 01-1.06-1.06l2.53-2.53.001-.001.001-.001h.001z" clipRule="evenodd" />
    <path d="M12.5 4.5a.75.75 0 00-1.5 0v1.69l1.5 1.5V4.5z" />
    <path d="M5.509 10.355a.75.75 0 01.04-.025l.001-.001-.041.026z" />
  </svg>
);

export default ProfitIcon;
