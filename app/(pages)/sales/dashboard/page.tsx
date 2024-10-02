import { Suspense } from "react";
import { Sales, SalesLoadUi } from "./components";
import { fetchAllSales } from "@/app/services/sales/fetchSales";
import { fetchAllProducts } from "@/app/services/products";
export const dynamic = "force-dynamic";

export default async function DashboardSales() {
  const salesPromise = fetchAllSales();
  const products = await fetchAllProducts();

  return (
    <Suspense fallback={<SalesLoadUi />}>
      {salesPromise.then((sales) => (
        <Sales sales={sales} products={products} />
      ))}
    </Suspense>
  );
}
