import { Sidebar } from "../components";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="hidden md:flex bg-gray-100 w-screen overflow-auto min-h-screen ">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] ">
        <div className="max-h-screen overflow-auto pt-11">{children}</div>
      </div>
    </section>
  );
}
