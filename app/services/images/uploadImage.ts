"use server";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/app/lib/cloudinary";

export async function uploadImage(
  formData: FormData
): Promise<{ message?: string; url?: string; error?: string }> {
  const environment = process.env.NODE_ENV;

  try {
    const file = formData.get("image") as File | null;
    const section = formData.get("section") as string | null;

    if (!file) {
      throw new Error("No se ha detectado una imagen para subir");
    }

    const arrayBuffer = await file.arrayBuffer();
    const mime = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const fileUri = `data:${mime};${encoding},${base64Data}`;

    const folderPath = (section || "default-section").replace(/\s+/g, "_");
    const finalFolderPath = `${
      environment === "development" ? "DEV" : "PROD"
    }/${folderPath}`;

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
          folder: finalFolderPath,
        })
        .then(resolve)
        .catch(reject);
    });

    return {
      message: "Imagen subida correctamente",
      url: result.secure_url,
    };
  } catch (error) {
    return {
      error: `Error al subir la imagen a Cloudinary: ${
        (error as Error).message
      }`,
    };
  }
}
