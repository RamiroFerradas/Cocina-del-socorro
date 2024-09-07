"use client";
import { useEffect, useState } from "react";
import { Product } from "@/app/models/Product";
import ProductCard from "./ProductCard";
import { Header } from "@/app/components";
import ProductModal from "./ProductModal";
import {
  fetchProductsByBrand,
  fetchProductsByCategory,
  addProduct,
} from "@/app/services/products";
import AddIcon from "@mui/icons-material/Add";

type Props = { products: Product[] };

const Products = ({ products }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Extract unique brands and categories from products
  useEffect(() => {
    const uniqueBrands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    setBrands(uniqueBrands);
    setCategories(uniqueCategories);
  }, [products]);

  const handleBrandChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const brand = event.target.value;
    var filtered;

    if (brand) {
      filtered = await fetchProductsByBrand(brand);
      setFilteredProducts(filtered);
    } else {
      filtered = products;
    }
    setSelectedBrand(brand);
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    var filtered;
    if (category) {
      filtered = await fetchProductsByCategory(category);
      setSelectedCategory(category);
    } else {
      filtered = products;
    }
    setFilteredProducts(filtered);
  };

  // Handle search term
  const handleFilter = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (data: Product) => {
    try {
      await addProduct(data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section>
      {isClient ? (
        <Header>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="border border-gray-300 p-2 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200 w-1/4 text-center focus:placeholder:opacity-0"
            onChange={(e) => handleFilter(e.target.value)}
          />
          <div className="space-x-4">
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className="border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200"
            >
              <option value="">Seleccionar marca</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
          >
            <AddIcon className="size-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Agregar</span>
          </button>
        </Header>
      ) : null}

      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((product: Product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={handleSubmit}
      />
    </section>
  );
};

export default Products;
