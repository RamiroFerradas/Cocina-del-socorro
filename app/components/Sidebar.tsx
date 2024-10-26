"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { salesMenu, productsMenu, suppliersMenu, usersMenu } from "@/app/menus";
import { homeMenu } from "@/app/menus/homeMenu";
import Link from "next/link";
import { logoutUser } from "@/app/services/auth/login";
import { MenuItem } from "../models/MenuItem";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  useEffect(() => {
    if (pathname.startsWith("/sales")) {
      setExpandedSection("Ventas");
    } else if (pathname.startsWith("/products")) {
      setExpandedSection("Productos");
    } else if (pathname.startsWith("/branches")) {
      setExpandedSection("Sucursales");
    } else if (pathname.startsWith("/users")) {
      setExpandedSection("users");
    } else if (pathname.startsWith("/proveedores")) {
      setExpandedSection("Proveedores");
    } else {
      setExpandedSection(null);
    }
  }, [pathname]);

  const getSubMenuItems = (menuTitle: string) => {
    switch (menuTitle) {
      case "Ventas":
        return salesMenu;
      case "Productos":
        return productsMenu;
      case "Sucursales":
        return [];
      case "users":
        return usersMenu;
      case "Proveedores":
        return suppliersMenu;
      default:
        return [];
    }
  };

  if (pathname.startsWith("/login")) return;

  const handleToggle = (menuTitle: string) => {
    if (expandedSection === menuTitle) {
      setExpandedSection(null);
    } else {
      setExpandedSection(menuTitle);
    }
  };

  return (
    <div className="min-h-16 w-64 bg-white shadow-lg flex flex-col max-h-screen overflow-auto">
      <div className="border-b font-bold min-h-16 m-auto flex justify-center items-center w-full">
        Cocina del Socorro
      </div>

      <nav className="flex flex-col flex-grow p-4">
        {/* Always show homeMenu items */}
        {homeMenu.map((item, index) => {
          const isExpanded = expandedSection === item.title;
          const subMenuItems: MenuItem[] = getSubMenuItems(item.title);

          return (
            <div key={index}>
              <button
                onClick={() =>
                  subMenuItems.length
                    ? handleToggle(item.title)
                    : router.push(item.link)
                }
                className={`flex items-center w-full text-left p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                  pathname === item.link ? "bg-gray-100" : ""
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-600" />
                <span className="text-sm font-medium">{item.title}</span>
                {subMenuItems.length > 0 && (
                  <span className="ml-auto">
                    {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                )}
              </button>

              {isExpanded && subMenuItems.length > 0 && (
                <div className="ml-6 mt-1">
                  {subMenuItems.map((subItem, subIndex: number) => (
                    <Link
                      href={subItem.link}
                      key={subIndex}
                      className={`flex items-center p-2 my-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                        pathname === subItem.link ? "bg-gray-100" : ""
                      }`}
                    >
                      <subItem.icon className="h-4 w-4 mr-3 text-gray-600" />
                      <span className="text-sm font-medium">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
