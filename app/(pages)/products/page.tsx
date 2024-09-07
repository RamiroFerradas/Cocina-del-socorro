import { fetchAllProducts } from "@/app/services/products/fetchProducts";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import Products from "./components/Products";
import { Suspense } from "react";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import ProductCard from "./components/ProductCard";
import { Header } from "@/app/components";
export const dynamic = "force-dynamic";

export default async function PageProducts() {
  const productsPromise = fetchAllProducts();

  return (
    <Suspense
      fallback={
        <>
          <Header />
          <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} id={index} />
            ))}
          </div>
        </>
      }
    >
      {productsPromise
        .then((products) => <Products products={products} />)
        .catch((err) => handleUnauthorizedError(err))}
    </Suspense>
  );
}
