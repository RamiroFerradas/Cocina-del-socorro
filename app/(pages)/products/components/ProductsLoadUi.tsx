import { Header } from "@/app/components/Header";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {};
export const ProductsLoadUi = (props: Props) => {
  return (
    <section>
      <Header />
      <div className="container mx-auto py-8 flex flex-wrap gap-4 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
export default ProductsLoadUi;
