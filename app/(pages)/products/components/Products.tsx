"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Header, Option, SearchBar } from "@/app/components";
import ProductModal from "./ProductModal";
import {
  fetchProductsByBrand,
  fetchProductsByCategory,
  addProduct,
} from "@/app/services/products";
import AddIcon from "@mui/icons-material/Add";
import { Select } from "@/app/components";
import { Product } from "@/app/models/Product";

type Props = { products: Product[] };

const Products = ({ products }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const uniqueBrands = Array.from(
      new Set(
        products.map((product) => ({
          key: product.brand,
          value: product.brand,
        }))
      )
    );
    const uniqueCategories = Array.from(
      new Set(
        products.map((product) => ({
          key: product.category,
          value: product.category,
        }))
      )
    );
    setBrands(uniqueBrands);
    setCategories(uniqueCategories);
  }, [products]);

  const handleBrandChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory("");
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
    setSelectedBrand("");
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
          <SearchBar
            items={products}
            showPreview={true}
            placeholder="Buscar productos..."
            setFilter={setFilteredProducts}
          />
          <div className="flex gap-2">
            <Select
              options={brands}
              selectedOption={selectedBrand}
              onChange={handleBrandChange}
              placeholder="Marca"
              className="w-full max-w-xs"
            />
            <Select
              options={categories}
              selectedOption={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Categoría"
              className="w-full max-w-xs"
            />
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
