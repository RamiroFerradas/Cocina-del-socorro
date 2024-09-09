"use client";
import { Product } from "@/app/models/Product";
import { ReusableForm } from "@/app/components";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: (data: Product) => Promise<void>;
  productToEdit?: Product | null; // Producto opcional para editar
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onAddSuccess,
  productToEdit,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {productToEdit ? "Editar Producto" : "Agregar Producto"}
        </h2>
        <ReusableForm<Product>
          fields={productFields}
          onSubmit={onAddSuccess}
          defaultValues={productToEdit!}
          submitButtonText="Actualizar Producto"
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ProductModal;
