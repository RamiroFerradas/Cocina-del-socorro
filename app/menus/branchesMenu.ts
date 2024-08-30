import { FiHome, FiMapPin, FiPhone, FiUsers, FiSettings } from "react-icons/fi";

export const branchesMenu = [
  {
    title: "Sucursales",
    icon: FiHome,
    link: "/branches/list",
  },
  {
    title: "Ubicaciones",
    icon: FiMapPin,
    link: "/branches/locations",
  },
  {
    title: "Contactos",
    icon: FiPhone,
    link: "/branches/contacts",
  },
  {
    title: "Personal",
    icon: FiUsers,
    link: "/branches/staff",
  },
  {
    title: "Configuración",
    icon: FiSettings,
    link: "/branches/settings",
  },
];
