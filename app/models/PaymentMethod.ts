export enum PaymentMethod {
  Efectivo = 1,
  MercadoPago = 2,
  TarjetaCredito = 3,
  Transferencia = 4,
}
export const paymentMethodLabels: Record<keyof typeof PaymentMethod, string> = {
  MercadoPago: "Mercado Pago",
  Efectivo: "Efectivo",
  TarjetaCredito: "Tarjeta de crédito",
  Transferencia: "Transferencia",
};
