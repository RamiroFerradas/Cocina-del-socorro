import { fetchAllBranches } from "@/app/services/branches/fetchBranches";
import { Suspense } from "react";

type Props = {};

export default async function Branches() {
  const branchesPromise = fetchAllBranches();

  return (
    <Suspense fallback={<h1>CARGANDO...</h1>}>
      {branchesPromise.then((branches) => (
        <div></div>
      ))}
    </Suspense>
  );
}
