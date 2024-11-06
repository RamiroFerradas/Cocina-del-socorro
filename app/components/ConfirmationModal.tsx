import React from "react";
import { Button, Modal } from "@/app/components";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
  confirmButtonColor?: string; // Propiedad opcional para el color del botón
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
  confirmButtonColor = "bg-red-500",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onConfirm}
            className={`text-white rounded-md ${confirmButtonColor}`}
            isLoading={isLoading}
          >
            Confirmar
          </Button>
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 !text-black rounded-md"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
