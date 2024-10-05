import { Suspense } from "react";
import { fetchAllProducts } from "@/app/services/products";
import { SalesLoadUi } from "../dashboard/components";
import { Sell } from "./components";
export const dynamic = "force-dynamic";

export default function SellClient() {
  const ProductsPromise = fetchAllProducts();

  return (
    <Suspense fallback={<SalesLoadUi />}>
      {ProductsPromise.then((products) => (
        <Sell products={products} />
      ))}
    </Suspense>
  );
}
