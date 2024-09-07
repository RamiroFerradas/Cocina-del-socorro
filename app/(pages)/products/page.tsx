"use server";
import { fetchAllProducts } from "@/app/services/fetchProducts";
import { Product } from "@/app/models/Product";
import ProductCard from "./components/ProductCard";
import { Suspense } from "react";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";

export default async function Products() {
  const productsPromise = fetchAllProducts();

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <Suspense
        fallback={Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      >
        <>
          {productsPromise
            .then((response) =>
              response.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )
            .catch(async (err) => {
              await handleUnauthorizedError(err);
            })}
        </>
      </Suspense>
    </div>
  );
}
