"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Sale } from "@/app/models/Sale";
import { Product } from "@/app/models/Product";
import { Button, Header } from "@/app/components";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { groupSalesByDayAndTurno } from "@/app/(pages)/sales/helpers";

type Props = {
  sales: Sale[];
  products: Product[];
};

export const Sales = ({ sales }: Props) => {
  console.log(sales);
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<number | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null); // Estado para el turno
  const [drawerOpen, setDrawerOpen] = useState(false);
  const salesPerPage = 3;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredSales = selectedDate
    ? sales.filter((sale) => {
        const saleDate = dayjs(sale.sale_date);
        return saleDate.isSame(dayjs(selectedDate), "day");
      })
    : sales;

  const groupedSales = groupSalesByDayAndTurno(filteredSales);
  const days = Object.entries(groupedSales).sort(
    ([dayA], [dayB]) => new Date(dayB).getTime() - new Date(dayA).getTime()
  );

  const indexOfLastDay = currentPage * salesPerPage;
  const indexOfFirstDay = indexOfLastDay - salesPerPage;
  const currentDays = days.slice(indexOfFirstDay, indexOfLastDay);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Actualizar openDrawer para recibir y establecer el turno
  const openDrawer = (sale: Sale, shift: string) => {
    setSelectedSale(sale.id);
    setSelectedShift(shift); // Aquí se establece el turno
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedSale(null);
    setSelectedShift(null); // Resetear el turno al cerrar
  };

  return (
    <section>
      <Header>
        <div className="flex justify-end p-4 relative">
          <Button
            color="red"
            onClick={toggleCalendar}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fechas{" "}
          </Button>

          {/* Calendario con posición absoluta */}
          {showCalendar && (
            <div className="absolute top-12 right-0 z-10 bg-white shadow-lg p-4">
              <Calendar
                onChange={(date) => {
                  setSelectedDate(date as Date);
                  setShowCalendar(false);
                }}
                value={selectedDate}
              />
            </div>
          )}
        </div>
      </Header>

      {isClient && (
        <>
          <div className="h-[calc(100vh-8rem)] overflow-auto">
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
                    <TableCell>Acciones</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentDays.map(([day, turns]) => (
                    <>
                      {Object.entries(turns).map(
                        ([turno, { total, sales }]) => (
                          <>
                            <TableRow
                              key={`${day}-${turno}`}
                              className="bg-gray-200 !w-full"
                            >
                              <TableCell colSpan={6} className="font-bold">
                                Día: {day} - Turno: {turno} - Total: $
                                {total.toFixed(2)}
                              </TableCell>
                            </TableRow>

                            {sales.map((sale) => (
                              <TableRow key={sale.id}>
                                <TableCell>{sale.id}</TableCell>
                                <TableCell>{sale.username}</TableCell>
                                <TableCell>
                                  ${sale.total_amount.toFixed(2)}
                                </TableCell>
                                <TableCell>{sale.branch}</TableCell>
                                <TableCell>
                                  {new Date(sale.sale_date).toLocaleString()}
                                </TableCell>
                                {/* <TableCell>
                                  <IconButton
                                    onClick={() => openDrawer(sale, turno)} 
                                    
                                    aria-label="Ver detalles"
                                  >
                                    <Visibility />
                                  </IconButton>
                                </TableCell> */}
                              </TableRow>
                            ))}
                          </>
                        )
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Pagination
            count={Math.ceil(days.length / salesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            className="flex justify-center my-4"
          />
          {/* 
          <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
            <SaleDetailServer saleId={selectedSale} shift={selectedShift} e />
            <Button
              className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2"
              onClick={closeDrawer}
            >
              Cerrar
            </Button>
          </Drawer> */}
        </>
      )}
    </section>
  );
};
