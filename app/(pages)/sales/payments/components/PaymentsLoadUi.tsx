import { Header } from "@/app/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

type Props = {};

export const PaymentsLoadUi = (props: Props) => {
  return (
    <section>
      <Header />
      <TableContainer component={Paper}>
        <Table aria-label="payments loading skeleton table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Monto</TableCell>
              <TableCell className="font-bold">ID de Sesión</TableCell>
              <TableCell className="font-bold">Fecha de Pago</TableCell>
              <TableCell className="font-bold">Usuario</TableCell>
              <TableCell className="font-bold">Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={50} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={70} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={90} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={150} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default PaymentsLoadUi;
