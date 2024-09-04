import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@/app/models/Product";

type ProductCardProps = {
  product: Product;
};
export default async function ProductCard({ product }: ProductCardProps) {
  if (!product) return <></>;
  return (
    <Card className="w-full min-w-72 max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <CardMedia
        component="img"
        height="200"
        image={product.image_url}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" component="div" className="mt-4">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
