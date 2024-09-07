import { fetchAllProducts } from "@/app/services/products/fetchProducts";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import Products from "./components/Products";
import { Suspense } from "react";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
export const dynamic = "force-dynamic";

export default async function PageProducts() {
  const productsPromise = fetchAllProducts();

  return productsPromise
    .then((response) => (
      <Suspense
        fallback={Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      >
        <Products products={response} />
      </Suspense>
    ))
    .catch(async (err) => {
      await handleUnauthorizedError(err);
    });
}
