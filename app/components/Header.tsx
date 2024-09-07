"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

interface HeaderProps {
  filterFunction?: (searchTerm: string) => void;
  onAdd?: () => void;
  defaultTitle?: string;
}
const translations: Record<string, string> = {
  sales: "Ventas",
  products: "Productos",
  branches: "Sucursales",
  staff: "Personal",
  suppliers: "Proveedores",
};
export function Header({
  filterFunction,
  onAdd,
  defaultTitle = "Inicio",
}: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const route = pathname.split("/")[1];

  const title = translations[route] || defaultTitle;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterFunction && filterFunction(newSearchTerm); // Aplica la función de filtrado
  };

  return (
    <header className="flex w-[calc(100vw-16rem)] justify-between items-center border-b bg-white min-h-16 px-4 fixed top-0">
      <h1 className="text-gray-800 font-bold">{title}</h1>

      {/* Barra de búsqueda */}
      {filterFunction && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar productos..."
          className="border border-gray-300 p-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200 w-1/4 text-center focus:placeholder:opacity-0"
        />
      )}
      {onAdd ? (
        <button
          onClick={onAdd}
          className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
        >
          <AddIcon className="size-4 mr-2 text-gray-600" />
          <span className="text-sm font-medium">Agregar</span>
        </button>
      ) : (
        <div></div>
      )}
    </header>
  );
}
