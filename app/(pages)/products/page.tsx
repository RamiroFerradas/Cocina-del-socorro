import Products from "./components/Products";
import { Suspense } from "react";
import ProductsLoadUi from "./components/ProductsLoadUi";
import { fetchAllProducts } from "@/app/services/products";
export const dynamic = "force-dynamic";

export default async function PageProducts() {
  const productsPromise = fetchAllProducts();

  return (
    <Suspense fallback={<ProductsLoadUi />}>
      {productsPromise.then((products) => (
        <Products products={products} />
      ))}
    </Suspense>
  );
}
