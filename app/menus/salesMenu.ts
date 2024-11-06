import {
  FiBarChart,
  FiFileText,
  FiUser,
  FiSettings,
  FiDollarSign,
} from "react-icons/fi";

export const salesMenu = [
  {
    title: "Turnos",
    icon: FiSettings,
    link: "/sales/sessions",
  },
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
    title: "Pagos",
    icon: FiDollarSign,
    link: "/sales/payments",
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
];
