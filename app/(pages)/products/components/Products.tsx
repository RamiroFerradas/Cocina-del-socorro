"use client";
import { useState, useEffect } from "react";
import { Product } from "@/app/models/Product";
import ProductCard from "./ProductCard";
import { Header } from "@/app/components";
import { Suspense } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductModal from "./ProductModal";
import api from "@/app/lib/axios";
import addProduct from "@/app/services/products/addProduct";

type Props = { products: Product[] };

const Products = ({ products }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función de filtrado personalizada
  const customFilterFunction = (data: Product[], searchTerm: string) => {
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleFilter = (searchTerm: string) => {
    const filtered = customFilterFunction(products, searchTerm);
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (data: Product) => {
    try {
      await addProduct(data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Header
        filterFunction={handleFilter}
        onAdd={() => setIsModalOpen(true)}
      />

      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        <Suspense
          fallback={Array.from({ length: 9 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        >
          {/* Aquí se renderizan los productos filtrados */}
          <>
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        </Suspense>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSuccess={handleSubmit}
      />
    </>
  );
};

export default Products;
