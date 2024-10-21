import React from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Header } from "@/app/components";

type Props = {};

export const SalesLoadUi = (props: Props) => {
  const rows = 5; // Número de filas es ajustable según el espacio disponible
  const columns = ["ID", "Username", "Total Amount", "Branch", "Sale Date"];

  return (
    <section>
      <Header />
      <TableContainer
        className=" mx-auto py-8 flex flex-wrap gap-4 p-4"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton variant="rectangular" height={25} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
