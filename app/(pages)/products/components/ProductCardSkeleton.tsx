import { Card, CardContent, Skeleton } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card className="w-72 max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" className="mt-4" />
        <Skeleton variant="text" width="40%" className="mt-4" />
      </CardContent>
    </Card>
  );
}
