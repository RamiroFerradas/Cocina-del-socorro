import React from "react";

export interface Option {
  key: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  selectedOption: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      selectedOption,
      onChange,
      placeholder = "Seleccione una opción",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        value={selectedOption}
        onChange={onChange}
        className={`border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200 ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
