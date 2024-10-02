"use client";
import React, { useRef, useState } from "react";
import {
  ReusableForm,
  Modal,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import { SaleItem } from "@/app/models/Sale";
import { Product } from "@/app/models/Product";
import { Option } from "@/app/models/Option";
import { saveSale } from "@/app/services/sales/saveSale";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

type SaleFormProps = {
  products: Product[];
  editingSale?: SaleItem | null;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const SaleForm = ({
  products,
  editingSale,
  isModalOpen,
  setIsModalOpen,
}: SaleFormProps) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [productSale, setProductSale] = useState<Product | null>(null);
  const pathname = usePathname();

  const control = useForm<SaleItem>({
    mode: "onChange",
    defaultValues: {
      product_name: "",
      quantity: 1,
      price: 0,
    },
  });
  const {
    setValue,
    formState: { isValid },
  } = control;

  const filterProduct = (selectedProduct: string) => {
    return products.find((product) => product.name === selectedProduct);
  };

  const SaleFields = [
    {
      name: "product_name",
      label: "Producto",
      type: "select",
      options: products.map((product) => ({
        key: product.id.toString(),
        value: product.name,
      })),
      isSearchable: true,
      required: true,
      onChange: (selectedProduct: Option) => {
        const product = filterProduct(selectedProduct.value);
        // Aquí actualizas el precio en el componente hijo
        setValue("price", product?.price || 0);

        setProductSale(product || null);
      },
    },
    {
      name: "quantity",
      label: "Cantidad",
      type: "number",
      step: "0.1",
      min: "0",
      defaultValue: 1,
    },
    {
      name: "price",
      label: "Total",
      type: "number",
      defaultValue: productSale?.price,
    },
  ];

  const handleSubmitForm = async (data: SaleItem) => {
    try {
      setIsLoadingButton(true);
      await saveSale({ data: [data], pathname });
      toast(
        <Toast
          variant="success"
          title={editingSale ? "Venta actualizada" : "Venta agregada"}
          text={
            editingSale
              ? "Venta actualizada exitosamente."
              : "Venta agregada exitosamente."
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
          title="Error al guardar la venta"
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

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={editingSale ? "Editar Venta" : "Agregar Venta"}
    >
      <h2 className="text-lg font-bold">
        {editingSale ? "Editar" : "Agregar"} venta
      </h2>
      <ReusableForm
        fields={SaleFields}
        onSubmit={handleSubmitForm}
        submitButtonText={editingSale ? "Actualizar" : "Agregar"}
        isLoading={isLoadingButton}
        onClose={() => setIsModalOpen(false)}
        isFormValid={isValid}
        control={control}
      />
    </Modal>
  );
};
