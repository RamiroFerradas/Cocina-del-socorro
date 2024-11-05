import { fetchAllPayments } from "@/app/services/payments/fetchPayments";
import { Suspense } from "react";
import { PaymentsLoadUi, Payments } from "./components";
export const dynamic = "force-dynamic";

export default async function PaymentsServer() {
  const paymentsPromise = fetchAllPayments();

  return (
    <Suspense fallback={<PaymentsLoadUi />}>
      {paymentsPromise.then((payments) => (
        <Payments payments={payments} />
      ))}
    </Suspense>
  );
}
