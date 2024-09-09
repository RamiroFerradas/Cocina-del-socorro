"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: any; // Valor predeterminado opcional para cada campo
}

interface ReusableFormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: T; // Valores iniciales opcionales
  submitButtonText: string;
  onClose: () => void;
}

export function ReusableForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues = {} as T, // Valores iniciales para edición
  submitButtonText,
  onClose,
}: ReusableFormProps<T>) {
  // Configurar el formulario con valores predeterminados si existen
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
  } as any);

  const maxRowsPerColumn = 5;
  const numColumns = Math.ceil(fields.length / maxRowsPerColumn);
  const columns = Array.from({ length: numColumns }, (_, colIndex) =>
    fields.slice(colIndex * maxRowsPerColumn, (colIndex + 1) * maxRowsPerColumn)
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
    >
      {columns.flat().map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          )}
          {errors[field.name] && (
            <p className="text-red-500 text-sm">
              {(errors[field.name]?.message as string) ||
                "Este campo es requerido"}
            </p>
          )}
        </div>
      ))}
      <div className="col-span-full flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}
