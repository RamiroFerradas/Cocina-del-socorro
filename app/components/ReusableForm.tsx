"use client";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { Button } from "./Button";
import { Option } from "@/app/models/Option";
import { CustomSelect } from ".";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: DefaultValues<any>;
  options?: Option[];
  isSearchable?: boolean;
  onChange?: any;
}

interface ReusableFormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  submitButtonText?: string;
  onClose: () => void;
  isLoading?: boolean;
}

export function ReusableForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues = {} as DefaultValues<T>,
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
  });

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const formattedValue = value.replace(",", ".");

    if (/^[0-9]*[.,]?[0-9]*$/.test(formattedValue) || formattedValue === "") {
      setValue(id as any, formattedValue as any);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9.,]/.test(event.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
        event.key
      )
    ) {
      event.preventDefault();
    }
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
              defaultValue={field.defaultValue}
              id={field.name}
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          ) : field.type === "select" && field.options ? (
            <CustomSelect
              options={field.options} // Pasa las opciones filtradas
              error={errors[field.name]?.message as any}
              isRequired={field.required}
              isSearchable={field.isSearchable}
              onChange={(selectedOption) => {
                if (field.onChange) {
                  field.onChange(selectedOption?.value as any);
                }
                setValue(field.name as any, selectedOption?.value as any);
              }}
            />
          ) : (
            <input
              id={field.name}
              type="text"
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={field.type === "number" ? handleNumberInput : undefined}
              onKeyDown={field.type === "number" ? handleKeyDown : undefined}
              inputMode="decimal"
              defaultValue={field.defaultValue}
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
