import {
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
  FiSettings,
} from "react-icons/fi";

export const usersMenu = [
  {
    title: "Empleados",
    icon: FiUsers,
    link: "/users/empleados",
  },
  {
    title: "Contrataciones",
    icon: FiUserPlus,
    link: "/users/contrataciones",
  },
  {
    title: "Asistencias",
    icon: FiUserCheck,
    link: "/users/asistencias",
  },
  {
    title: "Desvinculaciones",
    icon: FiUserX,
    link: "/users/desvinculaciones",
  },
  {
    title: "Configuración",
    icon: FiSettings,
    link: "/users/configuracion",
  },
];
