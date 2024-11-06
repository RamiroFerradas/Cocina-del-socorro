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
  Drawer,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Sale } from "@/app/models/Sale";
import { Product } from "@/app/models/Product";
import { Button, Header } from "@/app/components";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { groupSalesByDayAndTurno } from "@/app/(pages)/sales/helpers";
import { usePathname, useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BASE_PATH } from "@/app/constants";
import { SaleDetailClient } from "./SaleDetail.client";

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
  const [selectedTurno, setSelectedTurno] = useState<string | null>(null);
  const salesPerPage = 3;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);

    const today = dayjs();
    const startOfWeek = today.startOf("week").add(1, "day");
    const endOfWeek = startOfWeek.add(6, "day");

    setStartDate(startOfWeek.toDate());
    setEndDate(endOfWeek.toDate());
  }, []);

  const filteredSales = sales.filter((sale) => {
    const saleDate = dayjs(sale.sale_date);
    return (
      (!startDate || saleDate.isAfter(dayjs(startDate))) &&
      (!endDate || saleDate.isBefore(dayjs(endDate).add(1, "day")))
    );
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

  const toggleCalendar = (e: any) => {
    e.stopPropagation();
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (dates: Date[]) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <section onClick={() => setShowCalendar(false)}>
      <Header defaultTitle="Listado de ventas">
        <div className="flex justify-end p-4 relative">
          <Button
            color="red"
            onClick={toggleCalendar}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fechas
          </Button>

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
          <TableContainer component={Paper} className="h-[calc(100vh-8rem)]">
            <Table stickyHeader aria-label="sessions table">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">Usuario</TableCell>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">Fecha</TableCell>
                  <TableCell className="font-bold">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentDays.map(([day, turns]) => (
                  <>
                    {Object.entries(turns).map(([turno, { total, sales }]) => (
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
                          <TableRow key={sale.id} className="w-full">
                            <TableCell>{sale.username}</TableCell>
                            <TableCell>
                              ${sale.total_amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {new Date(sale.sale_date).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="ver detalle"
                                className="hover:bg-gray-200"
                                onClick={() => {
                                  setSelectedTurno(turno);
                                  router.replace(
                                    `${BASE_PATH}/${pathname}?id=${sale.id}`
                                  );
                                  setOpenDrawer(true);
                                  setShowCalendar(false);
                                }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(days.length / salesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            className="flex justify-center my-4"
          />
          <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
            <SaleDetailClient shift={selectedTurno!} />
          </Drawer>
        </>
      )}
    </section>
  );
};
