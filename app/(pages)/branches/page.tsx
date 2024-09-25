import { fetchAllBranches } from "@/app/services/branches/fetchBranches";
import { Suspense } from "react";
import { Branches } from "./components/Branches";
import BranchesLoadUi from "./components/BranchesLoadUi";
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
