import { Sale } from "@/app/models/Sale";

export const groupSalesByDayAndTurno = (sales: Sale[]) => {
  const grouped: {
    [key: string]: { [key: string]: { total: number; sales: Sale[] } };
  } = {};

  sales.forEach((sale) => {
    const saleDate = new Date(sale.sale_date);
    const day = formatDate(saleDate);
    const turno = getTurno(saleDate);

    if (!grouped[day]) {
      grouped[day] = {
        "00:00 - 08:00": { total: 0, sales: [] },
        "08:00 - 16:00": { total: 0, sales: [] },
        "16:00 - 00:00": { total: 0, sales: [] },
      };
    }

    grouped[day][turno].sales.push(sale);
    grouped[day][turno].total += sale.total_amount;
  });

  return grouped;
};

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getTurno = (date: Date) => {
  const hour = date.getHours();
  if (hour >= 0 && hour < 8) return "00:00 - 08:00";
  if (hour >= 8 && hour < 16) return "08:00 - 16:00";
  return "16:00 - 00:00";
};
