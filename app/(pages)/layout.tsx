import { Sidebar, Header } from "../components";
export const dynamic = "force-dynamic";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="hidden md:flex bg-gray-100 w-screen overflow-auto min-h-screen ">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] ">
        <Header />
        <div className="p-4 ">{children}</div>
      </div>
    </section>
  );
}
