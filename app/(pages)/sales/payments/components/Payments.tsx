"use client";
import {
  ConfirmationModal,
  Header,
  Modal,
  ReusableForm,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Payment } from "@/app/models/Payment";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { savePayment } from "@/app/services/payments/savePayment";

type Props = { payments: Payment[] };

export const Payments = ({ payments }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const pathname = usePathname();
  const control = useForm<Payment>({
    mode: "onChange",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (data: Payment) => {
    try {
      setIsLoadingButton(true);

      await savePayment({ data, pathname });

      toast(
        <Toast
          variant="success"
          title={"Pago agregado"}
          text={"Pago agregado exitosamente."}
        />,
        {
          hideProgressBar: true,
          className: toastSuccessStyles,
        }
      );

      setIsModalOpen(false);
    } catch (error: any) {
      toast(
        <Toast
          variant="error"
          title="Error al guardar el producto"
          text={
            error.message ||
            "Ocurrió un error inesperado al guardar el producto."
          }
        />,
        {
          hideProgressBar: true,
          className: toastErrorStyles,
        }
      );
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <section>
      <Header defaultTitle="Pagos">
        {isClient && (
          <button
            onClick={() => {
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
        <TableContainer component={Paper}>
          <Table aria-label="payments table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Sucursal</TableCell>
                <TableCell className="font-bold">ID</TableCell>
                <TableCell className="font-bold">Monto</TableCell>
                <TableCell className="font-bold">ID de Sesión</TableCell>
                <TableCell className="font-bold">Fecha de Pago</TableCell>
                <TableCell className="font-bold">Usuario</TableCell>
                <TableCell className="font-bold">Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.branch}</TableCell>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.session_id}</TableCell>
                  <TableCell>
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.username}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Agregar Pago"}
      >
        <ReusableForm
          fields={paymentFields}
          onSubmit={handleSubmit}
          // defaultValues={editingBranch!}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoadingButton}
          control={control}
        />
      </Modal>
    </section>
  );
};

const paymentFields = [
  { name: "amount", label: "Monto", type: "number", required: true },
  {
    name: "description",
    label: "Descripcion",
    type: "textarea",
    required: true,
  },
];
