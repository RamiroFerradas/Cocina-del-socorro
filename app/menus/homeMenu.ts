import {
  FiDollarSign,
  FiBox,
  FiMapPin,
  FiUsers,
  FiTruck,
  FiHome,
} from "react-icons/fi";

export const homeMenu = [
  {
    title: "Home",
    icon: FiHome,
    link: "/home",
  },
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
    link: "/users",
  },
  {
    title: "Proveedores",
    icon: FiTruck,
    link: "/suppliers",
  },
];
