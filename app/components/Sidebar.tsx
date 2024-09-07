"use client";
import { usePathname } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import {
  salesMenu,
  productsMenu,
  branchesMenu,
  staffMenu,
  suppliersMenu,
} from "../menus";
import { homeMenu } from "../menus/homeMenu";
import { logoutUser } from "../services/auth";

export function Sidebar() {
  const pathname = usePathname();
  const getMenuItems = () => {
    if (pathname.startsWith("/sales")) {
      return salesMenu;
    } else if (pathname.startsWith("/products")) {
      return productsMenu;
    } else if (pathname.startsWith("/branches")) {
      return branchesMenu;
    } else if (pathname.startsWith("/staff")) {
      return staffMenu;
    } else if (pathname.startsWith("/suppliers")) {
      return suppliersMenu;
    } else if (pathname.startsWith("/home")) {
      return homeMenu;
    } else {
      return [];
    }
  };

  if (pathname.startsWith("/login")) return;

  const menuItems = getMenuItems();

  return (
    <div className="min-h-16 w-64 bg-white shadow-lg flex flex-col max-h-screen overflow-auto">
      <div className="border-b font-bold min-h-16 m-auto flex justify-center items-center w-full">
        Cocina del Socorro
      </div>

      <nav className="flex flex-col flex-grow p-4">
        {menuItems.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className={`flex items-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ${
              pathname === item.link ? "bg-gray-100" : ""
            }`}
          >
            <item.icon className="h-5 w-5 mr-3 text-gray-600" />
            <span className="text-sm font-medium">{item.title}</span>
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-center p-4 border-t">
        <button
          className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-200"
          onClick={async () => {
            await logoutUser();
          }}
        >
          <FiLogOut className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Salir</span>
        </button>
      </div>
    </div>
  );
}
