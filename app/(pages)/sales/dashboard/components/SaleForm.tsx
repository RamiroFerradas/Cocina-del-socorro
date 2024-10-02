"use client";
import React, { useState } from "react";
import {
  ReusableForm,
  Modal,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import { Sale } from "@/app/models/Sale";
import { Product } from "@/app/models/Product";
import { saveSale } from "@/app/services/sales/saveSale";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { set } from "react-hook-form";

type SaleFormProps = {
  products: Product[];
  editingSale?: Sale | null;
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

  const filterProduct = (selectedProduct: string) => {
    const product = products.find(
      (product) => product.name === selectedProduct
    );
    setProductSale(product || null);
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
      onChange: (selectedProduct: string) => {
        filterProduct(selectedProduct);
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

  const handleSubmit = async (data: Sale) => {
    try {
      setIsLoadingButton(true);

      await saveSale({ data: [data], pathname });

      toast(
        <Toast
          variant="success"
          title={editingSale ? "Producto actualizado" : "Producto agregado"}
          text={
            editingSale
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
      <ReusableForm<Sale>
        fields={SaleFields}
        onSubmit={handleSubmit}
        defaultValues={editingSale!}
        onClose={() => {
          setIsModalOpen(false);
          setProductSale(null);
        }}
        isLoading={isLoadingButton}
      />
    </Modal>
  );
};
