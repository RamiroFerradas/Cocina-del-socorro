import { FiBox, FiTag, FiList, FiLayers, FiArchive } from "react-icons/fi";

export const productsMenu = [
  {
    title: "Inventario",
    icon: FiBox,
    link: "/products/inventory",
  },
  {
    title: "Categorías",
    icon: FiList,
    link: "/products/categories",
  },
  {
    title: "Precios",
    icon: FiTag,
    link: "/products/pricing",
  },
  {
    title: "Stock",
    icon: FiLayers,
    link: "/products/stock",
  },
  {
    title: "Almacenes",
    icon: FiArchive,
    link: "/products/warehouses",
  },
];
