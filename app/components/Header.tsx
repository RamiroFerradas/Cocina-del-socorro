"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface HeaderProps {
  defaultTitle?: string;
  children?: ReactNode; // Agrega `children` a las props
}

const translations: Record<string, string> = {
  sales: "Ventas",
  products: "Productos",
  branches: "Sucursales",
  users: "Personal",
  suppliers: "Proveedores",
};

export function Header({ defaultTitle = "Inicio", children }: HeaderProps) {
  const pathname = usePathname();
  const route = pathname.split("/")[1];
  const title = translations[route] || defaultTitle;

  return (
    <header className="flex w-[calc(100vw-16rem)] justify-between items-center border-b bg-white h-16 px-4 top-0 !z-50">
      <h1 className="text-gray-800 font-bold">{title}</h1>

      {children}
    </header>
  );
}
