"use client";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Mapa de traducciones para las rutas principales
  type RouteKeys = "sales" | "products" | "branches" | "staff" | "suppliers";

  // Mapeo de rutas a sus traducciones en español
  const routeTranslations: Record<RouteKeys, string> = {
    sales: "Ventas",
    products: "Productos",
    branches: "Sucursales",
    staff: "Personal",
    suppliers: "Proveedores",
  };
  // Obtén la primera parte del pathname
  const route = pathname.split("/")[1] as RouteKeys;

  // Traduce la ruta o muestra "Home" si está en la página principal
  const title = routeTranslations[route] || "Inicio";

  return (
    <header className="flex py-6 border-b bg-white">
      <h1 className="text-gray-800 font-bold">{title}</h1>
    </header>
  );
}
