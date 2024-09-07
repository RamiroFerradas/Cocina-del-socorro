import { fetchAllProducts } from "@/app/services/products/fetchProducts";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import Products from "./components/Products";
export const dynamic = "force-dynamic";

export default async function PageProducts() {
  const productsPromise = fetchAllProducts();

  return productsPromise
    .then((response) => <Products products={response} />)
    .catch(async (err) => {
      await handleUnauthorizedError(err);
    });
}
