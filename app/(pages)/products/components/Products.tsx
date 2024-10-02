"use client";
import React, { useEffect, useState } from "react";
import {
  ConfirmationModal,
  Header,
  ReusableForm,
  SearchBar,
  CustomSelect,
} from "@/app/components";
import { Option } from "@/app/models/Option";
import { Modal } from "@/app/components/Modal";
import {
  deleteProduct,
  fetchProductsByBrand,
  fetchProductsByCategory,
  saveProduct,
} from "@/app/services/products";
import AddIcon from "@mui/icons-material/Add";
import { Product } from "@/app/models/Product";

import {
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components/Toast";
import { toast } from "react-toastify";
import { ProductCard } from "./ProductCard";

type Props = { products: Product[] };

export const Products = ({ products }: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const handleBrandChange = async (selectedOption: Option) => {
    setSelectedCategory("");
    var filtered;
    var brand = selectedOption.value;

    if (brand) {
      filtered = await fetchProductsByBrand(brand);
      setFilteredProducts(filtered);
    } else {
      filtered = products;
    }
    setSelectedBrand(brand);
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = async (selectedOption: Option) => {
    setSelectedBrand("");
    var filtered;
    var category = selectedOption.value;

    if (category) {
      filtered = await fetchProductsByCategory(category);
      setSelectedCategory(category);
    } else {
      filtered = products;
    }
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (data: Product) => {
    try {
      setIsLoadingButton(true);

      await saveProduct({ data, isEdit: !!editingProduct });

      toast(
        <Toast
          variant="success"
          title={editingProduct ? "Producto actualizado" : "Producto agregado"}
          text={
            editingProduct
              ? "Producto actualizado exitosamente."
              : "Producto agregado exitosamente."
          }
        />,
        {
          hideProgressBar: true,
          className: toastSuccessStyles,
        }
      );

      setIsModalOpen(false);
    } catch (error: any) {
      toast(
        <Toast
          variant="error"
          title="Error al guardar el producto"
          text={
            error.message ||
            "Ocurrió un error inesperado al guardar el producto."
          }
        />,
        {
          hideProgressBar: true,
          className: toastErrorStyles,
        }
      );
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteClick = (id: number) => {
    setProductIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete !== null) {
      setIsLoadingButton(true);
      await deleteProduct(productIdToDelete);
      setIsLoadingButton(true);
      setIsConfirmationModalOpen(false);
    }
  };

  return (
    <section>
      <Header>
        {isClient && (
          <>
            <SearchBar
              items={products}
              showPreview={true}
              placeholder="Buscar productos..."
              setFilter={setFilteredProducts}
            />
            <div className="flex gap-2">
              <CustomSelect
                options={brands}
                selectedOption={selectedBrand}
                onChange={(selectedOption) => handleBrandChange(selectedOption)}
                placeholder="Marca"
                className="w-full max-w-xs"
                isSearchable={false}
              />
              <CustomSelect
                options={categories}
                selectedOption={selectedCategory}
                onChange={(selectedOption) =>
                  handleCategoryChange(selectedOption)
                }
                placeholder="Categoría"
                className="w-full max-w-xs"
                isSearchable={false}
              />
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
            >
              <AddIcon className="size-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium">Agregar</span>
            </button>
          </>
        )}
      </Header>

      <div className="container mx-auto py-8 flex flex-wrap gap-4 p-4">
        {isClient &&
          filteredProducts.map((product: Product, index) => (
            <ProductCard
              key={index}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Editar Producto" : "Agregar Producto"}
      >
        <ReusableForm<Product>
          fields={productFields}
          onSubmit={handleSubmit}
          defaultValues={editingProduct!}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoadingButton}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
        isLoading={isLoadingButton}
      />
    </section>
  );
};

const productFields = [
  { name: "name", label: "Nombre", type: "text", required: true },
  { name: "brand", label: "Marca", type: "text", required: true },
  { name: "category", label: "Categoría", type: "text", required: true },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
  { name: "image_url", label: "URL de Imagen", type: "text", required: true },
  { name: "price", label: "Precio", type: "number", required: true },
  { name: "sku", label: "SKU", type: "text", required: true },
];
