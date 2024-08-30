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
      link: "/sales",
    },
    {
      title: "Productos",
      description: "Gestión de productos.",
      category: "INVENTARIO",
      icon: FiBox,
      link: "/products",
    },
    {
      title: "Sucursales",
      description: "Gestión de sucursales.",
      category: "OPERATIVO",
      icon: FiHome,
      link: "/branches",
    },
    {
      title: "Personal",
      description: "Gestión de personal.",
      category: "RECURSOS HUMANOS",
      icon: FiUsers,
      link: "/staff",
    },
    {
      title: "Proveedores",
      description: "Gestión de proveedores.",
      category: "COMPRAS",
      icon: FiTruck,
      link: "/suppliers",
    },
  ];
  return (
    <main className="flex justify-center items-center h-screen overflow-auto p-16 w-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
        {items.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <div className="flex items-center mb-2">
              <item.icon className="h-6 w-6 text-gray-500 mr-2" />
              <div className="text-sm font-medium text-gray-500">
                {item.title}
              </div>
            </div>
            {/* <div className="mt-2 text-lg font-semibold text-gray-900">
              {item.title}
            </div> */}
            <div className="mt-2 text-gray-700">{item.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
