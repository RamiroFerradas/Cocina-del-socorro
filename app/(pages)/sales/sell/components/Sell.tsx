"use client";
import { ProductCard } from "@/app/(pages)/products/components";
import {
  Button,
  Header,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import { Product } from "@/app/models/Product";
import { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/cart/useCartStore";
import { saveSale } from "@/app/services/sales/saveSale";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

type Props = {
  products: Product[];
};

export const Sell = ({ products }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { cartItems, addToCart, updateQuantity, calculateTotal, clearCart } =
    useCartStore();

  const handleSale = async () => {
    setIsLoadingButton(true);
    try {
      await saveSale({ data: cartItems, pathname: "/ventas" });
      clearCart();
      toast(
        <Toast
          variant="success"
          title={"Venta realizada"}
          text={"Venta realizada exitosamente."}
        />,
        {
          hideProgressBar: true,
          className: toastSuccessStyles,
        }
      );
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
      console.error("Error al realizar la venta", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <section className="">
      <Header />
      {isClient && (
        <div className="flex h-screen-header">
          <div className="w-3/4 flex flex-wrap gap-4 p-4 overflow-scroll justify-start">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() =>
                  addToCart({
                    id: product.id,
                    product_name: product.name,
                    price: product.price,
                    quantity: 1,
                  })
                }
                className="cursor-pointer w-40"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="w-1/4 bg-white flex flex-col justify-between p-2">
            <div className="">
              <h2 className="text-xl font-bold mb-4">Items</h2>
              <div className="h-[calc(100vh-14rem)] overflow-auto">
                {cartItems.length === 0 ? (
                  <p>No hay productos seleccionados</p>
                ) : (
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <div>
                          <p>{item.product_name}</p>{" "}
                          <p>Cantidad: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (!isNaN(newQuantity) && newQuantity > 0) {
                                const { id, ...rest } = item;
                                updateQuantity({ id, ...rest }, newQuantity);
                              }
                            }}
                            className="w-16 text-center border border-gray-300 rounded"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Total: ${calculateTotal()}</p>
                <Button
                  className="w-full h-10"
                  onClick={handleSale}
                  disabled={isLoadingButton}
                >
                  {isLoadingButton ? (
                    <CircularProgress className="!text-white" size={20} />
                  ) : (
                    "REALIZAR VENTA"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
