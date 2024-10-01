import { fetchAllBranches } from "@/app/services/branches/fetchBranches";
import { Suspense } from "react";
import { BranchesLoadUi, Branches } from "./components";
export const dynamic = "force-dynamic";

export default async function BranchesServer() {
  const branchesPromise = fetchAllBranches();

  return (
    <Suspense fallback={<BranchesLoadUi />}>
      {branchesPromise.then((branches) => (
        <Branches branches={branches} />
      ))}
    </Suspense>
  );
}
