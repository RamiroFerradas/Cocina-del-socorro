import {
  FiBarChart,
  FiFileText,
  FiUser,
  FiSettings,
  FiDollarSign,
  FiHome,
} from "react-icons/fi";

export const salesMenu = [
  {
    title: "Dashboard",
    icon: FiBarChart,
    link: "/sales/dashboard",
  },
  {
    title: "Vender",
    icon: FiFileText,
    link: "/sales/sell",
  },
  {
    title: "Facturas",
    icon: FiFileText,
    link: "/sales/invoices",
  },
  {
    title: "Clientes",
    icon: FiUser,
    link: "/sales/customers",
  },
  {
    title: "Pagos",
    icon: FiDollarSign,
    link: "/sales/payments",
  },
  {
    title: "Configuración",
    icon: FiSettings,
    link: "/sales/settings",
  },
];
