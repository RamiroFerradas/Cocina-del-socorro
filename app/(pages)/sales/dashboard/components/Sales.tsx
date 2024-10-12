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
  const [isClient, setIsClient] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const salesPerPage = 3;

  useEffect(() => {
    setIsClient(true);

    const today = dayjs();
    setEndDate(today.toDate());
    setStartDate(today.subtract(7, "day").toDate());
  }, []);

  const filteredSales = sales.filter((sale) => {
    const saleDate = dayjs(sale.sale_date);
    return (
      (!startDate || saleDate.isAfter(dayjs(startDate))) &&
      (!endDate || saleDate.isBefore(dayjs(endDate).add(1, "day")))
    ); // Inclusive
  });

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

  const handleDateChange = (dates: Date[]) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
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
            Fechas
          </Button>

          {/* Calendario con posición absoluta */}
          {showCalendar && (
            <div
              className="absolute top-12 right-0 z-10 bg-white shadow-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                onChange={handleDateChange as any}
                value={[startDate, endDate]}
                selectRange
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
        </>
      )}
    </section>
  );
};
