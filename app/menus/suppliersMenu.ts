import {
  FiTruck,
  FiPackage,
  FiDollarSign,
  FiFileText,
  FiSettings,
  FiHome,
} from "react-icons/fi";

export const suppliersMenu = [

  {
    title: "Proveedores",
    icon: FiTruck,
    link: "/suppliers/list",
  },
  {
    title: "Órdenes de Compra",
    icon: FiPackage,
    link: "/suppliers/orders",
  },
  {
    title: "Pagos",
    icon: FiDollarSign,
    link: "/suppliers/payments",
  },
  {
    title: "Facturas",
    icon: FiFileText,
    link: "/suppliers/invoices",
  },
  {
    title: "Configuración",
    icon: FiSettings,
    link: "/suppliers/settings",
  },
];
