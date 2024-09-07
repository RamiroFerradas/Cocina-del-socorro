import { Sidebar } from "./components";
import { MdConstruction } from "react-icons/md"; // Icono de construcción de React Icons

type Props = {};
const Error = (props: Props) => {
  return (
    <section className="hidden md:flex bg-gray-100 w-screen overflow-auto min-h-screen">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] flex flex-col items-center justify-center">
        <div className="max-h-screen overflow-auto pt-11 flex flex-col items-center justify-center text-center">
          <MdConstruction className="text-6xl text-yellow-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Página en Construcción
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Estamos trabajando en mejorar esta página. Por favor, vuelve más
            tarde.
          </p>
          <p className="text-md text-gray-500">
            Si necesitas asistencia inmediata, contáctanos en{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:underline"
            >
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Error;
