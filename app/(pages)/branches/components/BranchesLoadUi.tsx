import { Header } from "@/app/components/Header";
import { BranchCardSkeleton } from "./BranchCardSkeleton";

type Props = {};
export const BranchesLoadUi = (props: Props) => {
  return (
    <section>
      <Header />
      <div className="container mx-auto py-8 flex flex-wrap gap-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <BranchCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
export default BranchesLoadUi;
