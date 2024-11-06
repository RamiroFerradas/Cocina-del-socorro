"use client";
import { Header } from "@/app/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { NewSession, Session } from "@/app/models/Session";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  ConfirmationModal,
  Modal,
  ReusableForm,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { newSession } from "@/app/services/sessions/newSession";
import { closeSession } from "@/app/services/sessions/closeSession";

type Props = {
  sessions: Session[];
};

export const Sessions = ({ sessions }: Props) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [currentSessions, setCurrentSessions] = useState<Session[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentActionType, setCurrentActionType] = useState<
    "open" | "close" | null
  >(null);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

  const control = useForm<NewSession>({
    mode: "onChange",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    setCurrentSessions(sessions);
  }, [sessions]);

  const handleOpenConfirmationModal = (
    actionType: "open" | "close",
    sessionId: number
  ) => {
    setCurrentActionType(actionType);
    setCurrentSessionId(sessionId);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (currentActionType === "open") {
      await handleOpenSession();
    } else if (currentActionType === "close") {
      await handleCloseSession(currentSessionId!);
    }

    setIsConfirmationModalOpen(false);
  };

  const handleOpenSession = async () => {
    try {
      setIsLoadingButton(true);
      await newSession({ data: control.getValues(), pathname });

      toast(
        <Toast
          variant="success"
          title={"Turno abierto"}
          text={"Pago abierto exitosamente."}
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

  const handleCloseSession = async (sessionId: number) => {
    try {
      await closeSession({ sessionId, pathname });
      toast(
        <Toast
          variant="success"
          title="Turno cerrado"
          text="El turno ha sido cerrado."
        />,
        {
          hideProgressBar: true,
          className: toastSuccessStyles,
        }
      );

      setCurrentSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId ? { ...session, active: false } : session
        )
      );
    } catch (error: any) {
      toast(
        <Toast
          variant="error"
          title="Error al cerrar el turno"
          text={
            error.message || "Ocurrió un error inesperado al cerrar el turno."
          }
        />,
        {
          hideProgressBar: true,
          className: toastErrorStyles,
        }
      );
    }
  };

  return (
    <section>
      <Header defaultTitle="Turnos">
        {isClient && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
          >
            <AddIcon className="size-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Nuevo turno</span>
          </button>
        )}
      </Header>
      {isClient && (
        <TableContainer component={Paper}>
          <Table aria-label="sessions table">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Estado</TableCell>
                <TableCell className="font-bold">Fecha de Creación</TableCell>
                <TableCell className="font-bold">Saldo Inicial</TableCell>
                <TableCell className="font-bold">Saldo Total</TableCell>
                <TableCell className="font-bold">Fecha de Cierre</TableCell>
                <TableCell className="font-bold">ID</TableCell>
                <TableCell className="font-bold">Usuario</TableCell>
                <TableCell className="font-bold">Saldo Final</TableCell>
                <TableCell className="font-bold">Acciones</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <div style={{ maxHeight: "calc(100vh - 7.6rem)", overflow: "auto" }}>
            <Table aria-label="sessions table">
              <TableBody>
                {currentSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded ${
                          session.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {session.active ? "Abierto" : "Cerrado"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(session.session_created).toLocaleString()}
                    </TableCell>
                    <TableCell>{session.opening_balance}</TableCell>
                    <TableCell>{session.total_balance}</TableCell>
                    <TableCell>
                      {session.session_ended
                        ? new Date(session.session_ended).toLocaleString()
                        : "En curso"}
                    </TableCell>
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{session.username}</TableCell>
                    <TableCell>{session.final_balance}</TableCell>
                    <TableCell>
                      {session.active && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleOpenConfirmationModal("close", session.id)
                          }
                        >
                          Cerrar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Abrir turno"}
      >
        <ReusableForm
          fields={sessionFields}
          onSubmit={() => handleOpenConfirmationModal("open", -1)}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoadingButton}
          control={control}
          submitButtonText="Abrir turno"
        />
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={currentActionType === "open" ? "Abrir Turno" : "Cerrar Turno"}
        message={
          currentActionType === "open"
            ? "¿Estás seguro de que deseas abrir este turno?"
            : "¿Estás seguro de que deseas cerrar este turno?"
        }
        isLoading={isLoadingButton}
        confirmButtonColor="bg-green-500"
      />
    </section>
  );
};
const sessionFields = [
  {
    name: "opening_balance",
    label: "Balance inicial",
    type: "number",
    required: true,
    defaultValue: 0,
  },
];
