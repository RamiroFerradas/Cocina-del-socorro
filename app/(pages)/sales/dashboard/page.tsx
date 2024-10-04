import { Suspense } from "react";
import { Sales, SalesLoadUi } from "./components";
import { fetchAllSales } from "@/app/services/sales/fetchSales";
import { fetchAllProducts } from "@/app/services/products";
export const dynamic = "force-dynamic";

export default function DashboardSales() {
  const salesAndProductsPromise = Promise.all([
    fetchAllSales(),
    fetchAllProducts(),
  ]);

  return (
    <Suspense fallback={<SalesLoadUi />}>
      {salesAndProductsPromise.then(([sales, products]) => (
        <Sales sales={sales} products={products} />
      ))}
    </Suspense>
  );
}
