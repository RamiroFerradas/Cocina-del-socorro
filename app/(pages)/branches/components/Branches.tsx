"use client";
import { Branch } from "@/app/models/Branch";
import { BranchtCard } from "./BranchCard";
import {
  ConfirmationModal,
  Header,
  Modal,
  ReusableForm,
  Toast,
  toastErrorStyles,
  toastSuccessStyles,
} from "@/app/components";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { saveBranch } from "@/app/services/branches/saveBranch";

import { deleteBranch } from "@/app/services/branches/deleteBranch";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = { branches: Branch[] };
export const Branches = ({ branches }: Props) => {
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [branchIdToDelete, setBranchIdToDelete] = useState<number | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const pathname = usePathname();
  const control = useForm<Branch>({
    mode: "onChange",
  });
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (data: Branch) => {
    try {
      setIsLoadingButton(true);

      await saveBranch({ data, pathname, isEdit: !!editingBranch });

      toast(
        <Toast
          variant="success"
          title={editingBranch ? "Producto actualizado" : "Producto agregado"}
          text={
            editingBranch
              ? "Producto actualizado exitosamente."
              : "Producto agregado exitosamente."
          }
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
  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (id: number) => {
    setBranchIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };
  const confirmDelete = async () => {
    if (branchIdToDelete !== null) {
      setIsLoadingButton(true);
      await deleteBranch(branchIdToDelete);
      setIsLoadingButton(true);
      setIsConfirmationModalOpen(false);
    }
  };

  return (
    <section>
      <Header>
        {isClient && (
          <button
            onClick={() => {
              setEditingBranch(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center p-2 my-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 bg-white border border-gray-300"
          >
            <AddIcon className="size-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Agregar</span>
          </button>
        )}
      </Header>
      <div className="container mx-auto py-8 flex flex-wrap gap-4 p-4">
        {branches.map((branch) => (
          <BranchtCard
            branch={branch}
            key={branch.id}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBranch ? "Editar Producto" : "Agregar Producto"}
      >
        <ReusableForm
          fields={branchFields}
          onSubmit={handleSubmit}
          // defaultValues={editingBranch!}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoadingButton}
          control={control}
        />
      </Modal>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta sucurusal? Esta acción no se puede deshacer."
        isLoading={isLoadingButton}
      />
    </section>
  );
};

const branchFields = [
  { name: "name", label: "Nombre", type: "text", required: true },
  { name: "address", label: "Direccion", type: "text", required: true },
];
