import { fetchAllProducts } from "@/app/services/products/fetchProducts";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import Products from "./components/Products";
import { Suspense } from "react";
import ProductsLoadUi from "./components/ProductsLoadUi";
export const dynamic = "force-dynamic";

export default async function PageProducts() {
  const productsPromise = fetchAllProducts();

  return (
    <Suspense fallback={<ProductsLoadUi />}>
      {productsPromise
        .then((products) => <Products products={products} />)
        .catch((err) => handleUnauthorizedError(err))}
    </Suspense>
  );
}
