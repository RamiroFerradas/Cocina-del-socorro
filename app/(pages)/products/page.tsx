"use server";
import { fetchAllProducts } from "@/app/services/fetchProducts";
import { Product } from "@/app/models/Product";
import ProductCard from "./components/ProductCard";

export default async function Products() {
  const products = await fetchAllProducts();
  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        // <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
        <ProductCard key={product.id} product={product} />
        // </Suspense>
      ))}
    </div>
  );
}
