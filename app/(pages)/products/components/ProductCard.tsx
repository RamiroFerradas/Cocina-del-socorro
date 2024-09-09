"use client";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "@/app/models/Product";
import { useState, useEffect } from "react";
import imgError from "public/images/Image-not-found.png";
type ProductCardProps = {
  product: Product;
};
import Image from "next/image";

export default function ProductCard({ product: productApi }: ProductCardProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setProduct(productApi);
    setImageError(false);
  }, [productApi]);

  return (
    product && (
      <Card className="w-full min-w-72 max-w-sm bg-white shadow-md rounded-xl overflow-hidden h-64 flex justify-between flex-col">
        <div className="min-h-32 rounded-xl overflow-hidden shadow-sm">
          <Image
            src={imgError}
            alt={product.name}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full "
          />
        </div>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
          <Typography variant="h6" component="div" className="mt-4">
            ${product.price}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}
