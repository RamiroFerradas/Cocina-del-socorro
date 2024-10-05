import { Sidebar } from "../components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="hidden md:flex bg-gray-100 w-screen overflow-auto min-h-screen ">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] ">
        <ToastContainer />

        <div className="">{children}</div>
      </div>
    </section>
  );
}
