import {
  FiDollarSign,
  FiBox,
  FiMapPin,
  FiUsers,
  FiTruck,
} from "react-icons/fi";

export const homeMenu = [
  {
    title: "Ventas",
    icon: FiDollarSign,
    link: "/sales",
  },
  {
    title: "Productos",
    icon: FiBox,
    link: "/products",
  },
  {
    title: "Sucursales",
    icon: FiMapPin,
    link: "/branches",
  },
  {
    title: "Personal",
    icon: FiUsers,
    link: "/staff",
  },
  {
    title: "Proveedores",
    icon: FiTruck,
    link: "/suppliers",
  },
];
