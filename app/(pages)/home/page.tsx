import { Header } from "@/app/components/Header";
import { productsMenu, salesMenu } from "@/app/menus";
import Link from "next/link";
import {
  FiBox,
  FiHome,
  FiShoppingCart,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function Home() {
  const items = [
    {
      title: "Ventas",
      description: "Gestión de ventas.",
      category: "COMERCIAL",
      icon: FiShoppingCart,
      link: salesMenu[0].link,
      color: "orange-500",
    },
    {
      title: "Productos",
      description: "Gestión de productos.",
      category: "INVENTARIO",
      icon: FiBox,
      link: productsMenu[0].link,
      color: "green-500",
    },
    {
      title: "Sucursales",
      description: "Gestión de sucursales.",
      category: "OPERATIVO",
      icon: FiHome,
      link: "/branches",
      color: "blue-500",
    },
    {
      title: "Personal",
      description: "Gestión de personal.",
      category: "RECURSOS HUMANOS",
      icon: FiUsers,
      link: "/users",
      color: "yellow-500",
    },
    {
      title: "Proveedores",
      description: "Gestión de proveedores.",
      category: "COMPRAS",
      icon: FiTruck,
      link: "/suppliers",
      color: "purple-500",
    },
  ];

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center p-8">
        {items.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col}`}
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <item.icon className={`mr-2 text-2xl text-${item.color}`} />
                <div className="text-sm text-gray-700">{item.title}</div>
              </div>
              <div className="mt-2 text-gray-700">{item.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
