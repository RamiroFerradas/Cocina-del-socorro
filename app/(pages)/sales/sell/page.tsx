import { Suspense } from "react";
import { fetchAllProducts } from "@/app/services/products";
import { Sell, SellLoadingUi } from "./components";
export const dynamic = "force-dynamic";

export default function SellClient() {
  const ProductsPromise = fetchAllProducts();

  return (
    <Suspense fallback={<SellLoadingUi />}>
      {ProductsPromise.then((products) => (
        <Sell products={products} />
      ))}
    </Suspense>
  );
}
