"use client";
import {
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
import { usePathname, useRouter } from "next/navigation";
import { savePayment } from "@/app/services/payments/savePayment";

type Props = { payments: Payment[] };

export const Payments = ({ payments }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const control = useForm<Payment>({
    mode: "onChange",
  });

  useEffect(() => {
    setIsClient(true);

    // Verificar si hay una sesión activa
    const checkSession = async () => {
      const activeSession = false; // Cambia esto por la lógica real de verificación
      setSessionActive(activeSession);

      if (!activeSession) {
        setShowSessionModal(true);
      }
    };

    checkSession();
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
          title="Error al guardar el pago"
          text={
            error.message || "Ocurrió un error inesperado al guardar el pago."
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
              if (sessionActive) {
                setIsModalOpen(true);
              } else {
                setShowSessionModal(true);
              }
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
          component={Paper}
          className="overflow-auto max-h-[70vh]"
        >
          <Table aria-label="payments table">
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
              {payments.map((payment) => (
                <TableRow key={payment.id}>
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
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoadingButton}
          control={control}
        />
      </Modal>

      {/* Modal de sesión no activa */}
      <Modal
        isOpen={showSessionModal}
        onClose={() => router.push("/sales/sessions")}
        title="Sesión no activa"
      >
        <p className="mt-4">
          No hay una sesión activa. Diríjase al apartado de turnos para abrir
          una nueva sesión.
        </p>
        <button
          onClick={() => router.push("/sales/sessions")}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ir a Turnos
        </button>
      </Modal>
    </section>
  );
};

const paymentFields = [
  { name: "amount", label: "Monto", type: "number", required: true },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
];
