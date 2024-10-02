"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Sale } from "@/app/models/Sale";
import { Product } from "@/app/models/Product";
import { Header } from "@/app/components";
import { SaleForm } from ".";
type Props = {
  sales: Sale[];
  products: Product[];
};

export const Sales = ({ sales, products }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section>
      <Header>
        {isClient && (
          <button
            onClick={() => {
              setEditingSale(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
          >
            <AddIcon className="size-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Agregar</span>
          </button>
        )}
      </Header>
      {isClient && (
        <TableContainer
          className="container mx-auto py-8 flex flex-wrap gap-4 p-4"
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Sucursal</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{sale.username}</TableCell>
                  <TableCell>{sale.total_amount}</TableCell>
                  <TableCell>{sale.branch}</TableCell>
                  <TableCell>
                    {new Date(sale.sale_date).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <SaleForm
        products={products}
        editingSale={editingSale}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </section>
  );
};
