import { Card, CardContent, Skeleton } from "@mui/material";

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-40 bg-white shadow-md !rounded-xl min-h-44 flex justify-beween flex-col relative overflow-hidden">
      <Skeleton variant="rectangular" height={100} />
      <CardContent className="flex-grow flex flex-col justify-between p-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" className="mt-2" />
        <Skeleton variant="text" width="40%" className="mt-2" />
      </CardContent>
    </Card>
  );
}
