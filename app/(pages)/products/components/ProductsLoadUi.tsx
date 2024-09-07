import { Header } from "@/app/components/Header";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {};
export const ProductsLoadUi = (props: Props) => {
  return (
    <section>
      <Header />
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} id={index} />
        ))}
      </div>
    </section>
  );
};
export default ProductsLoadUi;
