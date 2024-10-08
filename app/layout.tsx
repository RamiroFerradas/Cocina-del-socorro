import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cocina del socorro",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:hidden flex items-center justify-center h-screen bg-red-100 w-screen">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600">
              Dispositivo No Compatible
            </h2>
            <p className="text-gray-700 mt-2">
              Este sistema está diseñado para ser utilizado en dispositivos con
              pantallas más grandes, como computadoras de escritorio o
              portátiles.
            </p>
            <p className="text-gray-700 mt-1">
              Por favor, accede desde un dispositivo compatible para obtener la
              mejor experiencia.
            </p>
          </div>
        </div>
        <div className="hidden md:flex bg-gray-100">{children}</div>
      </body>
    </html>
  );
}
