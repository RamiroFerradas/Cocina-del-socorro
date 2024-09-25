"use client";
import { Card, CardContent, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Branch } from "@/app/models/Branch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
type BranchtCardProps = {
  branch: Branch;
  onEdit?: (branch: Branch) => void;
  onDelete?: (id: number) => void;
};

export function BranchtCard({
  branch: branchApi,
  onEdit,
  onDelete,
}: BranchtCardProps) {
  const [branch, setBranch] = useState<Branch | null>(null);

  useEffect(() => {
    setBranch(branchApi);
  }, [branchApi]);

  const handleEdit = () => {
    if (branch && onEdit) {
      onEdit(branch);
    }
  };

  const handleDelete = () => {
    if (branch && onDelete) {
      onDelete(branch.id);
    }
  };

  return (
    branch && (
      <Card className=" rounded overflow-hidden shadow-lg bg-white p-6 relative w-[30%]">
        <CardContent className="flex-grow flex flex-col justify-between p-2">
          <h2 className="text-xl font-bold mb-2 capitalize">{branch.name}</h2>
          <p className="text-gray-700 text-base mb-4">{branch.address}</p>
          {branch.is_active ? (
            <p className="text-green-600 font-semibold">Sucursal Activa</p>
          ) : (
            <p className="text-red-600 font-semibold">Sucursal Inactiva</p>
          )}
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
