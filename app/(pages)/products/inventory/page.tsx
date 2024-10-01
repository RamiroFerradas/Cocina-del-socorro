import { Suspense } from "react";
import { fetchAllProducts } from "@/app/services/products";
import { Products, ProductsLoadUi } from "../components";
export const dynamic = "force-dynamic";

export default async function Inventory() {
  const productsPromise = fetchAllProducts();

  return (
    <Suspense fallback={<ProductsLoadUi />}>
      {productsPromise.then((products) => (
        <Products products={products} />
      ))}
    </Suspense>
  );
}