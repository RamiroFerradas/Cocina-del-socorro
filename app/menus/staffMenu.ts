import {
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
  FiSettings,
  FiHome,
} from "react-icons/fi";

export const staffMenu = [

  {
    title: "Empleados",
    icon: FiUsers,
    link: "/staff/empleados",
  },
  {
    title: "Contrataciones",
    icon: FiUserPlus,
    link: "/staff/contrataciones",
  },
  {
    title: "Asistencias",
    icon: FiUserCheck,
    link: "/staff/asistencias",
  },
  {
    title: "Desvinculaciones",
    icon: FiUserX,
    link: "/staff/desvinculaciones",
  },
  {
    title: "Configuración",
    icon: FiSettings,
    link: "/staff/configuracion",
  },
];
