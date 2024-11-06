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

export const SessionsLoadUi = () => {
  return (
    <section>
      <Header />
      <TableContainer component={Paper}>
        <Table aria-label="sessions loading skeleton table">
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Activo</TableCell>
              <TableCell className="font-bold">Fecha de Creación</TableCell>
              <TableCell className="font-bold">Saldo Inicial</TableCell>
              <TableCell className="font-bold">Saldo Total</TableCell>
              <TableCell className="font-bold">Sucursal</TableCell>
              <TableCell className="font-bold">Fecha de Cierre</TableCell>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Usuario</TableCell>
              <TableCell className="font-bold">Saldo Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={50} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>

                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={50} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={90} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default SessionsLoadUi;
