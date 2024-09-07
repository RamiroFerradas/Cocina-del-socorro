import { Card, CardContent, Skeleton } from "@mui/material";

interface ProductCardSkeletonProps {
  id: number;
}

export default function ProductCardSkeleton({ id }: ProductCardSkeletonProps) {
  return (
    <Card
      id={`skeleton-${id}`} // Usamos `id` como identificador
      className="w-full min-w-72 max-w-sm bg-white shadow-md rounded-lg overflow-hidden"
    >
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" className="mt-2" />
        <Skeleton variant="text" width="40%" className="mt-2" />
      </CardContent>
    </Card>
  );
}
