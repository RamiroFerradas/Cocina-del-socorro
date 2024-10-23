"use client";
import { Sale } from "@/app/models/Sale";
import { fetchSaleById } from "@/app/services/sales/fetchSaleById";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";

type SaleDetailProps = {
  shift: string; // Prop para el turno
};

export const SaleDetailClient = ({ shift }: SaleDetailProps) => {
  const [saleDetail, setSaleDetail] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const id = useSearchParams().get("id");
  useEffect(() => {
    if (id)
      fetchSaleById(id)
        .then((sale) => setSaleDetail(sale))
        .finally(() => setLoading(false));

    return () => {
      setSaleDetail(null);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 w-96 bg-white shadow-lg rounded-lg h-[90vh] overflow-y-auto">
        {/* Skeleton para el título */}
        <Skeleton variant="text" width="60%" height={30} className="mb-4" />

        {/* Skeletons para los datos del usuario */}
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />

        {/* Skeletons para los productos */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          className="mb-2"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          className="mb-2"
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          className="mb-2"
        />
      </div>
    );
  }

  return (
    <div className="p-4 w-96 bg-white shadow-lg rounded-lg h-full overflow-y-auto">
      <h5 className="font-bold text-xl text-center mb-4">
        Detalles de la Venta
      </h5>
      <p className="text-gray-700">
        Usuario: <strong>{saleDetail?.username}</strong>
      </p>
      <p className="text-gray-700">
        Sucursal: <strong>{saleDetail?.branch}</strong>
      </p>
      <p className="text-gray-700">
        Total: <strong>${saleDetail?.total_amount.toFixed(2)}</strong>
      </p>
      {/* Mostrar el turno pasado como prop */}
      <p className="text-gray-700">
        Turno: <strong>{shift}</strong>
      </p>
      <h6 className="font-semibold text-lg mt-4">Productos:</h6>
      <div className="flex flex-col space-y-2">
        {saleDetail?.sale_items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-2 border-b border-gray-200"
          >
            <span>
              {item.product_name} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
