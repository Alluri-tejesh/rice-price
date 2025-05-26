import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  unit?: string;
  icon?: React.ReactNode;
  min?: string;
  max?: string;
  step?: string;
  error?: string;
  disabled?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  value,
  onChange,
  type = "number",
  placeholder,
  unit,
  icon,
  min,
  max,
  step,
  error,
  disabled = false
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className={`flex items-center text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'} mb-1`}>
        {icon && <span className={`mr-2 ${disabled ? 'text-gray-400' : 'text-green-600'}`}>{icon}</span>}
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`block w-full pr-12 py-2.5 px-3.5 border ${error ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md sm:text-sm placeholder-gray-400 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          aria-describedby={unit ? `${id}-unit` : undefined}
          aria-invalid={!!error}
          aria-disabled={disabled}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className={`${disabled ? 'text-gray-400' : 'text-gray-500'} sm:text-sm`} id={`${id}-unit`}>
              {unit}
            </span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputGroup;
