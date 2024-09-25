import { Card, CardContent, Skeleton } from "@mui/material";

export function BranchCardSkeleton() {
  return (
    <Card className=" rounded overflow-hidden shadow-lg bg-white p-6 relative w-[30%]">
      <CardContent className="flex-grow flex flex-col justify-between p-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" className="mt-2" />
        <Skeleton variant="text" width="40%" className="mt-2" />
      </CardContent>
    </Card>
  );
}
