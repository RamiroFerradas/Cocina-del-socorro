"use client";
import React, { useEffect } from "react";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "./Button";
import { Option } from "@/app/models/Option";
import { CustomSelect, ImageUploader } from ".";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  defaultValue?: any;
  options?: Option[];
  isSearchable?: boolean;
  onChange?: (selectedOption: Option) => void;
}

interface ReusableFormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: SubmitHandler<T>;
  submitButtonText?: string;
  onClose: () => void;
  isLoading?: boolean;
  isFormValid?: boolean;
  control: any;
}

export function ReusableForm<T extends FieldValues>({
  fields,
  onSubmit,
  submitButtonText = "Guardar",
  onClose,
  isLoading,
  isFormValid = true,
  control,
}: ReusableFormProps<T>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = control;

  useEffect(() => {
    fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        setValue(field.name as any, field.defaultValue);
      }
    });
  }, [fields, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(fields.length / 5)}, 1fr)`,
      }}
    >
      {fields.map((field) => (
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
              defaultValue={field.defaultValue}
              {...register(field.name as any, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          ) : field.type === "select" && field.options ? (
            <CustomSelect
              options={field.options}
              error={errors[field.name]?.message as any}
              isRequired={field.required}
              isSearchable={field.isSearchable}
              onChange={(selectedOption) => {
                if (field.onChange) {
                  field.onChange(selectedOption);
                }
                setValue(field.name as any, selectedOption?.value as any);
              }}
            />
          ) : field.type === "image" ? (
            <ImageUploader
              fieldName={field.name}
              register={register}
              setValue={setValue}
              required={false}
              imageProduct={field.defaultValue}
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              {...register(field.name, { required: field.required })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              defaultValue={field.defaultValue}
              step={field.type === "number" ? "0.01" : undefined}
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
        <Button
          type="submit"
          isLoading={isLoading}
          // disabled={!isValid || !isFormValid}
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}
