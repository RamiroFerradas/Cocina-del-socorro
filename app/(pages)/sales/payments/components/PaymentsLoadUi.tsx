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
      <div className="container mx-auto py-8">
        <TableContainer component={Paper}>
          <Table aria-label="payments loading skeleton table">
            <TableHead>
              <TableRow>
                <TableCell>Sucursal</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>ID de Sesión</TableCell>
                <TableCell>Fecha de Pago</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
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
      </div>
    </section>
  );
};

export default PaymentsLoadUi;
