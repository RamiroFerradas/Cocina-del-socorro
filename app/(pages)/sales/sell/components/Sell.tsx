"use client";
import { ProductCard } from "@/app/(pages)/products/components";
import {
  Button,
  CustomSelect,
  Header,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
  Modal,
} from "@/app/components";
import { Product } from "@/app/models/Product";
import { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/cart/useCartStore";
import { saveSale } from "@/app/services/sales/saveSale";
import { toast } from "react-toastify";
import { CircularProgress, Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { PaymentMethod } from "@/app/models/PaymentMethod";
import { isSessionActive } from "@/app/services/sessions/isSessionActive";

type Props = {
  products: Product[];
};

export const Sell = ({ products }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(PaymentMethod.Efectivo);
  const [sessionActive, setSessionActive] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const checkSession = async () => {
      const activeSession = await isSessionActive();
      setSessionActive(activeSession);

      if (!activeSession) {
        setShowSessionModal(true);
      }
    };

    checkSession();
  }, []);

  const { cartItems, addToCart, updateQuantity, calculateTotal, clearCart } =
    useCartStore();

  const handleSale = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Seleccione una forma de pago.");
      return;
    }

    setIsLoadingButton(true);
    try {
      await saveSale({
        sale_items: cartItems,
        paymentMethod: selectedPaymentMethod,
        pathname,
      });
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
          <div className="container mx-auto py-8 flex flex-wrap gap-4 p-4">
            {products.map((product) => (
              <div
                key={product.product_id}
                onClick={() =>
                  addToCart({
                    product_id: product.product_id,
                    product_name: product.name,
                    price: product.price,
                    quantity: 1,
                  })
                }
                className="cursor-pointer w-40 flex"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="w-1/4 bg-white flex flex-col justify-between p-2">
            <div className="">
              <h2 className="text-xl font-bold mb-4">Items</h2>
              <div className="h-[calc(100vh-16rem)] overflow-auto">
                {cartItems.length === 0 ? (
                  <p>No hay productos seleccionados</p>
                ) : (
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={item.product_id}
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
                                const { product_id, ...rest } = item;
                                updateQuantity(
                                  { product_id, ...rest },
                                  newQuantity
                                );
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

                <CustomSelect
                  options={Object.keys(PaymentMethod)
                    .filter((key) => !isNaN(Number(key)))
                    .map((key) => ({
                      key: key,
                      value: String(
                        PaymentMethod[key as keyof typeof PaymentMethod]
                      ),
                    }))}
                  selectedOption={String(selectedPaymentMethod)}
                  onChange={(option) => {
                    setSelectedPaymentMethod(
                      Number(option.key) as PaymentMethod
                    );
                  }}
                  placeholder="Seleccione una forma de pago"
                />

                <Button
                  className="w-full h-10 mt-4"
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

      <Modal
        isOpen={showSessionModal}
        onClose={() => router.push("/sales/sessions")}
        title="Turno cerrado"
      >
        <p>
          No hay un turno abierto. Diríjase al apartado de turnos para abrir un
          nuevo turno.
        </p>
        <Button onClick={() => router.push("/sales/sessions")} className="mt-6">
          Ir a Turnos
        </Button>
      </Modal>
    </section>
  );
};
