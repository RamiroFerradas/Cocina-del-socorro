// components/UserLoadUi.tsx
import { Header } from "@/app/components";
import { PersonalCardSkeleton } from "./PersonalCardSkeleton";

export function UserLoadUi() {
  return (
    <section>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <PersonalCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
