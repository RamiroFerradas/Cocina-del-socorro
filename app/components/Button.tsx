import React, { ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";

// Extenderemos del button nativo de HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Para manejar el estado de carga
  className?: string; // Para personalizar las clases
  children: ReactNode; // Contenido del botón
}

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded-md flex justify-center items-center transition bg-blue-500 text-white min-w-32",
        {
          "opacity-50 cursor-default": isLoading || disabled,
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </button>
  );
};
