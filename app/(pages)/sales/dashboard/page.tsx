import { Suspense } from "react";
import { Sales, SalesLoadUi } from "./components";
import { fetchAllSales } from "@/app/services/sales/fetchSales";
import { fetchAllBranches } from "@/app/services/branches/fetchBranches";
import { fetchAllProducts } from "@/app/services/products";
export const dynamic = "force-dynamic";

export default async function DashboardSales() {
  const salesPromise = fetchAllSales();
  const products = await fetchAllProducts();

  // console.log(await salesPromise);

  return (
    <Suspense fallback={<SalesLoadUi />}>
      {salesPromise.then((sales) => (
        <Sales sales={sales} products={products} />
      ))}
    </Suspense>
  );
}
