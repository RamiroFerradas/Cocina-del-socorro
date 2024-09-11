import React from "react";
import { Button, Modal } from "@/app/components";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onConfirm}
            className=" bg-red-500 text-white rounded-md"
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

export default ConfirmationModal;
