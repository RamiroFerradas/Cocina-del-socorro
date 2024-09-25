"use client";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Product } from "@/app/models/Product";
import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imgError from "public/images/Image-not-found.png";

type ProductCardProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
};

export function ProductCard({
  product: productApi,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setProduct(productApi);
    setImageError(false);
  }, [productApi]);

  const handleEdit = () => {
    if (product && onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = () => {
    if (product && onDelete) {
      onDelete(product.id);
    }
  };

  return (
    product && (
      <Card className="w-full max-w-40 max-w- bg-white shadow-md !rounded-xl min-h-44 flex justify-beween flex-col relative overflow-hidden">
        <div className="h-28 rounded-b-xl overflow-hidden shadow-sm">
          <Image
            // src={imageError ? imgError : productApi.imageUrl}
            src={imgError}
            alt={product.name}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="flex-grow flex flex-col justify-between p-2">
          <p className="flex flex-col">
            <span className="capitalize text-sm">{product.name}</span>
            <span className="capitalize text-xs">{product.brand}</span>
          </p>
          <span className="mt-4 text-xs">${product.price}</span>
        </CardContent>
        <div className="absolute top-0 right-0 flex flex-col items-center justify-center">
          {onEdit && (
            <IconButton onClick={handleEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      </Card>
    )
  );
}
