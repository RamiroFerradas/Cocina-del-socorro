"use client";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Product } from "@/app/models/Product";
import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Ícono de editar
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de eliminar
import imgError from "public/images/Image-not-found.png";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductCard({
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
    if (product) {
      onEdit(product);
    }
  };

  const handleDelete = () => {
    if (product) {
      onDelete(product.id);
    }
  };

  return (
    product && (
      <Card className="w-full min-w-72 max-w-sm bg-white shadow-md rounded-xl overflow-hidden h-64 flex justify-between flex-col relative">
        <div className="min-h-32 rounded-xl overflow-hidden shadow-sm">
          <Image
            // src={imageError ? imgError : productApi.imageUrl}
            src={imgError}
            alt={product.name}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full"
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
        <div className="absolute top-2 right-2 flex flex-col items-center justify-center">
          <IconButton onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </Card>
    )
  );
}
