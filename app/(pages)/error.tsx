"use client";
type ErrorBoundaryProps = {
  error: Error;
};

const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col pb-16 gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Lo sentimos, hubo un error.
        </h1>
        <p className="text-xs mt-2 text-red-500">{error.message}</p>

        <button
          onClick={() => location.reload()}
          className="mt-8 px-4 py-2 bg- text-black rounded-xl hover:bg-black hover:text-white border-black border-4 font-bold"
        >
          Recargar
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;