"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import noimage from "@/public/images/Image-not-found.png"; // Ruta de la imagen predeterminada
import type { StaticImageData } from "next/image";

interface ImageUploaderProps {
  fieldName: string;
  register: any;
  setValue: (name: string, value: File | null) => void;
  required?: boolean;
  imageProduct: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  fieldName,
  register,
  setValue,
  required,
  imageProduct,
}) => {
  const [imagePreview, setImagePreview] = useState<string | StaticImageData>(
    noimage
  );

  useEffect(() => {
    if (imageProduct && /^https?:\/\//.test(imageProduct)) {
      setImagePreview(imageProduct);
    } else {
      setImagePreview(noimage);
    }
  }, [imageProduct]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue(fieldName, file);
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <label className="group inline-flex flex-col items-center justify-center border-[1px] h-48 border-gray-200 rounded-md shadow-lg cursor-pointer overflow-hidden">
        <Image
          width={192}
          height={192}
          src={imagePreview}
          className="object-cover rounded-md p-2 group-hover:grayscale"
          alt="Vista previa de imagen"
        />
        <div className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:bg-gray-500 group-hover:bg-opacity-40">
          <p className="px-2 py-1 font-semibold text-gray-700 bg-white rounded-md shadow-lg whitespace-nowrap">
            Elegir archivo
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          {...register(fieldName, { required })} // Registrar el input en el formulario
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
