import React from 'react';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange, label, disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center">
      {label && <label htmlFor={id} className={`mr-2 text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</label>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        id={id}
        onClick={handleToggle}
        className={`${
          checked ? 'bg-green-600' : 'bg-gray-300'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
