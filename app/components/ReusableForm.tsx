"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "./Button";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: any;
}

interface ReusableFormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: T;
  submitButtonText?: string;
  onClose: () => void;
  isLoading?: boolean;
}

export function ReusableForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues = {} as T,
  submitButtonText = "Guardar",
  onClose,
  isLoading,
}: ReusableFormProps<T>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
  } as any);

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const formattedValue = value.replace(",", ".");
    setValue(id as any, formattedValue as any);
  };

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
              type={field.type === "number" ? "text" : field.type} // Usar "text" para controlar el valor
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={field.type === "number" ? handleNumberInput : undefined} // Aplicar la función solo en inputs numéricos
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
        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Button>

        <Button type="submit" isLoading={isLoading}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}
