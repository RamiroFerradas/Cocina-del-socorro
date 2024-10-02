"use client";
import React from "react";
import Select from "react-select";
import { Option } from "@/app/models/Option";

interface CustomSelectProps {
  options: Option[];
  error?: string;
  isRequired?: boolean;
  isSearchable?: boolean;
  onChange?: (selectedOption: Option) => void;
  selectedOption?: string;
  placeholder?: string;
  className?: string;
}

export const CustomSelect = ({
  options,
  error,
  isRequired,
  isSearchable = false,
  onChange,
  selectedOption = "",
  placeholder = "Seleccione una opción",
  className = "",
}: CustomSelectProps) => {
  // Transformar opciones a formato compatible con react-select
  const formattedOptions = options.map((option) => ({
    value: option.key,
    label: option.value,
  }));

  // Si es buscable, usa react-select
  if (isSearchable) {
    return (
      <Select
        options={formattedOptions}
        isSearchable={isSearchable}
        onChange={(selectedOption) => {
          if (selectedOption) {
            onChange?.({
              key: selectedOption.value,
              value: selectedOption.label,
            });
          }
        }}
      />
    );
  }

  return (
    <select
      value={selectedOption}
      onChange={(e) =>
        onChange?.({
          key: e.target.value,
          value:
            options.find((option) => option.key === e.target.value)?.value ||
            "",
        })
      }
      className={`border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200 ${className} bg-transparent`}
      required={isRequired}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
